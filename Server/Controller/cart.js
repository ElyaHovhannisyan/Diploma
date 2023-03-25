const {
  addToCartService,
  getCartContent,
  deleteCartContent,
  getCarts,
} = require("../Service/cart");

const addToCart = async (req, res) => {
  const UserId = req.user.id;
  const BookId = req.params["bookId"];
  const { error, cart, message } = await addToCartService(UserId, BookId);

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
  res.status(200).json(cart);
};

const getCart = async (req, res) => {
  const UserId = req.user.id;
  const cartContent = await getCartContent(UserId);
  res.status(200).json(cartContent);
};

const deleteCart = async (req, res) => {
  const UserId = req.params["userId"];
  const bookId = req.params["bookId"];
  const { error, cart } = await deleteCartContent(UserId, bookId);
  if (error) {
    res.status(400).json({ error: "Error occurred while deleting cart." });
  }
  res.status(204).json(cart);
};

const getAllCart = async (req, res) => {
  const { error, cart } = await getCarts();
  if (error) {
    res.status(400).json({ error });
  }
  res.status(200).json(cart);
};
module.exports = {
  addToCart,
  getCart,
  deleteCart,
  getAllCart,
};
