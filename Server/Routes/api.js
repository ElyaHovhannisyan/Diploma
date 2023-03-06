const { Router } = require("express");
const router = Router();

const authRoutes = require("./auth");
const bookRoutes = require("./book");

router.use("/api", authRoutes);
router.use("/api", bookRoutes);

module.exports = router;
