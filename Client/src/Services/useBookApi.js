import axios from "axios";

const useBookApi = () => {
  const url = "/api/books";
  const getStudentBooks = async (token, semester) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios(url + `/semester/${semester}`, {
      headers: headers,
    });
  };
  const getLecturerBooks = async (token, id) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios(url + `/subject/${id}`, {
      headers: headers,
    });
  };
  const getBookDetails = async (token, id) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios(url + `/${id}`, {
      headers: headers,
    });
  };
  return {
    getLecturerBooks,
    getStudentBooks,
    getBookDetails,
  };
};

export default useBookApi;
