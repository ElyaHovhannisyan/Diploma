const { Router } = require("express");
const router = Router();

const auth_routes = require("./auth.routes");

router.use("/api", auth_routes);

module.exports = router;
