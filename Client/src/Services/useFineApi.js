import axios from "axios";
const useFineApi = () => {
  const getFine = async (token) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios("/api/fine", {
      headers: headers,
    });
  };
  const getAllFine = async (token) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios("api/fines", {
      headers: headers,
    });
  };

  return {
    getFine,
    getAllFine,
  };
};

export default useFineApi;
