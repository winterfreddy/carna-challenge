const express = require("express");
const router = express.Router();
const passport = require('passport');

const Course = require('../../models/Course');
const validateCourseInput = require('../../validation/courses');

router.get('/', (req, res) => {
    Course.find()
        .sort({ date: -1 })
        .then(courses => res.json(courses))
        .catch(err => res.status(404).json({ nocoursesfound: 'No courses found' }));
});

router.get('/teacher/:user_id', (req, res) => {
    Course.find()
        .then(data => {
            return data.filter( course => {
                course.teacher.includes(res.params.user_id);
            })
        })
        .then(courses => res.json(courses))
        .catch(err =>
            res.status(404).json({ notweetsfound: 'No courses found for this teacher' }
        )
    );
});

router.get('/student/:user_id', (req, res) => {
    Course.find()
        .then(data => {
            return data.filter( course => {
                course.students.includes(res.params.user_id);
            })
        })
        .then(courses => res.json(courses))
        .catch(err =>
            res.status(404).json({ notweetsfound: 'No courses found for this student' }
        )
    );
});

router.get('/:id', (req, res) => {
    Course.findById(req.params.id)
        .then(course => res.json(course))
        .catch(err =>
            res.status(404).json({ nocoursefound: 'No course found with that ID' })
        );
});

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateCourseInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newCourse = new Course({
        name: req.body.name,
        id: req.body.id,
        password: req.body.password
    });

    newCourse.save().then(course => res.json(course));
});

router.delete('/:id', (req, res) => {
    Course.findByIdAndDelete(req.params.id)
        .then( course => {
            return res.status(200).json({ code: 200, message: 'Course deleted', deletedCourse: course });
        })
        .catch( err => {
            return res.status(500).json({ code: 500, message: 'Course could not be deleted', error: err });
        })
})

router.put(':/id', (req, res) => {
    Course.findByIdAndUpdate(req.params.id, req.body)
        .then( data => {
            return res.json({ message: 'Course updated successfully', courseInfo: data });
        })
        .catch( err => {
            return res.status(400).json({ error: 'Unable to update course'});
        })
})

module.exports = router;