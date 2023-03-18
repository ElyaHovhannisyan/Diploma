const DataTypes = require("sequelize");
const { sequelize } = require("../dbConfig");
const { User } = require("./User");
const { Book } = require("./Book");

const Order = sequelize.define(
  "Order",
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
    BookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Books",
        key: "id",
      },
    },
    bookNumber: {
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

User.hasMany(Order, { foreignKey: "UserId" });
Order.belongsTo(User);
Book.hasMany(Order, { foreignKey: "BookId" });
Order.belongsTo(Book);

module.exports = { Order };
