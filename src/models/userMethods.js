import User from "./userSchema";

module.exports = {
 
    //Buscar usuário por email
    async findUser(email, password){
        if(!password){
            const result = await User.findOne(email).exec();
            return result;
        }else{
            const result = await User.findOne(email).select('+senha');
            return result;
        }
    },

    //Criar usuário
    async createUser(newUser) {
        const user = await User.create(newUser);
        return user;
    },

    //Atualizar ultima data de login
      updatelastLogin(userParams, now) {
        
        return   User.findOneAndUpdate({ultimo_login:userParams.ultimo_login},{ultimo_login:now}).then( () =>{
            User.findOne({_id:userParams._id}).then((result) => {
                assert(result.ultimo_login === now);
                done();
            })
        })
        
    }

}