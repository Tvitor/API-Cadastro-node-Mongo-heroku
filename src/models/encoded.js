
module.exports = {

     tokenencoded(req, res){
        const authHeader = req.headers.authorization;
        const parts = authHeader.split(' ');
        const [scheme, token] = parts;
        let regex = /^Bearer$/i.test(scheme);
        return token;
    } 
}