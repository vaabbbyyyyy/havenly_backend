const Chat = require("../../../models/Chat");
const { success, error } = require("../../../helpers/response");
const { wrapRequestHandler } = require("../../../helpers/response");
const { createRouter } = require("../../../routes/apiRouters");

// Create a new chat or get existing chat
const createOrGetChat = async (req, res) => {
    const { userId1, userId2 } = req.body;

    if (!userId1 || !userId2) {
        return res.send(error("Both user IDs are required"));
    }

    let chat = await Chat.findOne({
        participants: { $all: [userId1, userId2] },
    });

    if (!chat) {
        chat = new Chat({
            participants: [userId1, userId2],
        });
        await chat.save();
    }

    res.send(success("Chat fetched successfully", { chat }));
};


// API route for user registration
createRouter.post(
    "/admin/chats",
    wrapRequestHandler(createOrGetChat)
);
