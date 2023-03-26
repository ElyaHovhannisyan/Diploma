const express = require("express");
const router = express.Router();
const { authJwt } = require("../Middleware/authJWT");
const {
  getSubjectsName,
  getAllSubject,
  getSemesterSubjectsByGroup,
  getSemesterSubjects,
} = require("../Controller/subject");

router.get("/subjects", [authJwt.verifyToken], getSubjectsName);
router.get("/allSubjects", [authJwt.verifyToken], getAllSubject);
router.get(
  "/currentSemesterSubjects",
  [authJwt.verifyToken],
  getSemesterSubjectsByGroup
);
router.get("/subjects/:semester", [authJwt.verifyToken], getSemesterSubjects);
module.exports = router;
