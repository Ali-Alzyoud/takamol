import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { api } from "../api";
import { User } from "../types/auth";

interface LoginCredentials {
  username: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  invite_code: string;
  invite_password: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => Promise<void>;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  registerWithPasskey: () => Promise<void>;
  registerWithQR: (qrData: string) => Promise<void>;
  refreshSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        setUser: (user) => set({ user }),
        setToken: (token) => {
          set({ token });
          if (token) {
            api.defaults.headers.common.Authorization = `Bearer ${token}`;
          } else {
            delete api.defaults.headers.common.Authorization;
          }
        },
        setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
        setIsLoading: (isLoading) => set({ isLoading }),
        setError: (error) => set({ error }),
        logout: async () => {
          try {
            const token = get().token;
            if (token) {
              await api.post("/users/logout/");
            }
          } catch (error) {
            console.error("Logout error:", error);
          } finally {
            set({ user: null, token: null, isAuthenticated: false });
            delete api.defaults.headers.common.Authorization;
          }
        },
        login: async (credentials) => {
          set({ isLoading: true, error: null });
          try {
            const { data } = await api.post("/users/login/", credentials);
            const { token, ...user } = data;
            set({ user, token, isAuthenticated: true, isLoading: false });
            api.defaults.headers.common.Authorization = `Bearer ${token}`;
          } catch (error) {
            set({ isLoading: false });
            throw error;
          }
        },
        register: async (data) => {
          set({ isLoading: true, error: null });
          try {
            const { data: response } = await api.post("/users/register/", data);
            const { token, ...user } = response;
            set({ user, token, isAuthenticated: true, isLoading: false });
            api.defaults.headers.common.Authorization = `Bearer ${token}`;
          } catch (error) {
            set({ isLoading: false });
            throw error;
          }
        },
        registerWithPasskey: async () => {
          set({ isLoading: true, error: null });
          try {
            const { data: response } = await api.post(
              "/users/webauthn/register/"
            );
            const { token, ...user } = response;
            set({ user, token, isAuthenticated: true, isLoading: false });
            api.defaults.headers.common.Authorization = `Bearer ${token}`;
          } catch (error) {
            set({ isLoading: false });
            throw error;
          }
        },
        registerWithQR: async (qrData) => {
          set({ isLoading: true, error: null });
          try {
            const { data: response } = await api.post("/users/qr/register/", {
              qrData,
            });
            const { token, ...user } = response;
            set({ user, token, isAuthenticated: true, isLoading: false });
            api.defaults.headers.common.Authorization = `Bearer ${token}`;
          } catch (error) {
            set({ isLoading: false });
            throw error;
          }
        },
        refreshSession: async () => {
          const token = get().token;
          if (!token) {
            set({ user: null, isAuthenticated: false, isLoading: false });
            return;
          }

          try {
            const { data: user } = await api.get("/users/me/");
            set({ user, isAuthenticated: true, isLoading: false });
          } catch (error) {
            set({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoading: false,
            });
            delete api.defaults.headers.common.Authorization;
          }
        },
      }),
      {
        name: "auth-storage",
        partialize: (state) => ({
          user: state.user,
          token: state.token,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    )
  )
);
