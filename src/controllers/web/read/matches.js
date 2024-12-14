const Like = require("../../../models/Like");
const User = require("../../../models/Users");
const { retrieveRouter, deleteRouter } = require("../../../routes/apiRouters");
const { success, error } = require("../../../helpers/response");
const { wrapRequestHandler } = require("../../../helpers/response");

const fetchMatches = async (req, res) => {
    try {
        const { likedUser } = req.query;

        if (!likedUser) {
            return res.send(error("LikedUser ID is required"));
        }

        const likes = await Like.find({ likedUser }).populate('likedBy', 'name profile');

        const matchedUsers = likes.map(like => ({
            _id: like.likedBy._id,
            name: like.likedBy.name,
            profile: like.likedBy.profile
        }));

        if (!matchedUsers.length) {
            return res.send(success("No matches found", { matchedUsers: [] }));
        }

        res.send(success("Matches fetched successfully", { matchedUsers }));
    } catch (err) {
        console.error("Error fetching matches:", err);
        res.send(error("Failed to fetch matches"));
    }
};

// API route to fetch matches
retrieveRouter.get("/admin/matches", wrapRequestHandler(fetchMatches));

module.exports = { retrieveRouter };