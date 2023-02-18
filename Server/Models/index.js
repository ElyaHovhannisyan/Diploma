const { sequelize } = require("../dbConfig");
const { User } = require("./User");
const { Order } = require("./Order");
const { Cart } = require("./Cart");
const { Cart_Assignment } = require("./CartAssignment");

sequelize.sync({ alter: false, force: false });

module.exports = {
  Order,
  Cart,
  Cart_Assignment,
};
