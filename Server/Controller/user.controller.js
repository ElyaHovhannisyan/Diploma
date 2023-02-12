const { User } = require("../Models/User.js");

exports.userBoard = async (req, res) => {
  const user = await User.findByPk(req.user.id, {
    attributes: ["id", "username", "email", "Role"],
  });

  res.json(user);
};
