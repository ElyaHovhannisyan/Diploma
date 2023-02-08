const DataTypes = require("sequelize");
const { sequelize } = require("../dbConfig");
const { Subject } = require("./Subject");

const Book = sequelize.define(
  "Books",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author_surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sub_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Subjects",
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

Subject.hasMany(Book, { foreignKey: "sub_id" });
Book.belongsTo(Subject);

module.exports = { Book };
