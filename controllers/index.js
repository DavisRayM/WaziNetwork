const ErrorModel = require('../models/error');

module.exports = {
    getIndex: (req, res, next) => {
        res.render('index', {
            title: 'Wazi Network',
            nav: 'home'
        });
    },
    getFaq: (req, res, next) => {
        res.render('faq', {
            title: 'Wazi Network - Frequently Asked Questions',
            nav: 'faq'
        });
    },
    postError: (req, res, next) => {
        const error = await ErrorModel.create(req.body);
        error.reporter = req.user._id;
        await error.save();

        const redirectTo = req.session.redirectTo || "/";

        res.redirect(redirectTo);
    },
    putError: (req, res, next) => {
        const error = await ErrorModel.findById(req.params.error_id);

        error.solved = true;
        error.solved_on = Date.now();

        await error.save();

        const redirectTo = req.session.redirectTo || "/";

        res.redirect(redirectTo);
    }
}
