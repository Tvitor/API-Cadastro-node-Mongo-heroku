import express from "express";

const authMiddleWare = require("../middlewares/auth");
const router = express.Router();

router.use(authMiddleWare);

router.get("/", (req, res) => { res.send(console.log('res',res.id))});

module.exports = app => app.use('/projects', router);