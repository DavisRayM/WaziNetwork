const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = require('./message.schema')

const ChatSchema = new Schema({
    messages: [MessageSchema],
    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    deleted: {
        type: Boolean,
        default: false
    },
    deleted_at: Date
}, {
    timestamps: {
        createdAt: 'created_at'
    }
});

module.exports = mongoose.model('Chat', ChatSchema);
