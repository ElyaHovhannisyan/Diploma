const { Book } = require("../Models/Book");
const { Subject } = require("../Models/Subject");
const { BookDetail } = require("../Models/BookDetail");
const { Author } = require("../Models/Author");
const { User } = require("../Models/User");
const { Op } = require("sequelize");
const { sequelize } = require("../dbConfig");
const { CartAssignment } = require("../Models/CartAssignment");
const { Order } = require("../Models/Order");
const { Cart } = require("../Models/Cart");
const { Student } = require("../Models/Students");
const { Lecturer } = require("../Models/Lecturer");
const { Fine } = require("../Models/Fine");

const getBooks = async (title, date, subjectName, authorName) => {
  try {
    const books = await Book.findAll({
      attributes: ["id", "title", "path", "count"],
      where: {
        ...(title && { title }),
        ...(date && { date }),
      },
      include: [
        {
          model: Subject,
          attributes: ["name"],
          where: {
            ...(subjectName && { name: subjectName }),
          },
        },
        {
          model: BookDetail,
          attributes: ["id"],
          include: {
            model: Author,
            attributes: ["name"],
            where: {
              ...(authorName && { name: authorName }),
            },
          },
        },
      ],
    });
    if (authorName) {
      filteredBooks = books.filter((book) =>
        book.BookDetails.some(
          (bookDetail) => bookDetail.Author.name === authorName
        )
      );
      if (filteredBooks.length === 0) return { message: "Գիրք չի գտնվել" };
      return { books: filteredBooks };
    }
    if (books.length === 0) return { message: "Գիրք չի գտնվել" };
    return { books };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const getCarts = async (username) => {
  try {
    const user = await User.findOne({
      attributes: ["id"],
      where: { username },
    });

    const cart = await Cart.findOne({
      attributes: ["id"],
      where: { UserId: user.id },
    });
    const carts = await CartAssignment.findAll({
      where: {
        CartId: cart.id,
      },
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
          model: Cart,
          attributes: ["UserId"],
          include: {
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
        },
      ],
      attributes: ["CartId"],
    });
    return { carts };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const getOrders = async (username) => {
  try {
    const user = await User.findOne({
      attributes: ["id"],
      where: { username },
    });
    const orders = await Order.findAll({
      where: {
        UserId: user.id,
      },
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
    return { orders };
  } catch (error) {
    console.log(error);
    return { error };
  }
};
const getFines = async (username) => {
  try {
    const user = await User.findOne({
      attributes: ["id"],
      where: { username },
    });
    const fines = await Fine.findAll({
      include: {
        model: Order,
        where: {
          UserId: user.id,
        },
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
      },
    });
    return { fines };
  } catch (error) {
    console.log(error);
    return { error };
  }
};
module.exports = {
  getBooks,
  getCarts,
  getOrders,
  getFines,
};
