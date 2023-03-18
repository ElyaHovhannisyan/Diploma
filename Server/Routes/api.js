const { Router } = require("express");
const router = Router();

const authRoutes = require("./auth");
const bookRoutes = require("./book");
const cartRoutes = require("./cart");
const subjectRoutes = require("./subject");

router.use("/api", authRoutes);
router.use("/api", bookRoutes);
router.use("/api", cartRoutes);
router.use("/api", subjectRoutes);

module.exports = router;
