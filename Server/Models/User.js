const DataTypes = require("sequelize");
const { sequelize } = require("../dbConfig");

const User = sequelize.define(
  "Users",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // role: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
  },
  {
    createdAt: false,
    updatedAt: false,
    timestamps: false,
  }
);

module.exports = { User };
