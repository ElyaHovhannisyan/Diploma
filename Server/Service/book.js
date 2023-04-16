const { Book } = require("../Models/Book");
const { Subject } = require("../Models/Subject");
const { BookDetail } = require("../Models/BookDetail");
const { Author } = require("../Models/Author");
const { Student } = require("../Models/Students");
const { Lesson } = require("../Models/Lesson");

async function takeBook(id) {
  try {
    const book = await Book.findByPk(id, {
      include: [
        {
          model: Subject,
          attributes: ["name"],
        },
        {
          model: BookDetail,
          attributes: ["id"],
          include: {
            model: Author,
            attributes: ["name"],
          },
        },
      ],
    });

    if (!book) throw new Error("unknown book id");

    return { book };
  } catch (error) {
    return { error };
  }
}
async function updateBook(id, state) {
  try {
    const b = await Book.findByPk(id);
    let count = b.count;
    if (state === "+") count = count + 1;
    else if (state === "-") count = count - 1;
    const book = await Book.update(
      { count },
      {
        where: { id },
      }
    );

    return { book };
  } catch (error) {
    return { error };
  }
}

async function getBooksBySubject(SubjectId) {
  try {
    const books = await Book.findAll({
      attributes: ["id", "title", "path", "count"],
      where: { SubjectId },
      include: [
        {
          model: Subject,
          attributes: ["name"],
        },
        {
          model: BookDetail,
          attributes: ["id"],
          include: {
            model: Author,
            attributes: ["name"],
          },
        },
      ],
    });
    return { books };
  } catch (error) {
    return { error };
  }
}
module.exports = {
  takeBook,
  updateBook,
  getBooksBySubject,
};
