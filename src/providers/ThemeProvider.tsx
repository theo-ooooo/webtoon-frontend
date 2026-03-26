"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/stores/theme";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const setTheme = useThemeStore((s) => s.setTheme);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("ktoon-theme") as "dark" | "light" | null;
      if (saved) {
        setTheme(saved);
      }
    } catch {}
  }, [setTheme]);

  return <>{children}</>;
}
