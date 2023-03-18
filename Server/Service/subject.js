const { Subject } = require("../Models/Subject");
const { LecturerInfo } = require("../Models/LecturerInfo");

async function getSubject(LecturerId) {
  try {
    const subjects = await LecturerInfo.findAll({
      where: { LecturerId },
      include: [
        {
          model: Subject,
          attributes: ["name"],
        },
      ],
    });

    return { subjects };
  } catch (error) {
    return { error };
  }
}

module.exports = {
  getSubject,
};
