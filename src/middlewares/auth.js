import jwt from "jsonwebtoken";

const authConfig = require("../config/auth.json");

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader)
    return res.status(401).send({error: 'Nenhum token informado'});

    const parts = authHeader.split(' ');

    if(!parts.length === 2)
    return res.status(401).send({error: 'token incorreto'});

    const [scheme, token] = parts;
    let regex = /^Bearer$/i.test(scheme);

    if(!regex)
    return res.status(401).send({error: 'token não formado'});

    jwt.verify(token,authConfig.secret, (err, decoded) => {
        if(err) return res.status(401).send({error: 'token inválido'});

        req.userId = decoded.id;
        return next();
    })
}