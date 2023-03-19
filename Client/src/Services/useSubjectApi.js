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
  return {
    getSubjects,
  };
};

export default useSubjectApi;
