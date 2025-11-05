/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";
import { themes } from "../theme/themes";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // ✅ Inicializar desde localStorage
  const storedTheme = localStorage.getItem("theme");
  const storedMode = localStorage.getItem("mode");

  const [themeKey, setThemeKey] = useState(
    storedTheme && themes[storedTheme] ? storedTheme : "default"
  );
  const [mode, setMode] = useState(storedMode || "system");

  useEffect(() => {
    const root = document.documentElement;
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const appliedMode =
      mode === "system" ? (systemDark ? "dark" : "light") : mode;

    const t = themes[themeKey][appliedMode];
    Object.entries(t).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    root.classList.toggle("dark", appliedMode === "dark");

    localStorage.setItem("theme", themeKey);
    localStorage.setItem("mode", mode);
  }, [themeKey, mode]);

  return (
    <ThemeContext.Provider
      value={{ themeKey, setThemeKey, mode, setMode, themes }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
