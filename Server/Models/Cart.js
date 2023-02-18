const DataTypes = require("sequelize");
const { User } = require("./User");
const { sequelize } = require("../dbConfig");

const Cart = sequelize.define(
  "Carts",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
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

User.hasOne(Cart, { foreignKey: "UserId" });
Cart.belongsTo(User);

module.exports = { Cart };
