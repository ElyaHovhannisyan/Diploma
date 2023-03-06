const express = require("express");
const router = express.Router();
const { verifyRegister } = require("../Validation/verify");
const controller = require("../Controller/auth.js");

router.post(
  "/register",
  [verifyRegister.checkDuplicateUsernameOrEmail],
  controller.register
);
router.post("/login", controller.signin);
router.post("/signout", controller.signout);
module.exports = router;
