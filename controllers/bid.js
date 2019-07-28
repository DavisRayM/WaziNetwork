const Task = require('../models/task');
const Bid = require('../models/bid');

module.exports = {
    // POST /task/:task_id/bid
    async bidCreate(req, res, next) {
        let task = await Task.findById(req.params.id);
        let haveReviewed = await Bid.find({
            task: task.id,
            author: req.user._id
        });

        if (haveReviewed.length > 0) {
            // Set error flash image if a bid related to the user is already connected to the task
            req.session.error = 'Can create a new bid! One already exists!';
        } else {
            // create bid from form data
            let bid = await Bid.create(req.body);
            // link to task
            bid.task = task.id;
            // link to author
            bid.author = req.user._id;
            // set success flash message
            req.session.success = 'Review created!';
            // save bid to db
            bid.save();
        }

        res.redirect(`/tasks/${task.id}`);
    },
    // PUT /task/:task_id/bid/:bid_id
    async bidUpdate(req, res, next) {
        // update bid object in db
        await Bid.findByIdAndUpdate(req.params.bid_id, req.body);
        // set success flash message
        req.session.success = 'Review updated!';
        // redirect back to task show page
        res.redirect(`/tasks/${req.params.id}`);
    },
    // DELETE /task/:task_id/bid/:bid_id
    async bidDestroy(req, res, next) {
        // remove bid entry from db
        await Bid.findByIdAndRemove(req.params.bid_id);
        // redirect back to task show page
        res.redirect(`/tasks/${req.params.id}`);
    }
}
