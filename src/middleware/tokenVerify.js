module.exports =  (req, res, next) => {
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

        req.resultToken = token;

        return next();

}