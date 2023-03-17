const {
  addToCartService,
  getCartContent,
  deleteCartContent,
  getCarts,
} = require("../Service/cart");

const addToCart = async (req, res) => {
  const UserId = req.user.id;
  const reqBody = req.body;
  const { error, cart } = await addToCartService(UserId, reqBody);

  if (error) {
    console.error(error);
    res.status(400).json({
      error: {
        message: "Error occurred while creating cart.",
      },
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
  const UserId = req.user.id;
  const bookId = req.params["bookId"];
  const { error, cart } = await deleteCartContent(UserId, bookId);
  if (error) {
    res.status(400).json({ error: "Error occurred while deleting cart." });
  }
  res.status(204).json(cart);
};

const getAllCart = async (req, res) => {
  const carts = await getCarts();
  res.status(200).json(carts);
};
module.exports = {
  addToCart,
  getCart,
  deleteCart,
  getAllCart,
};
