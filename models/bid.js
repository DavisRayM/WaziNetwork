const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BidSchema = new Schema({
    task: {
        type: Schema.Types.ObjectId,
        ref: 'Task'
    },
    bid: Number,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    description: String
});

module.exports = mongoose.model('Bid', BidSchema);
