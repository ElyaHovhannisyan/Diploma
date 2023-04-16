const { sequelize } = require("../dbConfig");
const { User } = require("./User");
const { Order } = require("./Order");
const { Cart } = require("./Cart");
const { Fine } = require("./Fine");
const { CartAssignment } = require("./CartAssignment");

sequelize.sync({ alter: false, force: false });

module.exports = {
  Order,
  Cart,
  CartAssignment,
  Fine,
};
