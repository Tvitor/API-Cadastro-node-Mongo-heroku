import jwt from "jsonwebtoken";
const authConfig = require("./auth.json");

module.exports = {

    tokenGenerator(params = {}) {
        return jwt.sign(params, authConfig.secret, {expiresIn: 86400});
    }
}