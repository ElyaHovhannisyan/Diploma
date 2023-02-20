import axios from "axios";

const API_URL = "http://localhost:9000/api/";

const register = (username, email, password) => {
  return axios.post(API_URL + "register", {
    username,
    email,
    password,
  });
};

const AuthService = {
  register,
};

export default AuthService;
