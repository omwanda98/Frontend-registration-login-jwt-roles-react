import axios from "axios";

const API_URL = "http://localhost:8080/auth";

const register = (username, password) => {
  return axios.post(API_URL + "/register", {
    username,
    password,
  })
  .catch((error) => {
    console.error("Registration failed:", error);
    throw error; // Re-throw the error for the caller to handle
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "/login", {
      username,
      password,
    })
    .then((response) => {
      if (response && response.data) {
        localStorage.setItem("jwt", response.data.jwt);
        localStorage.setItem("user", response.data.username);
      }
      return response.data;
    })
    .catch((error) => {
      console.error("Login failed:", error);
      throw error;
    });
};

const logout = () => {
  localStorage.removeItem("jwt");
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return localStorage.getItem("user") || "";
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
