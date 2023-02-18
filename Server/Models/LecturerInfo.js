const DataTypes = require("sequelize");
const { sequelize } = require("../dbConfig");
const { Subject } = require("./Subject");
const { Lecturer } = require("./Lecturer");

const LecturerInfo = sequelize.define(
  "LecturerInfos",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    LecturerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Lecturers",
        key: "id",
      },
    },
    SubjectId: {
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

Lecturer.hasMany(LecturerInfo, { foreignKey: "LecturerId" });
LecturerInfo.belongsTo(Lecturer);
Subject.hasMany(LecturerInfo, { foreignKey: "SubjectId" });
LecturerInfo.belongsTo(Subject);

module.exports = { LecturerInfo };
