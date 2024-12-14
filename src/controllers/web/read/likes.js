const Like = require("../../../models/Like");
const User = require("../../../models/Users");
const { retrieveRouter } = require("../../../routes/apiRouters");
const { success, error } = require("../../../helpers/response");
const { wrapRequestHandler } = require("../../../helpers/response");

const fetchLikedUsers = async (req, res) => {
    try {
        const { likedBy } = req.query;

        if (!likedBy) {
            return res.send(error("LikedBy user ID is required"));
        }

        // Find all likes by the likedBy user
        const likes = await Like.find({ likedBy });

        // Extract the likedUser IDs
        const likedUserIds = likes.map(like => like.likedUser);

        // Fetch the name and profile of the liked users
        const likedUsers = await User.find({ _id: { $in: likedUserIds } }, 'name profile');

        if (!likedUsers.length) {
            return res.send(success("No liked users found", { likedUsers: [] }));
        }

        res.send(success("Liked users fetched successfully", { likedUsers }));
    } catch (err) {
        console.error("Error fetching liked users:", err);
        res.send(error("Failed to fetch liked users"));
    }
};

// API route to fetch liked users
retrieveRouter.get("/admin/likes", wrapRequestHandler(fetchLikedUsers));