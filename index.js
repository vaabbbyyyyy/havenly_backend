require("dotenv").config();
const { error } = require("./src/helpers/response.js");
const { app } = require("./app.js");
const { HOST, PORT } = require("./src/constants.js");
const requireDir = require("require-dir");
requireDir("./src/routes");
requireDir("./src/controllers", { recurse: true });
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Error connecting to MongoDB', err));

app.use(function (err, req, res, next) {
    res.json(error(err.message));
});

// Start the server
app.listen(Number(PORT), HOST, async () => {
    console.log(`Listening on ${HOST}:${PORT}`);
});
