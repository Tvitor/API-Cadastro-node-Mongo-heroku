const jwt = require("jsonwebtoken");
const dataUser = require("../models/user/userData");
const moment = require("moment");
const now = new Date(); // today

module.exports = (req, res, next) => {
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

    jwt.verify(token, process.env.SECRET, async (err, decoded) => {
        if(err) return res.status(401).send({error: 'Não autorizado'});
        
        dataUser.findUserById(decoded.id).then(function(resultUser){
            if(!resultUser)
                return res.status(401).send({error: 'Não autorizado'});
    
            const past = moment(resultUser.ultimo_login, 'YYYY-MM-DD HH:mm:ss');
            const newNow =  moment(now, 'YYYY-MM-DD HH:mm:ss'); 
    
            let duration = moment.duration(past.diff(newNow));
            let resultDuration = parseInt(duration._data.minutes) * -1;
    
            if(resultDuration > 30)
                return res.status(401).send({error: 'Sessão inválida'});
    
            req.userId = decoded.id;
            
            return next();
        });
        
    })
}