const DataTypes = require("sequelize");
const { sequelize } = require("../dbConfig");
const { Cart } = require("./Cart");
const { Book } = require("./Book");

const Cart_Assignment = sequelize.define(
  "Cart_Assignments",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    cart_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Carts",
        key: "id",
      },
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Books",
        key: "id",
      },
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    timestamps: false,
  }
);

Cart.hasMany(Cart_Assignment, { foreignKey: "cart_id" });
Cart_Assignment.belongsTo(Cart);
Book.hasMany(Cart_Assignment, { foreignKey: "book_id" });
Cart_Assignment.belongsTo(Book);

module.exports = { Cart_Assignment };
