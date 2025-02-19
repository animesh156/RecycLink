import axios from 'axios'

const API = axios.create({
    baseURL: "http://localhost:6478/api",     // for development
    withCredentials: true,
});

export default API;