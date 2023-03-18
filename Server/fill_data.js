const fs = require("fs");
const { sequelize } = require("./dbConfig");
const { Subject } = require("./Models/Subject");
const { Book } = require("./Models/Book");
const { Student } = require("./Models/Students");
const { Lecturer } = require("./Models/Lecturer");
const { LecturerInfo } = require("./Models/LecturerInfo");
const { Lesson } = require("./Models/Lesson");
const { Author } = require("./Models/Author");
const { BookDetail } = require("./Models/BookDetail");
const { Worker } = require("./Models/Worker");

const subjects = [];
const lecturers = [];
const students = [];
const workers = [];
const authors = [];
const books = [];
const bookDetails = [];
const lecturerInfo = [];
const lessons = [];

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
data = fs.readFileSync("./scripts/workers.csv", "utf8");
lines = data.split("\n");

for (let i = 1; i < lines.length; i++) {
  const fields = lines[i].split(", ");
  workers.push({
    name: fields[0],
    surname: fields[1],
    email: fields[2],
  });
}
data = fs.readFileSync("./scripts/authors.csv", "utf8");
lines = data.split("\n");

for (let i = 1; i < lines.length; i++) {
  const fields = lines[i].split(", ");
  authors.push({
    name: fields[0],
  });
}
data = fs.readFileSync("./scripts/books.csv", "utf8");
lines = data.split("\n");

for (let i = 1; i < lines.length; i++) {
  const fields = lines[i].split(", ");
  books.push({
    title: fields[0],
    SubjectId: fields[1],
    date: fields[2],
    publisher: fields[3],
    city: fields[4],
    pageCount: fields[5],
    count: fields[6],
    path: fields[7],
  });
}
data = fs.readFileSync("./scripts/bookDetails.csv", "utf8");
lines = data.split("\n");

for (let i = 1; i < lines.length; i++) {
  const fields = lines[i].split(", ");
  bookDetails.push({
    AuthorId: fields[0],
    BookId: fields[1],
  });
}
data = fs.readFileSync("./scripts/lessons.csv", "utf8");
lines = data.split("\n");

for (let i = 1; i < lines.length; i++) {
  const fields = lines[i].split(", ");
  lessons.push({
    SubjectId: fields[0],
    g: fields[1],
    semester: fields[2],
  });
}
data = fs.readFileSync("./scripts/lecturerInfos.csv", "utf8");
lines = data.split("\n");

for (let i = 1; i < lines.length; i++) {
  const fields = lines[i].split(", ");
  lecturerInfo.push({
    LecturerId: fields[0],
    SubjectId: fields[1],
  });
}
sequelize.sync({ alter: false, force: false }).then(() => {
  Subject.bulkCreate(subjects)
    .then(() => {
      console.log("Subject data uploaded successfully");
      Lesson.bulkCreate(lessons)
        .then(() => console.log("Lesson data uploaded successfully"))
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
  Student.bulkCreate(students)
    .then(() => console.log("Student data uploaded successfully"))
    .catch((err) => console.error(err));
  Lecturer.bulkCreate(lecturers)
    .then(() => {
      console.log("Lecturer data uploaded successfully");
      LecturerInfo.bulkCreate(lecturerInfo)
        .then(() => console.log("LecturerInfo data uploaded successfully"))
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
  Worker.bulkCreate(workers)
    .then(() => console.log("Worker data uploaded successfully"))
    .catch((err) => console.error(err));
  Author.bulkCreate(authors)
    .then(() => console.log("Author data uploaded successfully"))
    .catch((err) => console.error(err));
  Book.bulkCreate(books)
    .then(() => {
      console.log("Book data uploaded successfully");
      BookDetail.bulkCreate(bookDetails)
        .then(() => console.log("BookDetails data uploaded successfully"))
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
});

module.exports = {
  Subject,
  Book,
  Student,
  Lecturer,
  LecturerInfo,
  Lesson,
  BookDetail,
  Author,
  Worker,
};
