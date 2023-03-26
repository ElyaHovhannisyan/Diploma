const { Deliever } = require("../Models/Deliever");
const { Book } = require("../Models/Book");
const { Subject } = require("../Models/Subject");
const { User } = require("../Models/User");
const { Student } = require("../Models/Students");
const { Lecturer } = require("../Models/Lecturer");

const addToDelieverService = async (UserId, BookId) => {
  try {
    const deliever = await Deliever.create({
      UserId,
      BookId,
    });
    return { deliever };
  } catch (error) {
    return { error };
  }
};
const getDelieverContent = async (UserId) => {
  try {
    const deliever = await Deliever.findAll({
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
    return { deliever };
  } catch (error) {
    return { error };
  }
};
const deleteDelieverContent = async (UserId, bookId) => {
  try {
    const deliever = await Deliever.destroy({
      where: { UserId, BookId: bookId },
    });
    return { deliever };
  } catch (error) {
    return { error };
  }
};
const getDelievers = async () => {
  try {
    const deliever = await Deliever.findAll({
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
      attributes: ["UserId"],
    });
    return { deliever };
  } catch (error) {
    return { error };
  }
};
module.exports = {
  addToDelieverService,
  getDelieverContent,
  deleteDelieverContent,
  getDelievers,
};
