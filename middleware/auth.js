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
    isTaskAuthor: async (req, res, next) => {
        const task = await Task.findById(req.params.id);
        if (task.author.equals(req.user._id)) {
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
}
