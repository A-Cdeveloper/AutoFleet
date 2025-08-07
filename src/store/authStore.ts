import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      isAuthenticated: false,
      login: (username, password) => {
        const isValid = username === "admin" && password === "Ad123456";
        if (isValid) {
          set({ isAuthenticated: true });
          return true;
        }
        return false;
      },
      logout: () => {
        set({ isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
