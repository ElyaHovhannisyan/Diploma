const DataTypes = require("sequelize");
const { sequelize } = require("../dbConfig");
const { Student } = require("./Students");
const { Lecturer } = require("./Lecturer");

const User = sequelize.define(
  "Users",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    StudentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Students",
        key: "id",
      },
    },
    LecturerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Lecturers",
        key: "id",
      },
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

    role: {
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
Student.hasOne(User, { foreignKey: "StudentId" });
User.belongsTo(Student);
Lecturer.hasOne(User, { foreignKey: "LecturerId" });
User.belongsTo(Lecturer);
module.exports = { User };
