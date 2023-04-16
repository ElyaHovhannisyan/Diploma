const express = require("express");
const router = express.Router();
const { getFine, getAllFine } = require("../Controller/fine");
const { authJwt } = require("../Middleware/authJWT");

router.get("/fine", [authJwt.verifyToken], getFine);
router.get("/fines", [authJwt.verifyToken], getAllFine);

module.exports = router;
