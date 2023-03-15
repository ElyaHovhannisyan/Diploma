const { User } = require("../Models/User");
const { Cart } = require("../Models/Cart");
const config = require("../authConfig");
const jwt = require("jsonwebtoken");
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
      WorkerId: req.body.WorkerId,
    });
    await Cart.create({ UserId: user.id });
    if (user.StudentId) role = "student";
    else if (user.LecturerId) role = "lecturer";
    else role = "worker";
    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: "30d",
    });

    res.status(200).json({
      token,
      UserId: user.id,
      role: role,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "Սխալ մուտքանուն կամ գաղտնաբառ" });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Սխալ մուտքանուն կամ գաղտնաբառ",
      });
    }
    if (user.StudentId) role = "student";
    else if (user.LecturerId) role = "lecturer";
    else role = "worker";
    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: "30d",
    });

    res.status(200).json({
      token,
      UserId: user.id,
      role: role,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
const signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out!",
    });
  } catch (err) {
    this.next(err);
  }
};
module.exports = {
  register,
  signin,
  signout,
};
