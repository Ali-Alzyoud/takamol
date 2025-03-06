import { useCallback } from "react";
import { useAuthStore } from "../store/auth";
import { apiClient } from "../api/client";

interface LoginCredentials {
  username: string;
  password: string;
}

interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  invite_code: string;
  invite_password: string;
}

export const useAuth = () => {
  const {
    setUser,
    setIsAuthenticated,
    setIsLoading,
    setError,
    logout: clearAuth,
  } = useAuthStore();

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await apiClient.post("/api/auth/login/", credentials, {
          withCredentials: true, // Ensure cookies are handled
        });
        setUser(response.data);
        setIsAuthenticated(true);
        return response.data;
      } catch (error: any) {
        setError(error.response?.data?.message || error.message);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [setUser, setIsAuthenticated, setIsLoading, setError]
  );

  const register = useCallback(
    async (credentials: RegisterCredentials) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await apiClient.post(
          "/api/users/register/",
          credentials,
          {
            withCredentials: true,
          }
        );
        setUser(response.data);
        setIsAuthenticated(true);
        return response.data;
      } catch (error: any) {
        setError(error.response?.data?.message || error.message);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [setUser, setIsAuthenticated, setIsLoading, setError]
  );

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await apiClient.post("/api/auth/logout/");
    } catch (error: any) {
      setError(error.response?.data?.message || error.message);
    } finally {
      clearAuth();
      setIsLoading(false);
    }
  }, [clearAuth, setIsLoading, setError]);

  const checkAuth = useCallback(async () => {
    try {
      const response = await apiClient.get("/api/users/me/", {
        withCredentials: true,
      });
      setUser(response.data);
      setIsAuthenticated(true);
      return response.data;
    } catch (error) {
      clearAuth();
      throw error;
    }
  }, [setUser, setIsAuthenticated, clearAuth]);

  return {
    login,
    register,
    logout,
    checkAuth,
  };
};
