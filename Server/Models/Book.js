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
      indexes: [
        {
          unique: true,
          fields: ["title"],
        },
      ],
    },
    SubjectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Subjects",
        key: "id",
      },
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
      indexes: [
        {
          unique: true,
          fields: ["date"],
        },
      ],
    },
    publisher: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pageCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    timestamps: false,
  }
);

Subject.hasMany(Book, { foreignKey: "SubjectId" });
Book.belongsTo(Subject);

module.exports = { Book };
