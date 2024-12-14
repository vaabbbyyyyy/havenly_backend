const Like = require("../../../models/Like");
const { updateRouter } = require("../../../routes/apiRouters");
const { success, error } = require("../../../helpers/response");
const { wrapRequestHandler } = require("../../../helpers/response");


const updateLike = async (req, res) => {
    try {
        const { likedBy, likedUser } = req.body;

        const newLike = new Like({
            likedBy,
            likedUser,
        });

        await newLike.save();

        res.send(success("Like recorded successfully", newLike));
    } catch (err) {
        res.send(error("Failed to record like", err));
    }
};
updateRouter.put("/admin/user-like", wrapRequestHandler(updateLike));
