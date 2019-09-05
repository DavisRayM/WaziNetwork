const express = require('express');
const router = express.Router();

const { getIndex, getFaq, postError, putError } = require('../controllers/');
const { asyncErrorHandler } = require('../middleware/')
const { isSuperUser } = require('../middleware/auth');

/* GET home page. */
router.get('/', getIndex);

router.get('/faq', getFaq);

/* POST error creation */
router.post('/', asyncErrorHandler(postError));

/* PUT error solve */
router.put('/:error_id', isSuperUser, asyncErrorHandler(putError));

module.exports = router;
