const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true, // Removes unnecessary spaces
        },
        email: {
            type: String,
            required: true,
            unique: true, // Ensures no duplicate emails
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        profile: {
            type: String,
            required: false,
        },
        aboutYou: {
            type: String,
            required: false,
        },
        likes: {
            type: [String], // Array of strings for multiple likes
            required: false,
        },
        interests: {
            type: [String], // Array of strings for multiple interests
            required: false,
        },
        prompts: {
            type: [String], // Array of strings for multiple prompts
            required: false,
        },
    },
    {
        timestamps: true, // Automatically includes `createdAt` and `updatedAt` fields
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;