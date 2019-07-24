const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { type: String, unique: true, required: true },
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
})

module.exports = mongoose.model('User', UserSchema);