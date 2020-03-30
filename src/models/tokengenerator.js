const jwt = require("jsonwebtoken");
const env = require("../config/auth.json");
module.exports = {
    //Create Token
    tokenGenerator(params) {
        return jwt.sign(params, env.secret, {expiresIn: 86400});
    }
}
