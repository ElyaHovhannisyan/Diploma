const { Lecturer } = require("../Models/Lecturer");
const { Student } = require("../Models/Students");
const { User } = require("../Models/User");

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    let user = await Student.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (user) {
      b = { StudentId: user.id, role: "student" };
      req.body = { ...req.body, ...b };
    } else {
      user = await Lecturer.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (user) {
        b = { LecturerId: user.id, role: "lecturer" };
        req.body = { ...req.body, ...b };
      } else {
        return res.status(400).send({
          message: "Անվավեր էլ․ հասցե",
        });
      }
    }
    user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (user) {
      return res.status(400).send({
        message: "Ձախողում! Օգտանունն արդեն գոյություն ունի!",
      });
    }
    user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (user) {
      return res.status(400).send({
        message: "Ձախողում! էլ․ հասցեն արդեն գոյություն ունի!",
      });
    }
    next();
  } catch (error) {
    return res.status(400).send({
      message: "Bad Request",
    });
  }
};

const verifyRegister = {
  checkDuplicateUsernameOrEmail,
};

module.exports = { verifyRegister };
