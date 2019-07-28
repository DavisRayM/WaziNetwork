module.exports = {
    isLoggedIn: (req, res, next) => {
        if (req.isAuthenticated()) return next();
        res.redirect('/auth');
    },
    isNotLoggedIn: (req, res, next) => {
        if (req.isAuthenticated()) res.redirect(`/auth/profile/${req.user.username}`);
        return next();
    }
}
