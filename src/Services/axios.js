import axios from "axios";
import Cookies from "js-cookie";

// Create axios instance
const api = axios.create({
  baseURL: "https://fileconvetor-41d13bc50874.herokuapp.com",
  withCredentials: true, // cookies automatically send/receive
});

// ----------- REQUEST INTERCEPTOR -----------
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token"); // get token from cookies

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Handle multipart automatically
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ----------- RESPONSE INTERCEPTOR -----------
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status == 403) {
      Cookies.remove("token");  // remove expired token
      window.location.href = "/login"; // redirect
    }

    return Promise.reject(error);
  }
);

export default api;
