import express from "express";
import User from "../models/userschema";
import bcrypt from "bcryptjs";

import moment from "moment";
import token from "../models/tokengenerator";
import userMethods from "../models/usermethods";

const router = express.Router();
const now = moment(moment().format('YYYY-MM-DD hh:mm:ss')).toDate();

router.post('/register', async (req, res)=> {
    const{email} = req.body;
   
    try {
        if(await userMethods.findUser({email}))
            return res.status(400).send({error: "E-mail já existente"});
        
        let newUser = {...req.body, ...{"data_criacao": now}, ...{ "ultimo_login":now}, ...{"data_atualizacao":now}};
        
        let user = await userMethods.createUser(newUser);
           
        user.senha = undefined;
        user = {
                "id":user._id, 
                "usuario":user.nome, 
                "dataCriacao": user.data_criacao, 
                "ultimoLogin": user.ultimo_login, 
                "dataAtualizacao": user.data_atualizacao
        } 
        return res.status(200).send({
            user,
            "token": token.tokenGenerator({id:user.id})
        });
    }catch(error){
        return res.status(400).send({error:"Falha ao registrar"})
    }
});

router.post('/login', async (req, res)=> {
    const {email, senha} = req.body;
    const password = true;

    let user = await userMethods.findUser({email}, password);

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
        "dataAtualizacao": user.data_atualizacao
    } 

    res.send({
        user,
        "token": token.tokenGenerator({id:user.id})
    });
})

module.exports = app => app.use('/auth', router);