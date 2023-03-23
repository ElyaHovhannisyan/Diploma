import axios from "axios";
const useSubjectApi = () => {
  const url = "/api/subjects";
  const getSubjects = async (token) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios(url, {
      headers: headers,
    });
  };
  const getAllSubjects = async (token) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios("api/allSubjects", {
      headers: headers,
    });
  };
  return {
    getSubjects,
    getAllSubjects,
  };
};

export default useSubjectApi;
