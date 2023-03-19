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
async function updateBook(id) {
  try {
    const b = await Book.findByPk(id);
    const book = await Book.update(
      { count: b.count - 1 },
      {
        where: { id },
      }
    );

    return { book };
  } catch (error) {
    return { error };
  }
}
async function getStudentsBooks(StudentId, semester) {
  try {
    const student = await Student.findByPk(StudentId, {
      attributes: ["group"],
    });
    const g = student.group.substr(3, 2);
    const lessons = await Lesson.findAll({
      attributes: ["SubjectId"],
      where: { g, semester },
    });
    const booksPromises = lessons.map(async (lesson) => {
      const books = await Book.findAll({
        attributes: ["id", "title", "path", "count"],
        where: { SubjectId: lesson.SubjectId },
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
      return books;
    });
    const books = await Promise.all(booksPromises);
    console.log(books);
    return { books };
  } catch (error) {
    return { error };
  }
}
async function getLecturersBooks(SubjectId) {
  try {
    const books = await Book.findAll({
      attributes: ["title", "path", "count"],
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
  getStudentsBooks,
  getLecturersBooks,
};
