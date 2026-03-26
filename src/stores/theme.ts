"use client";

import { create } from "zustand";

type Theme = "dark" | "light";

interface ThemeStore {
  theme: Theme;
  toggle: () => void;
  setTheme: (t: Theme) => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: "dark",
  toggle: () =>
    set((state) => {
      const next = state.theme === "dark" ? "light" : "dark";
      applyTheme(next);
      return { theme: next };
    }),
  setTheme: (t) => {
    applyTheme(t);
    set({ theme: t });
  },
}));

function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  const html = document.documentElement;
  if (theme === "light") {
    html.classList.add("light");
  } else {
    html.classList.remove("light");
  }
  try {
    localStorage.setItem("ktoon-theme", theme);
  } catch {}
}
