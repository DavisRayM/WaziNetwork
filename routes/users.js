var express = require('express');
const User = require('../models/user');
var router = express.Router();

const passport = require('passport');

/* GET /auth index */
router.get('/', (req, res, next) => {
  res.render('auth/index', {
    title: 'Freelance Network - Auth'
  });
});

/* POST /auth/register */
router.post('/register', (req, res, next) => {
  User.register(new User(req.body), req.body.password, (err) => {
    if (err) {
      console.log('Error while creating user!', err);
      return next(err);
    }

    res.redirect('/');
  });
});

/* POST /auth/login */
router.post('/login', (req, res, next) => {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {

      if (info.name === 'IncorrectUsernameError') {
        req.session.error = { username: info.message };
      }

      if (info.name === 'IncorrectPasswordError') {
        req.session.error = { password: info.message };
      }

      return res.redirect('/auth');
    }

    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.redirect('/');
    });
  })(req, res, next);
});

/* GET /auth/logout */
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
