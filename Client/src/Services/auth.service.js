import axios from "axios";

const register = (username, email, password) => {
  return axios
    .post("/api/register", {
      username,
      email,
      password,
    })
    .then((response) => {
      if (response.data.UserId) {
        localStorage.setItem("me", JSON.stringify(response.data));
      }
    });
};
const login = (username, password) => {
  return axios
    .post("/api/login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.UserId) {
        localStorage.setItem("me", JSON.stringify(response.data));
      }
    });
};

const logout = () => {
  localStorage.removeItem("me");
  return axios.post("/api/signout").then((response) => {
    return response.data;
  });
};

const AuthService = {
  register,
  login,
  logout,
};

export default AuthService;
