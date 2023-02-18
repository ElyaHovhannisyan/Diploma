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
    CartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Carts",
        key: "id",
      },
    },
    BookId: {
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

Cart.hasMany(Cart_Assignment, { foreignKey: "CartId" });
Cart_Assignment.belongsTo(Cart);
Book.hasMany(Cart_Assignment, { foreignKey: "BookId" });
Cart_Assignment.belongsTo(Book);

module.exports = { Cart_Assignment };
