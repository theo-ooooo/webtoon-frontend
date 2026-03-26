"use client";

import { create } from "zustand";
import api from "@/lib/api";
import type { UserInfo, LoginResponse } from "@/types";

interface AuthState {
  user: UserInfo | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, nickname: string) => Promise<void>;
  logout: () => void;
  fetchMe: () => Promise<void>;
  setToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  isLoading: false,

  login: async (email, password) => {
    const res = await api.post<LoginResponse>("/auth/login", {
      email,
      password,
    });
    const { token, user } = res.data!;
    localStorage.setItem("token", token);
    set({ token, user });
  },

  signup: async (email, password, nickname) => {
    await api.post("/auth/signup", { email, password, nickname });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, user: null });
  },

  fetchMe: async () => {
    try {
      set({ isLoading: true });
      const res = await api.get<UserInfo>("/auth/me");
      set({ user: res.data!, isLoading: false });
    } catch {
      localStorage.removeItem("token");
      set({ token: null, user: null, isLoading: false });
    }
  },

  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token });
  },
}));
