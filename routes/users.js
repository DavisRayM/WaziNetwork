var express = require('express');
const User = require('../models/user');
var router = express.Router();

const passport = require('passport');

/* GET /auth index */
router.get('/', (req, res, next) => {
  res.send('respond with auth index');
});

/* GET /auth/register */
router.get('/register', (req, res, next) => {
  res.send('respond with register page');
});

/* POST /auth/register */
router.post('/register', (req, res, next) => {
  console.log('Registering user!');
  User.register(new User(req.body), req.body.password, (err) => {
    if (err) {
      console.log('Error while creating user!', err);
      return next(err);
    }

    console.log('User registered');
    res.redirect('/');
  });
});

/* GET /auth/login */
router.get('/login', (req, res, next) => {
  res.send('respond with login page');
});

/* POST /auth/login */
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.redirect('/');
});

/* GET /auth/logout */
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
