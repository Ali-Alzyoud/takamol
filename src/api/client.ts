import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { useAuthStore } from "../store/auth";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: any
  ) {
    super(message);
    this.name = "ApiError";
  }

  static fromAxiosError(error: AxiosError): ApiError {
    const status = error.response?.status || 500;
    const message =
      error.response?.data &&
      typeof error.response.data === "object" &&
      "message" in error.response.data
        ? String(error.response.data.message)
        : error.message;
    const data = error.response?.data;
    return new ApiError(status, message, data);
  }
}

export const createApiClient = (config?: AxiosRequestConfig): AxiosInstance => {
  const client = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // Enable sending cookies with requests
    headers: {
      "Content-Type": "application/json",
    },
    ...config,
  });

  // Request interceptor
  client.interceptors.request.use(
    (config) => {
      // You can add custom headers or modify the request here
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        // Handle unauthorized access
        // You can implement token refresh logic here
        useAuthStore.getState().logout();
      }
      return Promise.reject(ApiError.fromAxiosError(error));
    }
  );

  return client;
};

// Create a default client instance
export const apiClient = createApiClient();
