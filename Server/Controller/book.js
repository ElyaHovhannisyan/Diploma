const { takeBook, updateBook, getBooksBySubject } = require("../Service/book");

const getBookDetails = async (req, res) => {
  const id = req.params["id"];
  const { error, book } = await takeBook(id);
  if (error) res.status(406).send("Can't get a book");
  res.status(200).send(book);
};

const updateBookCount = async (req, res) => {
  const id = req.params["id"];
  const state = req.body.state;
  const { error, book } = await updateBook(id, state);
  if (error) res.status(406).send("Can't update a book");
  res.status(200).send(book);
};

const getBooksBySubjectId = async (req, res) => {
  const SubjectId = req.params["id"];
  const { error, books } = await getBooksBySubject(SubjectId);
  if (error) res.status(406).send("Can't get a book");
  res.status(200).send(books);
};
module.exports = {
  getBookDetails,
  updateBookCount,
  getBooksBySubjectId,
};
