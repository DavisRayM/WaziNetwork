const Task = require('../models/task');
const Bid = require('../models/bid');
const User = require('../models/user');

module.exports = {
    isLoggedIn: (req, res, next) => {
        if (req.isAuthenticated()) return next();
        req.session.redirectTo = req.originalUrl;
        res.redirect('/auth');
    },
    isNotLoggedIn: (req, res, next) => {
        if (req.isAuthenticated()) res.redirect(`/auth/profile/${req.user.username}`);
        return next();
    },
    isSuperUser: (req, res, next) => {
        if (req.user.is_superuser) return next();
        res.redirect(`/auth/profile/${req.user.username}`);
    },
    isTaskAuthor: async (req, res, next) => {
        const task = await Task.findById(req.params.id);
        if (req.query.redirect) {
            req.session.redirectTo = "/auth/admin/data";
        } else {
            req.session.redirectTo = "/tasks";
        }

        if (task.author.equals(req.user._id)) {
            res.locals.task = task;
            return next();
        } else if (req.user._id.is_superuser) {
            res.locals.task = task;
            return next();
        }

        req.session.error = 'Access denied';
        res.redirect('back');
    },
    isBidAuthor: async (req, res, next) => {
        let bid = await Bid.findById(req.params.bid_id);

        if (bid.author.equals(req.user._id)) {
            return next();
        }

        req.session.error = 'Can not edit bid!';
        return res.redirect('/');
    },
    isOwnProfileOrSuper: async (req, res, next) => {
        const user = await User.findOne({
            username: req.params.username
        });

        if (user._id.equals(req.user._id) || req.user.is_superuser) return next();

        if (req.query.redirect) {
            req.session.redirectTo = "/auth/admin/user";
        } else {
            req.session.redirectTo = `/auth/profile/${req.user.username}`;
        }

        res.redirect(`/auth/profile/${req.user.username}`);
    }
}
