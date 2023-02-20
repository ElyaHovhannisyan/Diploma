const fs = require("fs");
const { sequelize } = require("./dbConfig");
const { User } = require("./Models/User");
const { Subject } = require("./Models/Subject");
const { Book } = require("./Models/Book");
const { Student } = require("./Models/Students");
const { Lecturer } = require("./Models/Lecturer");
const { LecturerInfo } = require("./Models/LecturerInfo");
const { Lesson } = require("./Models/Lesson");

const subjects = [];
const lecturers = [];
const students = [];

let data = fs.readFileSync("./scripts/subjects.csv", "utf8");
let lines = data.split("\n");

for (let i = 1; i < lines.length; i++) {
  const fields = lines[i].split(",");
  subjects.push({
    name: fields[0],
  });
}
data = fs.readFileSync("./scripts/students.csv", "utf8");
lines = data.split("\n");

for (let i = 1; i < lines.length; i++) {
  const fields = lines[i].split(", ");
  students.push({
    name: fields[0],
    surname: fields[1],
    group: fields[2],
    email: fields[3],
  });
}
data = fs.readFileSync("./scripts/lecturers.csv", "utf8");
lines = data.split("\n");

for (let i = 1; i < lines.length; i++) {
  const fields = lines[i].split(", ");
  lecturers.push({
    name: fields[0],
    surname: fields[1],
    email: fields[2],
  });
}
sequelize.sync({ alter: false, force: false }).then(() => {
  Subject.bulkCreate(subjects)
    .then(() => console.log("Data uploaded successfully"))
    .catch((err) => console.error(err));
  Student.bulkCreate(students)
    .then(() => console.log("Data uploaded successfully"))
    .catch((err) => console.error(err));
  Lecturer.bulkCreate(lecturers)
    .then(() => console.log("Data uploaded successfully"))
    .catch((err) => console.error(err));
});

module.exports = {
  User,
  Subject,
  Book,
  Student,
  Lecturer,
  LecturerInfo,
  Lesson,
};
