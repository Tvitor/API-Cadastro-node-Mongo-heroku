import User from "./userSchema";

module.exports = {

    createUser(userParams) {
        return User.create(userParams);
    },

    updatelastLogin(userParams, now) {
        
        User.findOneAndUpdate({ultimo_login:userParams.ultimo_login},{ultimo_login:now}).then( () =>{
            User.findOne({_id:userParams._id}).then((result) => {
                assert(result.ultimo_login === now);
                done();
            })
        })
        return;
    }
}