import jwt from "jsonwebtoken";

module.exports = {
    
    //Gerar Token
    tokenGenerator(params) {
        return jwt.sign(params, process.env.SECRET, {expiresIn: 86400});
    }
}
