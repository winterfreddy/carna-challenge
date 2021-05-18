const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateTweetInput(data) {
    let errors = {};

    data.name = validText(data.name) ? data.name : '';
    data.id = validText(data.id) ? data.id : '';
    data.password = validText(data.password) ? data.password : '';

    if (!Validator.isLength(data.name, { min: 5, max: 100 })) {
        errors.name = 'Course name must be between 5 and 100 characters';
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Course name field is required';
    }

    if (!Validator.isLength(data.id, { min: 6, max: 6 })) {
        errors.id = 'Custom course id must be exactly 6 characters';
    }

    if (!Validator.isNumeric(data.id.toString())) {
        errors.id = 'Custom course id must be all numbers';
    }

    if (Validator.isEmpty(data.id)) {
        errors.id = 'Custom course id field is required';
    }

    if (!Validator.isLength(data.password, { min: 6, max: 6 })) {
        errors.password = 'Course password must be exactly 6 characters';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Course password field is required';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};