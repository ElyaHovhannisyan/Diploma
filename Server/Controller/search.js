const {
  getBooks,
  getCarts,
  getOrders,
  getFines,
} = require("../Service/search");

const searchBook = async (req, res) => {
  title = req.body.title;
  date = req.body.date;
  subjectName = req.body.subjectName;
  authorName = req.body.authorName;
  const { error, books, message } = await getBooks(
    title,
    date,
    subjectName,
    authorName
  );
  if (error) {
    res.status(400).json({
      error: error,
    });
  }
  if (message) {
    res.status(200).json({
      message,
    });
  }
  res.status(200).json(books);
};

const searchCart = async (req, res) => {
  username = req.body.username;

  const { error, carts, message } = await getCarts(username);
  if (error) {
    res.status(400).json({
      error: error,
    });
  }
  if (message) {
    res.status(200).json({
      message,
    });
  }
  res.status(200).json(carts);
};

const searchOrder = async (req, res) => {
  username = req.body.username;
  const { error, orders, message } = await getOrders(username);
  if (error) {
    res.status(400).json({
      error: error,
    });
  }
  if (message) {
    res.status(200).json({
      message,
    });
  }
  res.status(200).json(orders);
};

const searchFine = async (req, res) => {
  username = req.body.username;
  const { error, fines, message } = await getFines(username);
  if (error) {
    res.status(400).json({
      error: error,
    });
  }
  if (message) {
    res.status(200).json({
      message,
    });
  }
  res.status(200).json(fines);
};

module.exports = {
  searchBook,
  searchCart,
  searchOrder,
  searchFine,
};
