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
  const getBooksBySubjectId = async (token, id) => {
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
  const putBook = async (token, id, state) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios.put(url + `/${id}`, { state }, { headers });
  };
  return {
    getBooksBySubjectId,
    getStudentBooks,
    getBookDetails,
    putBook,
  };
};

export default useBookApi;
