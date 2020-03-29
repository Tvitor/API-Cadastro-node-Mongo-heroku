const express = require("express");
const userMethods = require("../models/user/usermethods.js");

const router = express.Router();

router.post('/register',  (req, res)=> {
    userMethods.userRegister(req, res)
    
});

router.post('/login',  (req, res)=> {
    userMethods.userLogin(req, res)

});

module.exports = app => app.use('/user', router);