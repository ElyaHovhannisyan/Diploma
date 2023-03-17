import axios from "axios";
const useCartApi = () => {
  const url = "/api/cart";
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
  return {
    // addCart,
    // updateCart,
    deleteCart,
    getCart,
    // buyCart,
  };
};

export default useCartApi;
