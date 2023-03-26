const express = require("express");
const router = express.Router();
const { authJwt } = require("../Middleware/authJWT");
const {
  getBookDetails,
  updateBookCount,
  getBooksBySubjectId,
} = require("../Controller/book");

router.get("/books/:id", [authJwt.verifyToken], getBookDetails);
router.put("/books/:id", [authJwt.verifyToken], updateBookCount);
router.get("/books/subject/:id", [authJwt.verifyToken], getBooksBySubjectId);
module.exports = router;
