const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  storage
} = require('../cloudinary');

const upload = multer({
  storage
});

const {
  asyncErrorHandler
} = require('../middleware');

const {
  isLoggedIn,
  isTaskAuthor
} = require('../middleware/auth');

const {
  taskIndex,
  taskNew,
  taskCreate,
  taskShow,
  taskEdit,
  taskUpdate,
  taskDestroy
} = require('../controllers/task');

/* GET tasks index /tasks. */
router.get('/', isLoggedIn, asyncErrorHandler(taskIndex));

/* GET tasks create /tasks/new. */
router.get('/new', isLoggedIn, taskNew);

/* POST tasks create /tasks. */
router.post('/', isLoggedIn, upload.single('additional_content'), asyncErrorHandler(taskCreate));

/* GET tasks show /tasks/:id. */
router.get('/:id', isLoggedIn, asyncErrorHandler(taskShow));

/* GET tasks edit /tasks/:id/edit. */
router.get('/:id/edit', isLoggedIn, asyncErrorHandler(isTaskAuthor), asyncErrorHandler(taskEdit));

/* PUT tasks update /tasks/:id. */
router.put('/:id', isLoggedIn, asyncErrorHandler(isTaskAuthor), upload.single('additional_content'), asyncErrorHandler(taskUpdate));

/* DELETE tasks destroy /tasks/:id. */
router.delete('/:id', isLoggedIn, asyncErrorHandler(isTaskAuthor), asyncErrorHandler(taskDestroy));

module.exports = router;
