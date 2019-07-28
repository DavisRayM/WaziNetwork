const express = require('express');
const router = express.Router({ mergeParams: true });

const { asyncErrorHandler } = require('../middleware');
const { isBidAuthor } = require('../middleware/auth');
const { bidCreate, bidUpdate, bidDestroy } = require('../controllers/bid');

/* POST bids create /tasks/:id/bids. */
router.post('/', asyncErrorHandler(bidCreate));

/* PUT bids update /tasks/:id/bids/:bid_id. */
router.put('/:bid_id', isBidAuthor, asyncErrorHandler(bidUpdate));

/* DELETE bids destroy /tasks/:id/bids/:bid_id. */
router.delete('/:bid_id', isBidAuthor, asyncErrorHandler(bidDestroy));

module.exports = router;
