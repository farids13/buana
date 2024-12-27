import { create } from "zustand";
import {
  persist,
  createJSONStorage,
  devtools,
  subscribeWithSelector,
} from "zustand/middleware";

export type AuthResponse = {
  accessToken: string;
  email: string;
};

export type AuthState = Partial<AuthResponse> & {
  login: (data: AuthResponse) => void;
  logout: () => void;
  loginWithGoogle: (data: AuthResponse) => void;
};

export const useAuthStore = create<AuthState>()(
  devtools(
    subscribeWithSelector(
      persist(
        (set) => ({
          login: (auth) => {
            set(() => ({
              accessToken: auth.accessToken,
              email: auth.email,
            }));
          },
          logout: () => {
            set(() => ({
              accessToken: undefined,
              email: undefined,
            }));
          },
          loginWithGoogle: (auth) => {
            set(() => ({
              accessToken: auth.accessToken,
              email: auth.email,
            }));
          },
        }),
        {
          name: "bear-storage",
          storage: createJSONStorage(() => localStorage),
        },
      ),
    ),
  ),
);
