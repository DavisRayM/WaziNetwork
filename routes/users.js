var express = require('express');
var router = express.Router();

var {
  getAuthIndex,
  getLogout,
  getProfile,
  postLogin,
  postRegister
} = require('../controllers/auth');

var { isNotLoggedIn, isLoggedIn } = require('../middleware/auth');

/* GET /auth index */
router.get('/', isNotLoggedIn, getAuthIndex);

/* POST /auth/register */
router.post('/register', isNotLoggedIn, postRegister);

/* POST /auth/login */
router.post('/login', isNotLoggedIn, postLogin);

/* GET /auth/logout */
router.get('/logout', getLogout);

/* GET /auth/profile */
router.get('/profile/:username', isLoggedIn, getProfile);

module.exports = router;
