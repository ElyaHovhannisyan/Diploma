const DataTypes = require("sequelize");
const { sequelize } = require("../dbConfig");
const { User } = require("./User");
const { Book } = require("./Book");

const Deliever = sequelize.define(
  "Delievers",
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
  },
  {
    createdAt: false,
    updatedAt: false,
    timestamps: false,
  }
);

User.hasMany(Deliever, { foreignKey: "UserId" });
Deliever.belongsTo(User);
Book.hasMany(Deliever, { foreignKey: "BookId" });
Deliever.belongsTo(Book);

module.exports = { Deliever };
