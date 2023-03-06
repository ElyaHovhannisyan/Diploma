const express = require("express");
const router = express.Router();
const { getBook, postBook } = require("../Controller/book");
router.get("/books/:id", (req, res) => {
  const { id } = req.params;
  getBook(res, id);
});
router.post("/books", (req, res) => {
  postBook(req, res);
});
module.exports = router;
