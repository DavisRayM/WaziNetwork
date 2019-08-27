const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    text: String,
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    sent_on: Date
});

module.exports = MessageSchema;
