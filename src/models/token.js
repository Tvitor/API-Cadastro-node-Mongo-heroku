const jwt = require("jsonwebtoken");
const key = require("../../config/auth.json");
const User = require("./userschema");

const moment = require("moment");
const now = new Date();
const userdata = require("./userdata");

module.exports = {

    // token verify
    tokenVerify(req, res){
        
        const authHeader = req.headers.authorization;
        if(!authHeader)
        return res.status(401).send({error: 'Não autorizado'});
    
        const parts = authHeader.split(' ');
        if(!(parts.length === 2))
        return res.status(401).send({error: 'Não autorizado'});
    
        const [scheme, token] = parts;
        let regex = /^Bearer$/i.test(scheme);
        if(!regex)
        return res.status(401).send({error: 'Não autorizado'});
    
        jwt.verify(token, key.secret, async (err, decoded) => {
            if(err) return res.status(401).send({error: 'Não autorizado'});
            
            userdata.findUserById(decoded.id).then(function(resultUser){
                if(!resultUser)
                    return res.status(401).send({error: 'Não autorizado'});
                    
                })
            })
            return token;
    },

    //Create Token
    tokenGenerator(params) {
        return jwt.sign(params, key.secret, {expiresIn: 86400});
    },
    
    //decode Token
    tokendDecoded(req, res){
        const authHeader = req.headers.authorization;
        const parts = authHeader.split(' ');
        const [scheme, token] = parts;
        let regex = /^Bearer$/i.test(scheme);
        return token;
    } ,

    
    //Change token
    updateToken(data){
        User.updateOne(
            { _id: data.user.id },
            { $set: { token: data.token}},{upsert:true}).then((result, err) => {
               return 
           })
    }
}
