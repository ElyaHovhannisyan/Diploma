const express = require("express");
const router = express.Router();
const { authJwt } = require("../Middleware/authJWT");
const { getSubjectsName } = require("../Controller/subject");

router.get("/subjects", [authJwt.verifyToken], getSubjectsName);
module.exports = router;
