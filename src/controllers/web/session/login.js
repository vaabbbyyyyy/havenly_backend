const User = require("../../../models/Users");
const bcrypt = require("bcrypt");
const { createRouter } = require("../../../routes/apiRouters");
const { validate } = require("../../../helpers/validations");
const { success, error } = require("../../../helpers/response");
const { wrapRequestHandler } = require("../../../helpers/response");
const { body } = require("express-validator");

// Login a user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
        return res.send(error("Invalid email or password"));
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.send(error("Invalid email or password"));
    }

    res.send(success("Login successful", { user }));
};

// API route for user login
createRouter.post(
    "/admin/login",
    validate([
        body("email").notEmpty().withMessage("Email ID is Required"),
        body("password").notEmpty().withMessage("Password is Required"),
    ]),
    wrapRequestHandler(loginUser)
);

module.exports = createRouter;