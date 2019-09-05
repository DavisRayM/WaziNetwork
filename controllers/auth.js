const passport = require('passport');
const User = require('../models/user');
const Task = require('../models/task');

const {
    cloudinary
} = require('../cloudinary');

module.exports = {
    getAuthIndex: (req, res, next) => {
        res.render('auth/index', {
            title: 'Wazi Network - Auth'
        });
    },
    postRegister: async (req, res, next) => {
        if (req.file) {
            req.body.portfolio = {
                secure_url: req.file.secure_url,
                public_id: req.file.public_id
            };
        }

        console.log(req.body);

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

                var redirectUrl = '';

                if (user.is_superuser) {
                    redirectUrl = '/auth/admin'
                } else {
                    redirectUrl = req.session.redirectTo || `/auth/profile/${user.username}`;
                }

                delete req.session.redirectTo;
                return res.redirect(redirectUrl);
            });
        })(req, res, next);
    },
    updateProfile: async (req, res, next) => {
        const user = await User.findOne({
            username: req.params.username
        });

        if (req.file) {
            console.log(req.file);
            if (user.portfolio.public_id) {
                await cloudinary.v2.uploader.destroy(user.portfolio.public_id);
            }

            user.portfolio = {
                secure_url: req.file.secure_url,
                public_id: req.file.public_id
            };
        }

        user.fname = req.body.fname;
        user.lname = req.body.lname;
        user.contact_number = req.body.contact_number;
        user.bio = req.body.bio;
        user.experience_level = req.body.experience_level;

        await user.save();
        res.redirect(`/auth/profile/${user.username}`);
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
            title: `Wazi Network - ${req.params.username}'s Profile'`
        });
    },
    getAdminPage: async (req, res, next) => {
        const users = await User.find({});
        const tasks = await Task.find({});
        res.render('auth/admin', {
            title: "Admin Portal",
            users: users,
            tasks_length: tasks.length,
            page: "dash"
        });
    },
    getAdminDataPage: async (req, res, next) => {
        const tasks = await Task.find({}).populate('author').populate('assigned_user');
        res.render('auth/admin_data', {
            title: "Admin Portal - Data Page",
            tasks: tasks,
            page: "data"
        });
    },
    getAdminUserPage: async (req, res, next) => {
        const users = await User.find({});

        res.render("auth/admin_user", {
            title: "Admin Portal - User Page",
            users: users,
            page: "users"
        })
    },
}
