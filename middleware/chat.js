const Chat = require('../models/chat');

module.exports = {
    async isChatParticipant(req, res, next) {
        const chat = await Chat.findById(req.params.chat_id);
        const isParticipant = false;

        for (participant in chat.participants) {
            if (participant.equals(req.user._id)) {
                isParticipant = true;
            }
        }

        if (isParticipant) return next();
        res.redirect('/chats');
    }
}
