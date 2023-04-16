const { Order } = require("../Models/Order");
const { Book } = require("../Models/Book");
const { Subject } = require("../Models/Subject");
const { User } = require("../Models/User");
const { Student } = require("../Models/Students");
const { Lecturer } = require("../Models/Lecturer");
const { Fine } = require("../Models/Fine");

const getFineContent = async (UserId) => {
  try {
    const fine = await Fine.findAll({
      include: {
        model: Order,
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
      },
    });
    return { fine };
  } catch (error) {
    return { error };
  }
};

const getFines = async () => {
  try {
    const fine = await Fine.findAll({
      include: {
        model: Order,
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
    return { fine };
  } catch (error) {
    return { error };
  }
};
module.exports = {
  getFineContent,
  getFines,
};
