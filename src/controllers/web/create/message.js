const Chat = require("../../../models/Chat");
const { success, error } = require("../../../helpers/response");
const { wrapRequestHandler } = require("../../../helpers/response");
const { createRouter } = require("../../../routes/apiRouters");

// Post a new message to a chat
const postMessage = async (req, res) => {
    const { chatId } = req.params;
    const { sender, message } = req.body;

    if (!chatId || !sender || !message) {
        return res.send(error("Chat ID, sender ID, and message are required"));
    }

    let chat = await Chat.findById(chatId);

    if (!chat) {
        return res.send(error("Chat not found"));
    }

    chat.messages.push({ sender, message });
    await chat.save();

    res.send(success("Message posted successfully", { chat }));
};

// API route to post a message
createRouter.post(
    "/admin/chats/:chatId/messages",
    wrapRequestHandler(postMessage)
);

module.exports = createRouter;