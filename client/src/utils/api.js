import axios from 'axios'

const API = axios.create({
    baseURL: "http://localhost:6478/api",
    withCredentials: true,
});

export default API;