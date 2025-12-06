import axios from "axios";

const API = axios.create({
  
  baseURL: "https://recyclink-backend.onrender.com/api", // for production

  // baseURL: "http://localhost:6478/api", // for development

  withCredentials: true,
});

export default API;
