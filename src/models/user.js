const moment = require("moment");
const tokenMethods = require("./token");
const bcrypt = require('bcryptjs');
const now = new Date();
const usermethods = require("./userdata");

module.exports = {
    
    //User Register
    async userRegister(req, res) {
        const{email} = req.body;
        
            if(email){
                if(await usermethods.findUser({email}))
                    return res.status(400).send({error: "E-mail já existente"});
            }
            try { 
                let newUser = {...req.body, ...{"data_criacao": now}, ...{ "ultimo_login":now}, ...{"data_atualizacao":now}};
                
                let user = await usermethods.createUser(newUser);
                
                user.senha = undefined;
                
                usermethods.updatelastLogin(user, now);
                
                let data = await this.userJson(user, now, null);

                tokenMethods.updateToken(data);

                res.status(200).send(data);
            
        }catch(error){
            return res.status(400).send({error:"Falha ao registrar"})
        }

    },

    // login verify
    loginVerify(dataUser){
        const past = moment(dataUser.ultimo_login, 'YYYY-MM-DD HH:mm:ss');
                const now =  new Date(); 
        
                let duration = moment.duration(past.diff(now));
                let resultDuration = parseInt(duration._data.minutes) * -1;

                if(resultDuration > 30)
                    return false;

        return true;
    },

    //User login 
    async userLogin(req, res) {
        const {email, senha} = req.body;
        const password = true;
        
        if(!email || !senha)
            return res.status(400).send({error: 'parametros não informados'}); 

        let user = await usermethods.findUser({email}, password);

        if(!user)
            return res.status(400).send({error: 'Usuário e/ou senha inválidos'});
        if(!await bcrypt.compare(senha, user.senha))
            return res.status(401).send({error: 'Usuário e/ou senha inválidos'});

        usermethods.updatelastLogin(user, now);
            
        let data = await this.userJson(user, now, null);

        tokenMethods.updateToken(data);

        res.status(200).send(data);

    },

    // Search User
    async loginUserFind(req, res) {
        resultToken = await tokenMethods.tokenVerify(req, res)
        
        let userId = req.query.user_id;
        if(!userId)
        return res.status(400).send({error: 'Não autorizado'});
        
        let dataUser = await usermethods.findUserById(userId)
        if(!dataUser)
        return res.status(401).send({error: 'Não autorizado'});
        
        resultToken = resultToken.toString();
        dataUser.token = dataUser.token.toString();
        
        let verifyToken = resultToken === dataUser.token ? true : false;
        if(!verifyToken)
            return res.status(401).send({error: 'Não autorizado'});

        let resultLogin = await this.loginVerify(dataUser);
        if(!resultLogin)
        return res.status(401).send({error: 'Sessão inválida'});
        
        let data = await this.userJson(dataUser, false, true);   

        return res.status(200).send(data);
    },

    //User Json 
       userJson (dataUser, now, search) {
        let user;
        if(!search){

            user = {
                "id":dataUser._id, 
                "usuario":dataUser.nome, 
                "dataCriacao": dataUser.data_criacao, 
                "ultimoLogin": now, 
                "dataAtualizacao": dataUser.data_atualizacao
            };

            return {user, "token": tokenMethods.tokenGenerator({id:user.id})}

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
}