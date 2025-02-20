import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:6478/api", // for production

  withCredentials: true,
});

export default API;
