const {
  takeBook,
  updateBook,
  getStudentsBooks,
  getLecturersBooks,
} = require("../Service/book");

const getBookDetails = async (req, res) => {
  const id = req.params["id"];
  const { error, book } = await takeBook(id);
  if (error) res.status(406).send("Can't get a book");
  res.status(200).send(book);
};

const updateBookCount = async (req, res) => {
  const id = req.params["id"];
  const { error, book } = await updateBook(id);
  if (error) res.status(406).send("Can't update a book");
  res.status(200).send(book);
};

const getStudentBooks = async (req, res) => {
  const StudentId = req.StudentId;
  const semester = req.params["semester"];
  const { error, books } = await getStudentsBooks(StudentId, semester);
  if (error) res.status(406).send("Can't get a book");
  console.log(books);
  res.status(200).send(books);
};
const getLecturerBooks = async (req, res) => {
  const SubjectId = req.params["id"];
  const { error, books } = await getLecturersBooks(SubjectId);
  if (error) res.status(406).send("Can't get a book");
  res.status(200).send(books);
};
module.exports = {
  getBookDetails,
  updateBookCount,
  getStudentBooks,
  getLecturerBooks,
};
