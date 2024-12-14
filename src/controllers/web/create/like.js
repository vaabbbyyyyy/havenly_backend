const Like = require("../../../models/Like");
const { success, error } = require("../../../helpers/response");
const { wrapRequestHandler } = require("../../../helpers/response");
const { createRouter } = require("../../../routes/apiRouters");

// Create a new like
const createLike = async (req, res) => {
    const { likedBy, likedUser } = req.body;

    if (!likedBy || !likedUser) {
        return res.send(error("Both likedBy and likedUser IDs are required"));
    }

    let like = await Like.findOne({ likedBy, likedUser });

    if (!like) {
        like = new Like({
            likedBy,
            likedUser,
        });
        await like.save();
    }

    res.send(success("Like recorded successfully", { like }));
};

// API route to create a like
createRouter.post(
    "/admin/likes",
    wrapRequestHandler(createLike)
);

module.exports = createRouter;