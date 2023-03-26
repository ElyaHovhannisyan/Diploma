const { Subject } = require("../Models/Subject");
const { LecturerInfo } = require("../Models/LecturerInfo");
const { Student } = require("../Models/Students");
const { Lesson } = require("../Models/Lesson");

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

async function getSubjects() {
  try {
    const subjects = await Subject.findAll();
    return { subjects };
  } catch (error) {
    return { error };
  }
}
async function getSubjetcsByGroup(StudentId) {
  try {
    const student = await Student.findByPk(StudentId, {
      attributes: ["group"],
    });
    const group = student.group.match(/\d+/)[0];
    const groupNumber = group.substr(1, 2);
    const admittedYear = group[0];
    const currentDate = new Date();
    const month = `${currentDate.getMonth() + 1}`;
    const year = `${currentDate.getFullYear()}`.substr(3, 1);
    var course = year - admittedYear;
    let semester;
    if (month >= 8 && month <= 12) {
      if (course > 0) course = course + 1;
      else course = course + 11;
      semester = course * 2 - 1;
    } else {
      if (course < 0) course = course + 10;
      if (month == 1) semester = course * 2 - 1;
      else semester = course * 2;
    }
    const lessons = await Lesson.findAll({
      attributes: ["SubjectId"],
      where: { g: groupNumber, semester },
      include: [
        {
          model: Subject,
          attributes: ["name"],
        },
      ],
    });
    return { subjects: { lessons, semester } };
  } catch (error) {
    return { error };
  }
}
async function getSubjetcsBySemester(StudentId, semester) {
  try {
    const student = await Student.findByPk(StudentId, {
      attributes: ["group"],
    });
    const group = student.group.match(/\d+/)[0];
    const groupNumber = group.substr(1, 2);
    const lessons = await Lesson.findAll({
      attributes: ["SubjectId"],
      where: { g: groupNumber, semester },
      include: [
        {
          model: Subject,
          attributes: ["name"],
        },
      ],
    });
    return { lessons };
  } catch (error) {
    return { error };
  }
}
module.exports = {
  getSubject,
  getSubjects,
  getSubjetcsByGroup,
  getSubjetcsBySemester,
};
