const express = require("express");
const authMiddleWare = require("../middleware/tokenVerify");
const userMethods = require("../models/user.js");
const router = express.Router();

router.use(authMiddleWare);

router.get("/searchuser", (req, res) => {
    userMethods.loginUserFind(req, res);
    
});

module.exports = app => app.use('/auth', router);
