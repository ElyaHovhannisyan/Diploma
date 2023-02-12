import axios from "axios";

const API_URL = "http://localhost:9000/api/";

const register = (username, email, password) => {
  return axios
    .post(API_URL + "sign_up", {
      username,
      email,
      password,
    })
    .then((response) => {
      if (response.data.username) {
        localStorage.setItem("me", JSON.stringify(response.data));
      }
      console.log(response.data);
      return response.data;
    });
};

const AuthService = {
  register,
};

export default AuthService;
