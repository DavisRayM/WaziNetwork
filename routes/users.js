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
  updateProfile,
  getAdminPage,
  getAdminDataPage,
  getAdminUserPage,
  getAdminNotificationPage
} = require('../controllers/auth');

var {
  isNotLoggedIn,
  isLoggedIn,
  isSuperUser,
  isOwnProfileOrSuper
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

/* PUT /auth/profile/:username */
router.put('/profile/:username', isOwnProfileOrSuper, upload.single('cv-upload'), asyncErrorHandler(updateProfile));

/* GET /auth/admin */
router.get('/admin', isLoggedIn, isSuperUser, asyncErrorHandler(getAdminPage));

/* GET /auth/admin/data */
router.get('/admin/data', isLoggedIn, isSuperUser, asyncErrorHandler(getAdminDataPage));

/* GET /auth/admin/users */
router.get('/admin/users', isLoggedIn, isSuperUser, asyncErrorHandler(getAdminUserPage));

/* GET /auth/admin/notifications */
router.get('/admin/notifications', isLoggedIn, isSuperUser, asyncErrorHandler(getAdminNotificationPage));

module.exports = router;
