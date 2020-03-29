import jwt from "jsonwebtoken";
import authConfig from "../config/auth.json";

module.exports = {
    
    //Gerar Token
    tokenGenerator(params = {}) {
        return jwt.sign(params, authConfig.secret, {expiresIn: 86400});
    }
}
