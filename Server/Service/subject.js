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
      attributes: ["groupNumber"],
    });
    console.log("Student" + StudentId);
    const group = student.groupNumber.match(/\d+/)[0];
    console.log(group);
    const groupNumber = group.substr(1, 2);
    const admittedYear = group[0];
    const currentDate = new Date();
    const month = `${currentDate.getMonth() + 1}`;
    const year = `${currentDate.getFullYear()}`.substr(3, 1);
    var course = year - admittedYear;
    console.log(course);
    let semester;
    if ((month >= 8 && month <= 12) || month == 1) {
      switch ((11 + course) % 10) {
        case 1:
          semester = 1;
          break;
        case 2:
          semester = 3;
          break;
        case 3:
          semester = 5;
          break;
        case 4:
          semester = 7;
          break;
      }
    } else {
      switch ((10 + course) % 10) {
        case 1:
          semester = 2;
          break;
        case 2:
          semester = 4;
          break;
        case 3:
          semester = 6;
          break;
        case 4:
          semester = 8;
          break;
      }
    }
    console.log(semester);
    const lessons = await Lesson.findAll({
      attributes: ["SubjectId"],
      where: { groupNumber, semester },
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
      attributes: ["groupNumber"],
    });
    const group = student.groupNumber.match(/\d+/)[0];
    const groupNumber = group.substr(1, 2);
    const lessons = await Lesson.findAll({
      attributes: ["SubjectId"],
      where: { groupNumber, semester },
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
