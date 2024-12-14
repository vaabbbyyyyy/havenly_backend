const Like = require("../../../models/Like");
const { deleteRouter } = require("../../../routes/apiRouters");
const { success, error } = require("../../../helpers/response");
const { wrapRequestHandler } = require("../../../helpers/response");

const deleteLike = async (req, res) => {
    const { likedBy, likedUser } = req.body;

    if (!likedBy || !likedUser) {
        return res.send(error("Both likedBy and likedUser IDs are required"));
    }

    const like = await Like.findOneAndDelete({ likedBy, likedUser });

    if (!like) {
        return res.send(error("Like not found"));
    }

    res.send(success("Like removed successfully"));
};

// API route to delete a like
deleteRouter.delete("/admin/likes/:userId", wrapRequestHandler(deleteLike));
module.exports = deleteRouter;
