const express = require("express");
const router = express.Router();
const {
  addToOrder,
  getOrder,
  deleteOrder,
  getAllOrder,
} = require("../Controller/order");
const { authJwt } = require("../Middleware/authJWT");

router.post("/order/:bookId", [authJwt.verifyToken], addToOrder);
router.get("/order", [authJwt.verifyToken], getOrder);
router.delete("/order/:bookId/:userId", [authJwt.verifyToken], deleteOrder);
router.get("/orders", [authJwt.verifyToken], getAllOrder);

module.exports = router;
