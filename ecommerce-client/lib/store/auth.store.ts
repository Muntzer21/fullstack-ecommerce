import { create } from "zustand";
import { persist } from "zustand/middleware";

import { User } from "@/types/auth";

type AuthStore = {
  user: User | null;
  accessToken: string | null;

  login: (user: User, token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,

      login: (user, token) =>
        set({
          user,
          accessToken: token,
        }),

      logout: () =>
        set({
          user: null,
          accessToken: null,
        }),
    }),
    {
      name: "auth-storage",
    },
  ),
);
