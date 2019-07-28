const passport = require('passport');
const User = require('../models/user');

module.exports = {
    getAuthIndex: (req, res, next) => {
        res.render('auth/index', {
            title: 'Freelance Network - Auth'
        });
    },
    postRegister: async (req, res, next) => {
        const user = await User.register(new User(req.body), req.body.password);

        req.login(user, (err) => {
            if (err) {
                return next(err)
            };
            res.redirect('/auth/profile/' + user.username);
        });
    },
    postLogin: (req, res, next) => {
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {

                if (info.name === 'IncorrectUsernameError') {
                    req.session.error = {
                        username: info.message
                    };
                }

                if (info.name === 'IncorrectPasswordError') {
                    req.session.error = {
                        password: info.message
                    };
                }

                return res.redirect('/auth');
            }

            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                const redirectUrl = req.session.redirectTo || `/auth/profile/${user.username}`;
                delete req.session.redirectTo;
                return res.redirect(redirectUrl);
            });
        })(req, res, next);
    },
    getLogout: (req, res) => {
        req.logout();
        res.redirect('/');
    },
    getProfile: async (req, res, next) => {
        let user = await User.findOne({
            username: req.params.username
        });

        if (!user) {
            // TODO: Custom error
            return res.redirect('/');
        }

        return res.render('auth/user-profile', {
            user: user,
            title: `Freelance Network - ${req.params.username}'s Profile'`
        });
    }
}
