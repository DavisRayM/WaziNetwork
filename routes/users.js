var express = require('express');
var router = express.Router();

var {
  getAuthIndex,
  getLogout,
  getProfile,
  postLogin,
  postRegister,
  getAdminPage,
  getAdminDataPage
} = require('../controllers/auth');

var { isNotLoggedIn, isLoggedIn, isSuperUser } = require('../middleware/auth');

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

/* GET /auth/admin */
router.get('/admin', isLoggedIn, isSuperUser, getAdminPage);

/* GET /auth/admin/data */
router.get('/admin/data', isLoggedIn, isSuperUser, getAdminDataPage);

module.exports = router;
