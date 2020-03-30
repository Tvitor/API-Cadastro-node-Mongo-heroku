const bcrypt = require('bcryptjs');
const moment = require("moment");

const token = require("../tokengenerator");
const userData = require("../user/userData");
const encoded = require("../../models/encoded");

const now = moment(moment().format('YYYY-MM-DD hh:mm:ss')).toDate();

module.exports = {
    
    //User Register
    async userRegister(req, res) {
        const{email} = req.body;
        
        try {
            if(email){
                if(await userData.findUser({email}))
                    return res.status(400).send({error: "E-mail já existente"});
                
                let newUser = {...req.body, ...{"data_criacao": now}, ...{ "ultimo_login":now}, ...{"data_atualizacao":now}};
                
                let user = await userData.createUser(newUser);
                
                user.senha = undefined;

                await userData.updatelastLogin(user, now);
                
                let data = await userJson(user, now);

                await userData.updateToken(data);

                res.status(200).send(data);
            }
        }catch(error){
            return res.status(400).send({error:"Falha ao registrar"})
        }

    },

    //User login 
    async userLogin(req, res) {
        const {email, senha} = req.body;
        const password = true;
        
        if(!email || !senha)
            return res.status(400).send({error: 'parametros não informados'}); 

        let user = await userData.findUser({email}, password);

        if(!user)
            return res.status(400).send({error: 'Usuário e/ou senha inválidos'});
        if(!await bcrypt.compare(senha, user.senha))
            return res.status(401).send({error: 'Usuário e/ou senha inválidos'});

        await userData.updatelastLogin(user, now);
            
        let data = await userJson(user, now);

        await userData.updateToken(data);

        res.status(200).send(data);

    },

    // Search User
    async searchUser(req, res) {
        let userId = req.body.user_id;

        if(!userId)
            return res.status(400).send({error: 'parametros não informados'});

        let userToken = await encoded.tokenencoded(req, res);
        let dataUser = await userData.findUserById(userId)

        if(!dataUser)
            return res.status(401).send({error: 'Não autorizado'});
            
        userToken = userToken.toString();
        dataUser.token = dataUser.token.toString();

        let verifyToken = userToken === dataUser.token ? true : false;
        
        if(!verifyToken)
            return res.status(401).send({error: 'Não autorizado'});

        let data = await userJson(dataUser, false, true);   

        res.status(200).send(data);
    }

};

    //User Json 
    function userJson(dataUser, now, search){
        
        let user;
        if(!search){

            user = {
                "id":dataUser._id, 
                "usuario":dataUser.nome, 
                "dataCriacao": dataUser.data_criacao, 
                "ultimoLogin": now, 
                "dataAtualizacao": dataUser.data_atualizacao
            };

            return {user, "token": token.tokenGenerator({id:user.id})}

        }else{
            user = {
                "id":dataUser._id, 
                "usuario":dataUser.nome, 
                "dataCriacao": dataUser.data_criacao, 
                "ultimoLogin": dataUser.ultimo_login, 
                "dataAtualizacao": dataUser.data_atualizacao
            };
            return {user, "token":dataUser.token};
        }
    
}