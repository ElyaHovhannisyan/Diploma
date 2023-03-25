const DataTypes = require("sequelize");
const { sequelize } = require("../dbConfig");
const { Cart } = require("./Cart");
const { Book } = require("./Book");

const CartAssignment = sequelize.define(
  "CartAssignments",
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
    createdAt: true,
    updatedAt: false,
    timestamps: false,
  }
);

Cart.hasMany(CartAssignment, { foreignKey: "CartId" });
CartAssignment.belongsTo(Cart);
Book.hasMany(CartAssignment, { foreignKey: "BookId" });
CartAssignment.belongsTo(Book);

module.exports = { CartAssignment };
