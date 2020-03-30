const assert = require("assert");
const User = require("../user/userschema");

module.exports = {
    
    //Criar usuário
    async createUser(newUser) {
        const user = await User.create(newUser);
        return user;
    },

    //Buscar usuário por email
    async findUser(email, password, id){
        if(!password){
            const result = await User.findOne(email).exec();
            return result;
        }else{
            const result = await User.findOne(email).select('+senha');
            return result;
        }
    },

       //Buscar usuário por ID
       async findUserById(id){
        if(id)
            return User.findOne({_id:id});
        
    },

    //Atualizar ultima data de login
    updatelastLogin(userParams, now) {
        
           User.findOneAndUpdate({ultimo_login:userParams.ultimo_login},{ultimo_login:now}).then( () =>{
                    User.findOne({_id:userParams._id}).then((result) => {
                        assert(result.ultimo_login , now);
                        return;
                    })
                    
            });
        
    }

}