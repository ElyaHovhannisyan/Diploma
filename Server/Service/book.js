const { Book } = require("../Models/Book");
const { Subject } = require("../Models/Subject");

async function takeBook(id) {
  try {
    const book = await Book.findByPk(id);

    if (!book) throw new Error("unknown book id");

    return { book };
  } catch (error) {
    return { error };
  }
}
async function createBook(req) {
  try {
    if (Array.isArray(req.body)) {
      const bodyLength = Object.keys(req.body).length;
      for (i = 0; i < bodyLength; i++) {
        const subjectId = await Subject.findOne({
          where: { name: req.body[i].subjectName },
        });
        delete req.body[i].subjectName;
        req.body[i].SubjectId = subjectId.id;
        await Book.create(req.body[i]);
      }
    } else {
      const subjectId = await Subject.findOne({
        where: { name: req.body.subjectName },
      });
      delete req.body.subjectName;
      req.body.SubjectId = subjectId.id;
      await Book.create(req.body);
    }
    return { message: "Books created" };
  } catch (error) {
    return { error };
  }
}
module.exports = {
  takeBook,
  createBook,
};
