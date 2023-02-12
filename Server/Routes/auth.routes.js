const express = require("express");
const router = express.Router();
const { verifySignUp } = require("./verify_sign_up");
const controller = require("../Controller/auth.controller.js");

router.post(
  "/sign_up",
  [verifySignUp.checkDuplicateUsernameOrEmail],
  controller.signup
);

module.exports = router;
