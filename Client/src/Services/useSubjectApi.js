import axios from "axios";
const useSubjectApi = () => {
  const getSubjects = async (token) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios("/api/subjects", {
      headers: headers,
    });
  };
  const getAllSubjects = async (token) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios("/api/allSubjects", {
      headers: headers,
    });
  };
  const getSemesterSubjectsByGroup = async (token) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios("/api/currentSemesterSubjects", {
      headers: headers,
    });
  };
  const getSemesterSubjects = async (token, semester) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios(`/api/subjects/${semester}`, {
      headers: headers,
    });
  };
  return {
    getSubjects,
    getAllSubjects,
    getSemesterSubjectsByGroup,
    getSemesterSubjects,
  };
};

export default useSubjectApi;
