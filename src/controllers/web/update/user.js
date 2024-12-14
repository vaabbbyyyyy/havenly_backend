const User = require("../../../models/Users");
const { updateRouter } = require("../../../routes/apiRouters");
const { success, error } = require("../../../helpers/response");
const { wrapRequestHandler } = require("../../../helpers/response");
const { uploadImage } = require('../../../helpers/index')

const updateUser = async (req, res) => {
    const userId = req.headers.userid;  // Access from headers

    const user = await User.findOne({ _id: userId });
    if (!user) {
        return res.json(error("User ID not found"));
    }
    let profile = user.profile;
    if (!req.files || !req.files.profile) {
        return res.json(error("Profile is required"));
    }
    console.log(req.files, '=====================')
    const profileFile = req.files.profile;
    profile = uploadImage(profileFile, "userProfiles");
    user.profile = profile;
    await user.save();
    return res.send(success("Profile updated successfully", { user }));
};



// API route to fetch users
updateRouter.put("/admin/user-profile", wrapRequestHandler(updateUser));