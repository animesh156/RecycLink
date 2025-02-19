import axios from 'axios'

const API = axios.create({
    baseURL: "https://recyc-link-backend.vercel.app/api",     // for development
    withCredentials: true,
});

export default API;