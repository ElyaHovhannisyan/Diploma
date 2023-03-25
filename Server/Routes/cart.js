const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCart,
  deleteCart,
  getAllCart,
} = require("../Controller/cart");
const { authJwt } = require("../Middleware/authJWT");

router.post("/cart/:bookId", [authJwt.verifyToken], addToCart);
router.get("/cart", [authJwt.verifyToken], getCart);
router.delete("/cart/:bookId/:userId", [authJwt.verifyToken], deleteCart);
router.get("/carts", [authJwt.verifyToken], getAllCart);

module.exports = router;
