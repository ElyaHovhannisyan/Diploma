const { Cart } = require("../Models/Cart");
const { CartAssignment } = require("../Models/CartAssignment");
const { Book } = require("../Models/Book");
const { Subject } = require("../Models/Subject");
const { User } = require("../Models/User");
const { Student } = require("../Models/Students");
const { Lecturer } = require("../Models/Lecturer");
const { Worker } = require("../Models/Worker");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const addToCartService = async (UserId, reqBody) => {
  try {
    const { BookId } = reqBody;
    const cart = await Cart.findOne({
      where: { UserId },
    });
    const cartAssignment = await CartAssignment.findOne({
      where: {
        BookId,
        CartId: cart.id,
      },
    });
    if (cartAssignment) {
      return { cart: "Գիրքն արդեն պատվիրված է" };
    }
    const book = await Book.findByPk(BookId);

    if ((book.count = 0)) {
      return { cart: "Գիրքն այս պահին առկա չէ" };
    }

    const res = await CartAssignment.create({
      CartId: cart.id,
      BookId: BookId,
    });
    return { cart: res };
  } catch (error) {
    return { error };
  }
};

const getCartContent = async () => {
  try {
    const cart = await Cart.findOne({ where: { UserId: 1 } });
    const CartId = cart.id;

    const cartAssignments = await CartAssignment.findAll({
      where: {
        CartId,
      },
      include: {
        model: Book,
        attributes: ["id", "title", "number", "SubjectId"],
        include: {
          model: Subject,
          attributes: ["name"],
        },
      },
      attributes: ["CartId"],
    });
    return { cart: cartAssignments };
  } catch (error) {
    return { error };
  }
};

const deleteCartContent = async (UserId) => {
  try {
    const cart = await Cart.findOne({
      where: { UserId },
    });
    const deleteCartAssignment = await CartAssignment.destroy({
      where: { CartId: cart.id },
    });
    return { cart: deleteCartAssignment };
  } catch (error) {
    return { error };
  }
};

const getCarts = async () => {
  try {
    const cartAssignments = await CartAssignment.findAll({
      include: [
        {
          model: Book,
          attributes: ["id", "title", "number", "SubjectId"],
          include: {
            model: Subject,
            attributes: ["name"],
          },
        },
        {
          model: Cart,
          attributes: ["UserId"],
          include: {
            model: User,
            attributes: ["StudentId", "LecturerId", "WorkerId"],
            include: [
              {
                model: Student,
                attributes: ["name", "surname"],
              },
              {
                model: Lecturer,
                attributes: ["name", "surname"],
              },
              {
                model: Worker,
                attributes: ["name", "surname"],
              },
            ],
          },
        },
      ],
      attributes: ["CartId"],
    });
    return { cart: cartAssignments };
  } catch (error) {
    return { error };
  }
};
module.exports = {
  addToCartService,
  getCartContent,
  deleteCartContent,
  getCarts,
};
