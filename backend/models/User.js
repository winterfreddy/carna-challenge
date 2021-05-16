const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    classification: {
        type: String
    },
    age: {
        type: Number
    },
    education: {
        type: String
    },
    englishProficiency: {
        type: String
    },
    courses: [{
        type: Number
    }]
}, {
    timestamps: true
})

module.exports = User = mongoose.model('User', UserSchema);