import axios from "axios";
const useOrderApi = () => {
  const url = "/api/order";
  const addOrder = async (token, bookId, bookNumber, UserId) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    return axios.post(
      url + `/${bookId}`,
      {
        bookNumber,
        UserId,
      },
      {
        headers: headers,
      }
    );
  };
  const getOrder = async (token) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios(url, {
      headers: headers,
    });
  };
  const deleteOrder = async (token, BookId, UserId) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios.delete(url + `/${BookId}/${UserId}`, {
      headers: headers,
    });
  };
  const getAllOrder = async (token) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios("api/orders", {
      headers: headers,
    });
  };

  return {
    addOrder,
    deleteOrder,
    getOrder,
    getAllOrder,
  };
};

export default useOrderApi;
