const Task = require('../models/task');
const Bid = require('../models/bid');
const { cloudinary } = require('../cloudinary');

const appName = process.env.APP_NAME;

module.exports = {
    // GET /tasks
    async taskIndex(req, res, next) {
        let tasks = await Task.paginate({}, {
            page: req.query.page || 1,
            limt: 20
        });
        tasks.page = Number(tasks.page);
        res.render('tasks/index', {
            tasks,
            title: `${appName} - Tasks`
        });
    },
    // GET /tasks/new
    taskNew(req, res, next) {
        res.render('tasks/new', {
            title: `${appName} - Create Task`
        });
    },
    // POST /tasks
    async taskCreate(req, res, next) {
        if (req.file) {
            req.body.task.additional_content = {
                secure_url: req.file.secure_url,
                public_id: req.file.public_id
            };
        }

        req.body.task.author = req.user._id;
        let task = await Task.create(req.body.task);
        req.session.success = 'Task created!';
        res.redirect(`/tasks/${task.id}`);
    },
    // GET /tasks/:id
    async taskShow(req, res, next) {
        // retrieve task from db
        let task = await Task.findById(req.params.id);

        // retrieve bids related to task, sorted in descending order and with
        // the authors data populated into the object
        let bids = await Bid.find({
            task: task.id
        }).sort([
            ['_id', -1]
        ]).populate({
            path: 'author',
            model: 'User'
        });

        res.render('tasks/show', {
            task,
            bids,
            title: `${appName} - ${task.title}`
        });
    },
    // GET /tasks/:id/edit
    async taskEdit(req, res, next) {
        const { task } = res.locals;
        res.render('tasks/edit', {
            title: `${appName} - Edit ${task.title}`
        });
    },
    // PUT /tasks/:id
    async taskUpdate(req, res, next) {
        const { task } = res.locals;
        let deletedContent = req.body.deletedContent;

        if (deletedContent && deletedContent != '') {
            await cloudinary.v2.uploader.destroy(deletedContent);
            task.additional_content = null;
        }

        if (req.file) {
            task.additional_content = {
                secure_url: req.file.secure_url,
                public_id: req.file.public_id
            };
        }

        task.title = req.body.task.title;
        task.price_range = req.body.task.price_range;
        task.description = req.body.task.description;

        task.save();
        res.redirect(`/tasks/${task.id}`);
    },

    // DELETE /tasks/:id
    async taskDestroy(req, res, next) {
        const { task } = res.locals;

        if (task.additional_content.public_id) {
            await cloudinary.v2.uploader.destroy(task.additional_content.public_id);
        }

        task.remove();
        res.redirect('/tasks');
    }
}
