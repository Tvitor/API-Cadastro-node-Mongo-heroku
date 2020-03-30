const express = require("express");
const authMiddleWare = require("../middlewares/auth");
const userMethods = require("../models/user/usermethods");

const router = express.Router();

router.use(authMiddleWare);

router.post("/searchuser", (req, res) => {
    userMethods.searchUser(req, res);
    
});

module.exports = app => app.use('/auth', router);