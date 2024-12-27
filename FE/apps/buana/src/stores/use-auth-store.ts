import { create } from "zustand";
import {
  persist,
  createJSONStorage,
  devtools,
  subscribeWithSelector,
} from "zustand/middleware";

export type AuthResponse = {
  refresh_token: string;
  token_type: string;
  access_token: string;
  expires_in: number;
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
              refresh_token: auth.refresh_token,
              token_type: auth.token_type,
              access_token: auth.access_token,
              expires_in: auth.expires_in,
            }));
          },
          logout: () => {
            set(() => ({
              refresh_token: undefined,
              token_type: undefined,
              access_token: undefined,
              expires_in: undefined,
            }));
          },
          loginWithGoogle: (auth) => {
            set(() => ({
              refresh_token: auth.refresh_token,
              token_type: auth.token_type,
              access_token: auth.access_token,
              expires_in: auth.expires_in,
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
