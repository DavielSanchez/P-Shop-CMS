import { useTheme } from "../context/ThemeContext";
import { useMemo } from "react";

export const useColors = () => {
    const { themeKey, mode, themes } = useTheme();

    const colors = useMemo(() => {
        const appliedMode =
            mode === "system" ?
            window.matchMedia("(prefers-color-scheme: dark)").matches ?
            "dark" :
            "light" :
            mode;

        const current = themes[themeKey][appliedMode];

        return {
            primary: current.primary,
            secondary: current.secondary,
            accent: current.accent,
            background: current.background,
            surface: current.surface,
            textPrimary: current.textPrimary,
            textSecondary: current.textSecondary,
            textDisabled: current.textDisabled,
            muted: current.muted,
            border: current.border,
            divider: current.divider,
            success: current.success,
            warning: current.warning,
            error: current.error,
            info: current.info,
            hover: current.hover,
            active: current.active,
            focus: current.focus,
            overlay: current.overlay,
            shadow: current.shadow,
            white: current.white,
            titlePrimary: current.titlePrimary,
        };
    }, [themeKey, mode, themes]);

    return colors;
};