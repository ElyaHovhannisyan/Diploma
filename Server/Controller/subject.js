const { getSubject, getSubjects } = require("../Service/subject");

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
module.exports = {
  getSubjectsName,
  getAllSubject,
};
