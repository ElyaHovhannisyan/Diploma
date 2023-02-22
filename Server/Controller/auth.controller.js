const { User } = require("../Models/User");
const { Cart } = require("../Models/Cart");
const bcrypt = require("bcryptjs");
const express = require("express");

const app = express();
app.use(express.json());

const register = async (req, res) => {
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      StudentId: req.body.StudentId,
      LecturerId: req.body.LecturerId,
      role: req.body.role,
    });
    await Cart.create({ UserId: user.id });
    res.status(200).send("everything is ok");
  } catch (error) {
    console.log("nnnnnnn\n");
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};
module.exports = {
  register,
};
