const Chat = require('../models/chat');
const ObjectId = require('mongoose').Types.ObjectId;

const appName = process.env.APP_NAME;

module.exports = {
    async chatIndex(req, res, next) {
        let chats = await Chat.find({
            participants: ObjectId(req.user._id),
            deleted: false
        });

        res.render('chats/index');
    },

    async chatCreate(req, res, next) {
        let chat = await Chat.create(req.body.chat);
        req.session.success = 'Chat instance initialized';
        res.redirect(`/chats`);
    },

    async chatMessage(req, res, next) {
        let chat = await Chat.findById(req.params.chat_id);

        const message = {
            text: req.body.message,
            sender: req.user._id,
            sent_on: Date.now
        };

        chat.messages.push(message);
        await chat.save();
        res.redirect(`/chats/${chat.id}`);
    },

    async chatDelete(req, res, next) {
        let chat = await Chat.findByIdAndUpdate(req.params.chat_id, {
            deleted: true,
            deleted_at: Date.now
        });

        chat.save();
        res.redirect('/chats');
    }
}
