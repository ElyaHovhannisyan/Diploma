const { sequelize } = require("../dbConfig");
const { User } = require("./User");
const { Order } = require("./Order");
const { Cart } = require("./Cart");
const { Cart_Assignment } = require("./Cart_Assignment");
const { Book } = require("./Book");
const { Subject } = require("./Subject");
const { Lecturer } = require("./Lecturer");
const { Lecturer_info } = require("./Lecturer_info");
const { Lesson } = require("./Lesson");

sequelize.sync({ alter: false, force: false });

module.exports = {
  User,
  Order,
  Cart,
  Cart_Assignment,
  Book,
  Subject,
  Lecturer,
  Lecturer_info,
  Lesson,
};
