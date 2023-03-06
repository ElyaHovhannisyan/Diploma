const { takeBook, createBook } = require("../Service/book");
const getBook = async (res, id) => {
  const { error, book } = await takeBook(id);
  if (error) res.status(406).send("Can't get a book");
  res.status(200).send(book);
};
const postBook = async (req, res) => {
  const { error, message } = await createBook(req);
  if (error) res.status(406).send("Can't create books");
  res.status(200).send(message);
};
module.exports = { getBook, postBook };
