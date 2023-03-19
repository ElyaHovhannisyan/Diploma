const { getSubject } = require("../Service/subject");

const getSubjectsName = async (req, res) => {
  const LecturerId = req.LecturerId;
  const { error, subjects } = await getSubject(LecturerId);
  if (error) res.status(406).send("Can't get a subjectName");
  res.status(200).send(subjects);
};
module.exports = {
  getSubjectsName,
};
