const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    profile_picture: {
        secure_url: String,
        public_id: String
    },
    portfolio: {
        secure_url: String,
        public_id: String
    },
    contact_number: Number,
    is_superuser: Boolean,
    meta: {
        completed_tasks: Number,
        failed_tasks: Number,
    }
});

var options = {
    errorMessages: {
        IncorrectPasswordError: 'Incorrect password entered',
        IncorrectUsernameError: 'Username does not exist',
        UserExistsError: 'A user with the username already exists!'
    }
};

UserSchema.plugin(passportLocalMongoose, options);

module.exports = mongoose.model('User', UserSchema);
