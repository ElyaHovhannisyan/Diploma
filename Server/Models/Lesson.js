const DataTypes = require("sequelize");
const { sequelize } = require("../dbConfig");
const { Subject } = require("./Subject");

const Lesson = sequelize.define(
  "Lessons",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    SubjectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Subjects",
        key: "id",
      },
    },
    g: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    semester: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    timestamps: false,
  }
);
Subject.hasMany(Lesson, { foreignKey: "SubjectId" });
Lesson.belongsTo(Subject);
module.exports = { Lesson };
