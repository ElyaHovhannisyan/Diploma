const { getFineContent, getFines } = require("../Service/fine");

const getFine = async (req, res) => {
  const UserId = req.user.id;
  const { error, fine } = await getFineContent(UserId);
  if (error) {
    res.status(400).json({
      error: error.message,
    });
  }
  res.status(200).json(fine);
};

const getAllFine = async (req, res) => {
  const { error, fine } = await getFines();
  if (error) {
    res.status(400).json({ error });
  }
  res.status(200).json(fine);
};
module.exports = {
  getFine,
  getAllFine,
};
