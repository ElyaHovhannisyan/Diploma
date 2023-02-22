import axios from "axios";

const API_URL = "/api/register";

const register = (username, email, password) => {
  return axios.post(API_URL, {
    username,
    email,
    password,
  });
};

const AuthService = {
  register,
};

export default AuthService;
