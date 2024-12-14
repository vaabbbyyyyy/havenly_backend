const {validationResult} = require("express-validator");
const {error} = require("../helpers/response");
const {isString} = require("lodash");

const validate = validations => {
    return async (req, res, next) => {
        await validations.reduce(async (promise, validation) => {
            await promise;
            return validation.run(req);
        }, Promise.resolve());

        const errors = validationResult(req);

        if (errors.isEmpty()) {
            return next();
        }

        const errorsArray = errors.array();
        res.json(error(errorsArray[0].msg, errorsArray));
    };
};

const validatePhone = string => !!string.replace(/[-()\s]/g, "").trim().match(/^\+?[1-9]{0,3}[0-9]{10}$/);
const validateEmail = string => !!string.trim().match(/^([a-z0-9_\-.])+@([a-z0-9_\-.])+\.([a-z]{2,4})$/i);
const postTrimmer = (req, res, next) => {
    if (req.method === "POST") {
        for (const [key, value] of Object.entries(req.body)) {
            if (isString(value))
                req.body[key] = value.trim();
        }
    }

    next();
};

module.exports = {
    validate,
    postTrimmer,
    validatePhone,
    validateEmail
};
