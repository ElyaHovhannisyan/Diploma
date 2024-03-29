const express = require("express");
const router = express.Router();
const { authJwt } = require("../Middleware/authJWT");
const {
  searchBook,
  searchCart,
  searchOrder,
  searchFine,
} = require("../Controller/search");

router.post("/search/book", [authJwt.verifyToken], searchBook);
router.post("/search/cart", [authJwt.verifyToken], searchCart);
router.post("/search/order", [authJwt.verifyToken], searchOrder);
router.post("/search/fine", [authJwt.verifyToken], searchFine);

module.exports = router;
