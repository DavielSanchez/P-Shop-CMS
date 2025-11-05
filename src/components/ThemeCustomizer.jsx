import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { MdColorLens } from "react-icons/md";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useColors } from "../hooks/useColor";

export default function ThemeCustomizer() {
  const [open, setOpen] = useState(false);
  const { themeKey, setThemeKey, mode, setMode, themes } = useTheme();
  const colors = useColors();

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 text-white p-4 rounded-full shadow-lg transition-transform animate-spin-slow"
        style={{ backgroundColor: colors.primary }}
      >
        <MdColorLens size={24} />
      </button>

      {open && (
        <div
          className="fixed bottom-20 right-5 w-72 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-4"
          style={{ backgroundColor: colors.background }}
        >
          <h3
            className="font-bold text-lg mb-4"
            style={{ color: colors.primary }}
          >
            Customization
          </h3>

          {/* Modo */}
          <div className="mb-4">
            <p className="mb-1" style={{ color: colors.textPrimary }}>
              Modo:
            </p>
            <RadioGroup
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              style={{ color: colors.textSecondary }}
            >
              <FormControlLabel
                value="light"
                control={<Radio style={{ color: colors.textSecondary }} />}
                label="Light"
              />
              <FormControlLabel
                value="dark"
                control={<Radio style={{ color: colors.textSecondary }} />}
                label="Dark"
              />
              <FormControlLabel
                value="system"
                control={<Radio style={{ color: colors.textSecondary }} />}
                label="System"
              />
            </RadioGroup>
          </div>

          {/* Temas */}
          <div>
            <span className="block mb-2" style={{ color: colors.textPrimary }}>
              Tema:
            </span>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(themes).map(([key, t]) => {
                const systemDark = window.matchMedia(
                  "(prefers-color-scheme: dark)"
                ).matches;
                const appliedMode =
                  mode === "system" ? (systemDark ? "dark" : "light") : mode;
                const colors = t[appliedMode];

                return (
                  <div
                    key={key}
                    onClick={() => setThemeKey(key)}
                    className={`cursor-pointer p-2 rounded-lg border-2 transition ${
                      themeKey === key
                        ? "border-indigo-500"
                        : "border-transparent hover:border-gray-400"
                    }`}
                  >
                    {/* <div
                      className="h-10 w-full rounded mb-1"
                      style={{ backgroundColor: colorMap[colors.primary] }}
                    />
                    <div
                      className="h-2 w-full rounded"
                      style={{ backgroundColor: colorMap[colors.accent] }}
                    /> */}
                    <div
                      className={`h-10 w-full rounded mb-1`}
                      style={{ backgroundColor: colors.primary }}
                    />
                    <div
                      className={`h-2 w-full rounded`}
                      style={{ backgroundColor: colors.accent }}
                    />
                    <span
                      className="text-xs block text-center mt-1"
                      style={{ color: colors.textSecondary }}
                    >
                      {t.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </>
  );
}
