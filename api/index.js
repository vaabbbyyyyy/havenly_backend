require("dotenv").config();
const { error } = require("./src/helpers/response");
const { app } = require("./app");
const mongoose = require("mongoose");

// Connect to MongoDB
mongoose
    .connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => console.error("Error connecting to MongoDB", err));

// Serverless export: Vercel expects this pattern for API routes
module.exports = (req, res) => {
    // Handling different HTTP methods
    app(req, res);
};