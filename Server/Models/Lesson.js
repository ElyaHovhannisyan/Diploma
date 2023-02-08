const DataTypes = require("sequelize");
const { sequelize } = require("../dbConfig");
const { Subject } = require("./Subject");

const Lesson = sequelize.define("Lessons", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  sub_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Subjects",
      key: "id",
    },
  },
  class: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  semester: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
Subject.hasMany(Lesson, { foreignKey: "sub_id" });
Lesson.belongsTo(Subject);
module.exports = { Lesson };
