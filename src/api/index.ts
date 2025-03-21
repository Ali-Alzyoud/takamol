import axios from "axios";
import { useAuthStore } from "../store/auth";
import { paths } from "../utils/paths";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const auth = useAuthStore.getState();
      await auth.logout();

      // Only redirect if we're not already on the login page
      if (window.location.pathname !== paths.login) {
        window.location.href = paths.login;
      }
    }

    return Promise.reject(error);
  }
);

export { api };
