import express from "express";
import User from "../model/userSchema";
import bcrypt from "bcryptjs";
import moment from "moment";
import token  from "../config/tokenGenerator";
import userMethods from "../model/userMethods";

const router = express.Router();
const now = moment(moment().format('YYYY-MM-DD hh:mm:ss')).toDate();

router.post('/register', async(req, res)=> {
    const{email} = req.body;
    
    try {
        if(await User.findOne({email}))
            return res.status(400).send({error: "E-mail já existente"});
        
            let newUser = {...req.body, ...{"data_criacao": now}, ...{ "ultimo_login":now}, ...{"data_atualizacao":now}};
            
            let user = await userMethods.createUser(newUser);
           
        user.senha = undefined;
        user = {
                "id":user._id, 
                "usuario":user.nome, 
                "dataCriacao": user.data_criacao, 
                "ultimoLogin": user.ultimo_login, 
                "dataAtualizacao": user.data_atualizacao,
                "token": token.tokenGenerator({id:user._id})
        } 
        
        return res.status(200).send(user);
    }catch(err){
        return res.status(400).send({error:"Falha ao registrar"})
    }
});

router.post('/login', async (req, res)=> {
    const {email, senha} = req.body;
    
    let user = await User.findOne({email}).select('+senha');

    if(!user)
        return res.status(400).send({error: 'Usuário e/ou senha inválidos'});
    if(!await bcrypt.compare(senha, user.senha))
        return res.status(401).send({error: 'Usuário e/ou senha inválidos'});

        await userMethods.updatelastLogin(user, now);

    user = {
        "id":user._id, 
        "usuario":user.nome, 
        "dataCriacao": user.data_criacao, 
        "ultimoLogin": now, 
        "dataAtualizacao": user.data_atualizacao,
        "token": token.tokenGenerator({id:user._id})
    } 

    res.send({user});
})

module.exports = app => app.use('/auth', router);