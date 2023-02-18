const DataTypes = require("sequelize");
const { sequelize } = require("../dbConfig");

const Subject = sequelize.define(
  "Subjects",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    timestamps: false,
  }
);

module.exports = { Subject };
