var express = require('express');
var router = express.Router();
const multer = require('multer');
const {
  storage
} = require('../cloudinary');

const upload = multer({
  storage
});

var {
  getAuthIndex,
  getLogout,
  getProfile,
  postLogin,
  postRegister,
  getAdminPage,
  getAdminDataPage,
  getAdminUserPage
} = require('../controllers/auth');

var {
  isNotLoggedIn,
  isLoggedIn,
  isSuperUser
} = require('../middleware/auth');

var { asyncErrorHandler } = require('../middleware');

/* GET /auth index */
router.get('/', isNotLoggedIn, getAuthIndex);

/* POST /auth/register */
router.post('/register', isNotLoggedIn, upload.single('cv-upload'), asyncErrorHandler(postRegister));

/* POST /auth/login */
router.post('/login', isNotLoggedIn, postLogin);

/* GET /auth/logout */
router.get('/logout', getLogout);

/* GET /auth/profile */
router.get('/profile/:username', isLoggedIn, asyncErrorHandler(getProfile));

/* GET /auth/admin */
router.get('/admin', isLoggedIn, isSuperUser, asyncErrorHandler(getAdminPage));

/* GET /auth/admin/data */
router.get('/admin/data', isLoggedIn, isSuperUser, asyncErrorHandler(getAdminDataPage));

/* GET /auth/admin/users */
router.get('/admin/users', isLoggedIn, isSuperUser, asyncErrorHandler(getAdminUserPage));

module.exports = router;
