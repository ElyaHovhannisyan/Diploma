const {
  addToDelieverService,
  getDelieverContent,
  deleteDelieverContent,
  getDelievers,
} = require("../Service/deliever");

const addToDeliever = async (req, res) => {
  const BookId = req.params["bookId"];
  const UserId = req.body.UserId;
  console.log(BookId, UserId);
  const { error, deliever } = await addToDelieverService(UserId, BookId);

  if (error) {
    res.status(400).json({
      error: error,
    });
  }
  res.status(200).json(deliever);
};

const getDeliever = async (req, res) => {
  const UserId = req.user.id;
  const { error, deliever } = await getDelieverContent(UserId);
  if (error) {
    res.status(400).json({
      error: error,
    });
  }
  res.status(200).json(deliever);
};

const deleteDeliever = async (req, res) => {
  const UserId = req.params["userId"];
  const bookId = req.params["bookId"];
  const { error, deliever } = await deleteDelieverContent(UserId, bookId);
  if (error) {
    res.status(400).json({ error: "Error occurred while deleting cart." });
  }
  res.status(204).json(deliever);
};

const getAllDeliever = async (req, res) => {
  const { error, deliever } = await getDelievers();
  if (error) {
    res.status(400).json({ error });
  }
  res.status(200).json(deliever);
};
module.exports = {
  addToDeliever,
  getDeliever,
  deleteDeliever,
  getAllDeliever,
};
