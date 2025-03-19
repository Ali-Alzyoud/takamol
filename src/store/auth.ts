import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "../api";

interface User {
  id: number;
  username: string;
  email: string;
  has_completed_core_survey: boolean;
  // Add other user properties as needed
}

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
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  sessionExpiry: Date | null;
  setUser: (user: User | null) => void;
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
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      error: null,
      sessionExpiry: null,
      setUser: (user) => set({ user }),
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setIsLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      logout: async () => {
        try {
          await api.post("/users/logout/");
          set({ user: null, isAuthenticated: false });
        } catch (error) {
          throw error;
        }
      },
      login: async (credentials) => {
        try {
          const { data: user } = await api.post("/users/login/", credentials);
          set({ user, isAuthenticated: true });
        } catch (error) {
          throw error;
        }
      },
      register: async (data) => {
        try {
          const { data: user } = await api.post("/users/register/", data);
          set({ user, isAuthenticated: true });
        } catch (error) {
          throw error;
        }
      },
      registerWithPasskey: async () => {
        try {
          const { data: user } = await api.post("/users/webauthn/register/");
          set({ user, isAuthenticated: true });
        } catch (error) {
          throw error;
        }
      },
      registerWithQR: async (qrData) => {
        try {
          const { data: user } = await api.post("/users/qr/register/", {
            qrData,
          });
          set({ user, isAuthenticated: true });
        } catch (error) {
          throw error;
        }
      },
      refreshSession: async () => {
        try {
          const { data: user } = await api.get("/users/me/");
          if (!user?.id) {
            return set({
              user: null,
              isAuthenticated: false,
              isLoading: false,
            });
          }
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ user: null, isAuthenticated: false, isLoading: false });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
