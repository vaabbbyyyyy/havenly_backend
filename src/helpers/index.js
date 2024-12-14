// const { userToken, User, UserPermission, Permission } = require("../models");
// const { compareSync, hashSync } = require("bcrypt");
// const { transporter } = require("../app");
// let moment = require("moment");
const path = require("path");
// const jwt = require("jsonwebtoken");
const fs = require("fs");
const { error } = require('../helpers/response')

// function encryptPassword(string) {
//     return hashSync(string, 4);
// }

// function matchPasswords(encrypted, password) {
//     return compareSync(password, encrypted);
// }

// const pagination = (data, limit, page) => {
//     if (limit && !page) {
//         return data.slice(0, limit);
//     } else if (!limit && page) {
//         const offset = 10 * (page - 1);
//         return data.slice(offset, offset + 10);
//     } else if (limit && page) {
//         const offset = limit * (page - 1);
//         return data.slice(offset, offset + Number(limit));
//     } else {
//         return data;
//     }
// }

const uploadImage = (image, filepath) => {
    const fileName = image.md5 + +new Date + 1;
    const extension = path.extname(image.name);
    image.mv(`assets/${filepath}/` + fileName + extension);
    return fileName + extension;
}

// const unlinkFile = async (fileName) => {
//     await fs.unlink(path.resolve(__dirname, `../../../../assets/upload_csv/${fileName}`), (err) => {
//         if (err) console.error('Error deleting file:', err);
//         else console.log('File deleted successfully');
//     });
// }

// const getLoginTokenFromRequest = async (req) => {
//     let { login_token } = req;
//     if (!login_token) {
//         let token_id = req.headers.authorization || req.query.token_id || "";
//         token_id = token_id.replace("Bearer ", "");
//         login_token = await userToken.findOne({
//             where: {
//                 token: token_id
//             }
//         });
//     }

//     return login_token;
// };


// const hasPermissionOrFail = async (req, value) => {
//     const { user_id } = await getLoginTokenFromRequest(req);
//     const user = await User.findOne({
//         where: { id: user_id },
//         include: [{
//             model: Permission,
//             as: "permissions"
//         }]
//     });
//     // console.log(value);
//     const checkPermission = await user.permissions.find(({ code }) => code == value);
//     // console.log(checkPermission);
//     // if (!checkPermission)
//     //     throw new Error("You don't allowed for this actions");
//     // else
//     //     return true;
// };

// const generateToken = (user) => {
//     return jwt.sign(
//         { user_id: user.id, name: user.name, email: user.email, mobile: user.mobile_number },
//         process.env.SECRET_KEY
//     );
// }

// const sendEmail = (to_email, subject, text, data, filename, path) => {
//     try {
//         transporter.sendMail({
//             from: "nikhilsingh7834@gmail.com",
//             to: to_email,
//             subject: subject,
//             text: text,
//             html: data,
//             attachments: [{
//                 filename: filename,
//                 path: path,
//                 contentType: 'application/pdf'
//             }],
//         });
//     } catch (e) {
//         console.log(e, '---email not send---');
//     } finally {
//         console.log('email send')
//     }
// }

// const randomPassword = () => {
//     let pass = '';
//     const str = '1234567890';

//     for (let i = 1; i <= 5; i++) {
//         const char = Math.floor(Math.random()
//             * str.length + 1);

//         pass += str.charAt(char)
//     }
//     return pass;
// }

// function monthFormat(value) {
//     return moment(value).format('MMMM Do YYYY');
// }

// function timeFormat(value) {
//     return moment(value).format('h:mm:ss a');
// }

// function newDate(value) {
//     return moment(value).format("DD/MM/YYYY");
// }

module.exports = {
    // getLoginTokenFromRequest,
    // encryptPassword,
    // generateToken,
    // matchPasswords,
    // pagination,
    // hasPermissionOrFail,
    // sendEmail,
    // randomPassword,
    uploadImage,
    // monthFormat,
    // timeFormat,
    // newDate,
    // unlinkFile
};
