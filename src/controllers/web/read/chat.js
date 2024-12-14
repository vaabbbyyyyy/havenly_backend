const Chat = require("../../../models/Chat");
const { success, error } = require("../../../helpers/response");
const { wrapRequestHandler } = require("../../../helpers/response");
const { retrieveRouter } = require("../../../routes/apiRouters");

// Fetch all chats for a user
const fetchChats = async (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        return res.send(error("User ID is required"));
    }

    const chats = await Chat.find({ participants: userId }).populate('participants', 'name profile');

    res.send(success("Chats fetched successfully", { chats }));
};

// Fetch a specific chat by ID
const fetchChatById = async (req, res) => {
    const { chatId } = req.params;

    if (!chatId) {
        return res.send(error("Chat ID is required"));
    }

    const chat = await Chat.findById(chatId).populate('participants', 'name profile');

    if (!chat) {
        return res.send(error("Chat not found"));
    }

    res.send(success("Chat fetched successfully", { chat }));
};

// API routes
retrieveRouter.get("/admin/chats", wrapRequestHandler(fetchChats));
retrieveRouter.get("/admin/chats/:chatId", wrapRequestHandler(fetchChatById));

module.exports = retrieveRouter;