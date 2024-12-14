const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const requireDir = require("require-dir");
const { error } = require("./src/helpers/response");

// Create the Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.static("assets"));
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Dynamically load routes and controllers
requireDir("./src/routes");
requireDir("./src/controllers", { recurse: true });

// Error Handling Middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500).json(error(err.message || "Internal Server Error"));
});

// Export the app
module.exports = { app };