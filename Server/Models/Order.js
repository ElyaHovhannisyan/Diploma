const DataTypes = require("sequelize");
const { sequelize } = require("../dbConfig");
const { User } = require("./User");

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    book_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    timestamps: false,
  }
);

User.hasMany(Order, { foreignKey: "user_id" });
Order.belongsTo(User);

module.exports = { Order };
