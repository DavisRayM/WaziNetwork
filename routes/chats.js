const express = require('express');
const router = express.Router();

const {
    asyncErrorHandler
} = require('../middleware');
const {
    isChatParticipant
} = require('../middleware/chat');
const {
    isLoggedIn
} = require('../middleware/auth');

const {
    chatIndex,
    chatCreate,
    chatDelete,
    chatMessage
} = require('../controllers/chat');

/* GET chat index /chats */
router.get('/', isLoggedIn, asyncErrorHandler(chatIndex));

/* POST chat create /chats */
router.post('/', isLoggedIn, asyncErrorHandler(chatCreate));

/* PUT chat new message /chats/:chat_id */
router.put(
    '/:chat_id',
    isLoggedIn,
    asyncErrorHandler(isChatParticipant),
    asyncErrorHandler(chatMessage));

/* PUT chat soft delete /chats/:chat_id/delete */
router.put('/:chat_id', isLoggedIn, asyncErrorHandler(isChatParticipant), asyncErrorHandler(chatDelete));

module.exports = router;
