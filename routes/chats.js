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

/* GET chat index /chats */
router.get('/', isLoggedIn, (req, res, next) => {
    res.send('Hi!');
});

/* POST chat create /chats */
router.post('/', isLoggedIn, (req, res, next) => {
    res.send('Hi!');
});

/* PUT chat new message /chats/:chat_id */
router.put(
    '/:chat_id',
    isLoggedIn,
    asyncErrorHandler(isChatParticipant),
    (req, res, next) => {
        res.send('Hi!');
    });

/* PUT chat soft delete /chats/:chat_id/delete */
router.put('/:chat_id', isLoggedIn, asyncErrorHandler(isChatParticipant), (req, res, next) => {
    res.send('Hi!');
});
