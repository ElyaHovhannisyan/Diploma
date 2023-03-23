const express = require("express");
const router = express.Router();
const { authJwt } = require("../Middleware/authJWT");
const { getSubjectsName, getAllSubject } = require("../Controller/subject");

router.get("/subjects", [authJwt.verifyToken], getSubjectsName);
router.get("/allSubjects", [authJwt.verifyToken], getAllSubject);
module.exports = router;
