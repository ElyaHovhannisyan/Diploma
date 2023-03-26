const {
  getSubject,
  getSubjects,
  getSubjetcsByGroup,
  getSubjetcsBySemester,
} = require("../Service/subject");

const getSubjectsName = async (req, res) => {
  const LecturerId = req.LecturerId;
  const { error, subjects } = await getSubject(LecturerId);
  if (error) res.status(406).send("Can't get a subjectName");
  res.status(200).send(subjects);
};
const getAllSubject = async (req, res) => {
  const { error, subjects } = await getSubjects();
  if (error) res.status(406).send("Can't get a subjects");
  res.status(200).send(subjects);
};
const getSemesterSubjectsByGroup = async (req, res) => {
  const StudentId = req.StudentId;
  const { error, subjects } = await getSubjetcsByGroup(StudentId);
  if (error) res.status(406).send("Can't get a subjects");
  res.status(200).send(subjects);
};
const getSemesterSubjects = async (req, res) => {
  const StudentId = req.StudentId;
  const semester = req.params["semester"];
  const { error, lessons } = await getSubjetcsBySemester(StudentId, semester);
  if (error) res.status(406).send("Can't get a subjects");
  res.status(200).send(lessons);
};
module.exports = {
  getSubjectsName,
  getAllSubject,
  getSemesterSubjectsByGroup,
  getSemesterSubjects,
};
