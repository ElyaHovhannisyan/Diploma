const DataTypes = require("sequelize");
const { sequelize } = require("../dbConfig");
const { Student } = require("./Students");
const { Lecturer } = require("./Lecturer");
const { Worker } = require("./Worker");

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
    WorkerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Workers",
        key: "id",
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      indexes: [
        {
          unique: true,
          fields: ["username"],
        },
      ],
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      indexes: [
        {
          unique: true,
          fields: ["email"],
        },
      ],
    },
    password: {
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
Student.hasOne(User, { foreignKey: "StudentId" });
User.belongsTo(Student);
Lecturer.hasOne(User, { foreignKey: "LecturerId" });
User.belongsTo(Lecturer);
Worker.hasOne(User, { foreignKey: "WorkerId" });
User.belongsTo(Worker);
module.exports = { User };
