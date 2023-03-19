import axios from "axios";
const useCartApi = () => {
  const url = "/api/cart";
  const addCart = async (token, bookId) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    return axios.post(
      url + `/${bookId}`,
      {},
      {
        headers: headers,
      }
    );
  };
  const getCart = async (token) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios(url, {
      headers: headers,
    });
  };
  const deleteCart = async (token, BookId) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios.delete(url + `/${BookId}`, {
      headers: headers,
    });
  };
  const getAllCart = async (token) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios("api/carts", {
      headers: headers,
    });
  };
  return {
    addCart,
    deleteCart,
    getCart,
    getAllCart,
  };
};

export default useCartApi;
