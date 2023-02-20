const express = require("express");
const router = express.Router();
const { verifyRegister } = require("./verify");
const controller = require("../Controller/auth.controller.js");

router.post(
  "/register",
  [verifyRegister.checkDuplicateUsernameOrEmail],
  controller.register
);

module.exports = router;
