const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ErrorSchema = new Schema({
    reporter: {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    error_status: Number,
    detail: String,
    solved_on: {
        type: Date,
        default: null
    },
    solved: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: {
        createdAt: 'created_at'
    }
});

module.exports = mongoose.model('Error', ErrorSchema);
