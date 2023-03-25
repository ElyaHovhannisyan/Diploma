const {
  addToOrderService,
  getOrderContent,
  deleteOrderContent,
  getOrders,
} = require("../Service/order");

const addToOrder = async (req, res) => {
  const BookId = req.params["bookId"];
  const bookNumber = req.body.bookNumber;
  const UserId = req.body.UserId;
  const { error, order } = await addToOrderService(UserId, BookId, bookNumber);

  if (error) {
    res.status(400).json({
      error: error,
    });
  }
  res.status(200).json(order);
};

const getOrder = async (req, res) => {
  const UserId = req.user.id;
  const { error, order } = await getOrderContent(UserId);
  if (error) {
    res.status(400).json({
      error: error,
    });
  }
  res.status(200).json(order);
};

const deleteOrder = async (req, res) => {
  const UserId = req.params["userId"];
  const bookId = req.params["bookId"];
  const { error, order } = await deleteOrderContent(UserId, bookId);
  if (error) {
    res.status(400).json({ error: "Error occurred while deleting cart." });
  }
  res.status(204).json(order);
};

const getAllOrder = async (req, res) => {
  const { error, order } = await getOrders();
  if (error) {
    res.status(400).json({ error });
  }
  res.status(200).json(order);
};
module.exports = {
  addToOrder,
  getOrder,
  deleteOrder,
  getAllOrder,
};
