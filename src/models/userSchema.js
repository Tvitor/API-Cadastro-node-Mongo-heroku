import mongoose from "../database";
import bcrypt from "bcryptjs";

const Schema = mongoose.Schema;

const UserSchema = new Schema({

        nome: {
            type: String,
            require:true
        },

        email: {
            type: String,
            unique: true,
            required:true,
            lowercase: true,
        },
        senha: {
            type: String,
            required:true,
            select: false
        },
        data_criacao: {
            type: Date
            
        },
        ultimo_login:{
            type: Date
        },
        data_atualizacao:{
            type:Date
        },
        telefones:[{
            numero: String,
            ddd: String,
            _id: false
        }]
})

UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.senha, 10);
    this.senha = hash;

    next();
})

const User = mongoose.model('Users', UserSchema);
module.exports = User;