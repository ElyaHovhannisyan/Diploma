const { Order } = require("../Models/Order");
const { Book } = require("../Models/Book");
const { Subject } = require("../Models/Subject");
const { User } = require("../Models/User");
const { Student } = require("../Models/Students");
const { Lecturer } = require("../Models/Lecturer");

const addToOrderService = async (UserId, BookId, bookNumber) => {
  try {
    const order = await Order.create({
      UserId,
      BookId,
      bookNumber,
    });
    return { order };
  } catch (error) {
    return { error };
  }
};
const getOrderContent = async (UserId) => {
  try {
    const order = await Order.findAll({
      where: {
        UserId,
      },
      include: {
        model: Book,
        attributes: ["id", "title", "SubjectId"],
        include: {
          model: Subject,
          attributes: ["name"],
        },
      },
      attributes: ["id"],
    });
    return { order };
  } catch (error) {
    return { error };
  }
};
const deleteOrderContent = async (UserId, bookId) => {
  try {
    const order = await Order.destroy({
      where: { UserId, BookId: bookId },
    });
    return { order };
  } catch (error) {
    return { error };
  }
};
const getOrders = async () => {
  try {
    const order = await Order.findAll({
      include: [
        {
          model: Book,
          attributes: ["id", "title", "SubjectId"],
          include: {
            model: Subject,
            attributes: ["name"],
          },
        },
        {
          model: User,
          attributes: ["StudentId", "LecturerId"],
          include: [
            {
              model: Student,
              attributes: ["name", "surname"],
            },
            {
              model: Lecturer,
              attributes: ["name", "surname"],
            },
          ],
        },
      ],
      attributes: ["bookNumber", "UserId"],
    });
    return { order };
  } catch (error) {
    return { error };
  }
};
module.exports = {
  addToOrderService,
  getOrderContent,
  deleteOrderContent,
  getOrders,
};
