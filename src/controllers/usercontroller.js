const express = require("express");
const router = express.Router();
const userMethods = require("../models/user.js");

router.post('/register',  (req, res)=> {
    userMethods.userRegister(req, res)
    
});
router.get('/login',  (req, res)=> {
    userMethods.userLogin(req, res)

});

module.exports = app => app.use('/user', router);