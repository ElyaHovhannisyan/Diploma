import axios from "axios";
const useDelieverApi = () => {
  const url = "/api/deliever";
  const addDeliever = async (token, bookId, UserId) => {
    console.log(bookId, UserId);
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    return axios.post(
      url + `/${bookId}`,
      {
        UserId,
      },
      {
        headers: headers,
      }
    );
  };
  const getDeliever = async (token) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios(url, {
      headers: headers,
    });
  };
  const deleteDeliever = async (token, BookId, UserId) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios.delete(url + `/${BookId}/${UserId}`, {
      headers: headers,
    });
  };
  const getAllDeliever = async (token) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios("api/delievers", {
      headers: headers,
    });
  };
  return {
    addDeliever,
    deleteDeliever,
    getDeliever,
    getAllDeliever,
  };
};

export default useDelieverApi;
