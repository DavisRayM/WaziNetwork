const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    message: {
        text: String,
        sender: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    sent_on: {
        type: Date,
        default: Date.now
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deleted_at: Date
});

module.exports = mongoose.model('Chat', ChatSchema);
