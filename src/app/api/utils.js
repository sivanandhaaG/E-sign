import axios from "axios";

const USER_BASE_URL = import.meta.env.VITE_USER_API_BASE_URL;
const UPLOAD_BASE_URL = import.meta.env.VITE_UPLOAD_API_BASE_URL;
console.log(USER_BASE_URL,"USER_BASE_URL");

const authInterceptor = (req) => {
    const accessToken = JSON.parse(localStorage.getItem("user"))?.accessToken;
    if (accessToken) {
        req.headers.Authorization = `Bearer ${accessToken}`;
    }
    return req;
};

export const USER_API = axios.create({
    baseURL: USER_BASE_URL,
});

export const UPLOAD_API = axios.create({
    baseURL: UPLOAD_BASE_URL,
});

USER_API.interceptors.request.use(authInterceptor);