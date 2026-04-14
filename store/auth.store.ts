import { create } from "zustand";

type User = {
  codigo_usuario: string;
  nome_usuario: string;
  codigo_grupo: string;
  nome_grupo: string;
};

type AuthState = {
  token: string | null;
  user: User | null;
  rememberMe: boolean;
  setAuth: (token: string, user: User, rememberMe: boolean) => void;
  logout: () => void;
  hydrateAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  rememberMe: false,

  setAuth: (token, user, rememberMe) => {
    const storage = rememberMe ? localStorage : sessionStorage;

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    storage.setItem("token", token);
    storage.setItem("user", JSON.stringify(user));

    set({
      token,
      user,
      rememberMe,
    });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    set({
      token: null,
      user: null,
      rememberMe: false,
    });
  },

  hydrateAuth: () => {
    const localToken = localStorage.getItem("token");
    const localUser = localStorage.getItem("user");

    const sessionToken = sessionStorage.getItem("token");
    const sessionUser = sessionStorage.getItem("user");

    if (localToken && localUser) {
      set({
        token: localToken,
        user: JSON.parse(localUser),
        rememberMe: true,
      });
      return;
    }

    if (sessionToken && sessionUser) {
      set({
        token: sessionToken,
        user: JSON.parse(sessionUser),
        rememberMe: false,
      });
    }
  },
}));