const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    content: [{
        type: String
    }],
    teacher: [{
        type: Number
    }],
    students: [{
        type: Number
    }]
})

module.exports = Course = mongoose.model('course', CourseSchema);