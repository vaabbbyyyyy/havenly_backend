const User = require("../../../models/Users");
const bcrypt = require("bcrypt");
const fileUpload = require("express-fileupload");
const { createRouter } = require("../../../routes/apiRouters");
const { validate } = require("../../../helpers/validations");
const { success, error } = require("../../../helpers/response");
const { wrapRequestHandler } = require("../../../helpers/response");
const { body } = require("express-validator");
// Middleware to handle file uploads
createRouter.use(fileUpload());
const { uploadImage } = require('../../../helpers/index')


// Register a user
const createUser = async (req, res) => {
    const { email, password, name, aboutYou, likes, interests, prompts } = req.body;
    let profile = req.files.profile
    profile = uploadImage(profile, "userProfiles");
    // Check if the email is already in use
    const existUser = await User.findOne({ where: { email } });
    if (existUser) {
        return res.send(error("Email ID already in use"));
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        aboutYou,
        likes,
        interests,
        prompts,
        profile
    });

    await user.save();
    req.user = user;
    res.send(success("Signup successful", { user }));
};

// API route for user registration
createRouter.post(
    "/admin/signup",
    validate([
        body("name").notEmpty().withMessage("Name is Required"),
        body("email").notEmpty().withMessage("Email ID is Required"),
        body("password").notEmpty().withMessage("Password is Required"),
    ]),
    wrapRequestHandler(createUser)
);
