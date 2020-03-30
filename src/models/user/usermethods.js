const bcrypt = require('bcryptjs');
const moment = require("moment");

const token = require("../tokengenerator");
const userData = require("../user/userData");

const now = moment(moment().format('YYYY-MM-DD hh:mm:ss')).toDate();

module.exports = {
    
    //Cadastrar usuario
    async userRegister(req, res) {
        const{email} = req.body;
   
        try {
            if(await userData.findUser({email}))
                return res.status(400).send({error: "E-mail já existente"});
            
            let newUser = {...req.body, ...{"data_criacao": now}, ...{ "ultimo_login":now}, ...{"data_atualizacao":now}};
            
            let user = await userData.createUser(newUser);
            
            user.senha = undefined;

            await userData.updatelastLogin(user, now);

            let result = await userJson(user, now);
            res.status(200).send(result);

        }catch(error){
            return res.status(400).send({error:"Falha ao registrar"})
        }

    },

    //Logar usuario
    async userLogin(req, res) {
        const {email, senha} = req.body;
        const password = true;

        let user = await userData.findUser({email}, password);

        if(!user)
            return res.status(400).send({error: 'Usuário e/ou senha inválidos'});
        if(!await bcrypt.compare(senha, user.senha))
            return res.status(401).send({error: 'Usuário e/ou senha inválidos'});

        await userData.updatelastLogin(user, now);
            
        let result = await userJson(user, now);
        res.status(200).send(result);

    },

    async searchUser(req, res) {
        
        let user = await userData.findUserById(req.userId)
        let result = await userJson(user, null, true);

        res.status(200).send(result);
    }

};



//Preparar json do usuario para envio
function userJson(dataUser, now, search){
    
    let user;
    if(!search){

        user = {
            "id":user._id, 
            "usuario":user.nome, 
            "dataCriacao": user.data_criacao, 
            "ultimoLogin": now, 
            "dataAtualizacao": user.data_atualizacao
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
        return user;
    }
    
}