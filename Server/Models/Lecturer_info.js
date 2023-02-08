const DataTypes = require("sequelize");
const { sequelize } = require("../dbConfig");
const { Subject } = require("./Subject");
const { Lecturer } = require("./Lecturer");

const Lecturer_info = sequelize.define("Lecturer_infos", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  lect_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Lecturers",
      key: "id",
    },
  },
  sub_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Subjects",
      key: "id",
    },
  },
});

Lecturer.hasMany(Lecturer_info, { foreignKey: "lect_id" });
Lecturer_info.belongsTo(Lecturer);
Subject.hasMany(Lecturer_info, { foreignKey: "sub_id" });
Lecturer_info.belongsTo(Subject);

module.exports = { Lecturer_info };
