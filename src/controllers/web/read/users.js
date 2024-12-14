const User = require("../../../models/Users");
const { retrieveRouter } = require("../../../routes/apiRouters");
const { success, error } = require("../../../helpers/response");
const { wrapRequestHandler } = require("../../../helpers/response");

const fetchUsers = async (req, res) => {
    try {
        const { exclude } = req.query;

        if (!exclude) {
            return res.send(error("Logged-in user ID is required"));
        }

        const users = await User.find({ _id: { $ne: exclude } });

        if (!users.length) {
            return res.send(success("No users found", { users: [] }));
        }

        res.send(success("Users fetched successfully", { users }));
    } catch (err) {
        console.error("Error fetching users:", err);
        res.send(error("Failed to fetch users"));
    }
};


// API route to fetch users
retrieveRouter.get("/admin/users", wrapRequestHandler(fetchUsers));