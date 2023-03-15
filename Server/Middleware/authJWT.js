const jwt = require("jsonwebtoken");
const config = require("../authConfig.js");

verifyToken = (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    req.role = decoded.role;
    req.user = decoded;
    next();
  });
};

const authJwt = {
  verifyToken,
};
module.exports = { authJwt };
