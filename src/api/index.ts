import axios from "axios";
import { useAuthStore } from "../store/auth";

export const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const auth = useAuthStore.getState();
      await auth.logout();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
