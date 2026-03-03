import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";

// ALWAYS use the deployed Render backend - no local fallback
const api = axios.create({
  baseURL: "https://school-management-systems-deem.onrender.com/api",
});

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
