const { Router } = require("express");
const router = Router();

const authRoutes = require("./auth");
const bookRoutes = require("./book");
const cartRoutes = require("./cart");
const subjectRoutes = require("./subject");
const orderRoutes = require("./order");

router.use("/api", authRoutes);
router.use("/api", bookRoutes);
router.use("/api", cartRoutes);
router.use("/api", subjectRoutes);
router.use("/api", orderRoutes);

module.exports = router;
