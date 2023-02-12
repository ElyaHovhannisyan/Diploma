const { User } = require("../Models/User");
const { Cart } = require("../Models/Cart");
const bcrypt = require("bcryptjs");
const express = require("express");

const app = express();
app.use(express.json());

const signup = async (req, res) => {
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    await Cart.create({ user_id: user.id });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
module.exports = {
  signup,
};
