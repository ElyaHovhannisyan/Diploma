const useCartApi = () => {
  const url = "/api/cart";
  const getCart = async () => {
    const body = {
      userId: 1,
    };
    return fetch(url, {
      method: "GET",
    });
  };

  return {
    // addCart,
    // updateCart,
    // deleteCart,
    getCart,
    // buyCart,
  };
};

export default useCartApi;
