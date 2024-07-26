import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080";

const getPublicContent = () => {
  return axios.get(API_URL + "/public/")
    .then(response => response.data)
    .catch(error => {
      console.error("Error fetching public content:", error);
      throw error; // Re-throw the error for the caller to handle
    });
};

const getUserBoard = () => {
  return axios.get(API_URL + "/user/", { headers: authHeader() })
    .then(response => response.data)
    .catch(error => {
      console.error("Error fetching user board:", error);
      throw error; // Re-throw the error for the caller to handle
    });
};

const UserService = {
  getPublicContent,
  getUserBoard
};

export default UserService;
