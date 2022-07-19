import axios from "axios";


const BASE_URL = "https://deploybackecomerce-production.up.railway.app/api";
const TOKEN = localStorage.getItem("persist:root") !== null? 
(JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser) !== null? 
(JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken) :"vacio":null;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
