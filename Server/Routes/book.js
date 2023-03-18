const express = require("express");
const router = express.Router();
const { authJwt } = require("../Middleware/authJWT");
const {
  getBookDetails,
  updateBookCount,
  getStudentBooks,
  getLecturerBooks,
} = require("../Controller/book");

router.get("/books/:id", [authJwt.verifyToken], getBookDetails);
router.put("/books/:id", [authJwt.verifyToken], updateBookCount);
router.get("/books/semester/:semester", [authJwt.verifyToken], getStudentBooks);
router.get("/books/subject/:id", [authJwt.verifyToken], getLecturerBooks);
module.exports = router;
