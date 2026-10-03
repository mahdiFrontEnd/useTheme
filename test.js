// src/hooks/useTheme.ts
import { useCallback, useEffect, useState } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // ۱. از localStorage
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (saved) return saved;

    // ۲. از سیستم
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }

    // ۳. پیش‌فرض
    return "light";
  });

  // ─── اعمال روی <html> ───
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  // ─── Toggle ───
  const toggle = useCallback(() => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }, []);

  return { theme, toggle, setTheme };
}
