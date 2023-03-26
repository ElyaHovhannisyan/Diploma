const express = require("express");
const router = express.Router();
const {
  addToDeliever,
  getDeliever,
  deleteDeliever,
  getAllDeliever,
} = require("../Controller/deliever");
const { authJwt } = require("../Middleware/authJWT");

router.post("/deliever/:bookId", [authJwt.verifyToken], addToDeliever);
router.get("/deliever", [authJwt.verifyToken], getDeliever);
router.delete(
  "/deliever/:bookId/:userId",
  [authJwt.verifyToken],
  deleteDeliever
);
router.get("/delievers", [authJwt.verifyToken], getAllDeliever);

module.exports = router;
