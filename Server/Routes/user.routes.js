const controller = require("../Controller/user.controller.js");

const express = require("express");
const router = express.Router();

router.get("/sign_up", controller.userBoard);

module.exports = router;
