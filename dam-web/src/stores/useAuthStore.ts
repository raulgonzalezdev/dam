import create from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { User } from "../shared/models/user";

type State = {
  access: string;
  refresh: string;
  user: User | undefined;
  setAuth: (access: { access: string; refresh: string, user?:  User }) => void;
  logout: () => void;
};

export const useAuthStore = create<State>()(
  persist(
    immer((set) => ({
      access: "",
      refresh: "",
      user: undefined,

      setAuth: ({ access, refresh, user }) => {
        set((state) => {
          state.access = access;
          state.refresh = refresh;
          state.user = user;
        });
      },
      logout: () => {
        set((state) => {
          state.access = "";
          state.refresh = "";
        });
      },
    })),
    {
      name: "dan-session",
    }
  )
);
