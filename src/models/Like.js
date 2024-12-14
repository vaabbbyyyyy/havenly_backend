const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
    {
        likedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        likedUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true, // Automatically includes `createdAt` and `updatedAt` fields
    }
);

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;