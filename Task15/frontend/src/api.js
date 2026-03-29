import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000/users"
});

export default API;