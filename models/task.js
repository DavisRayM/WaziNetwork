const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosPaginate = require('mongoose-paginate');

const Bid = require('./bid');

const TaskSchema = new Schema({
    title: String,
    price_range: String,
    description: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    additional_content: {
        secure_url: String,
        public_id: String
    }
});

TaskSchema.pre('remove', async function () {
    await Bid.remove({
        task: this._id
    }).exec();
});

TaskSchema.plugin(mongoosPaginate);

module.exports = mongoose.model('Task', TaskSchema);
