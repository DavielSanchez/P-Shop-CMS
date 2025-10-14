import React, { useState } from "react";
import {
  Box,
  IconButton,
  Badge,
  Avatar,
  MenuItem,
  Tooltip,
} from "@mui/material";
import {
  Mail,
  Notifications,
  Brightness4,
  Brightness7,
  Menu,
} from "@mui/icons-material";
import { useTheme } from "../../context/ThemeContext";
import { useColors } from "../../hooks/useColor";
import UserDropdown from "./UserDropdown";

export default function Header({ isMobile, toggleSidebar }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { mode, setMode } = useTheme();
  const colors = useColors();

  const appliedMode =
    mode === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : mode;

  const toggleTheme = () => {
    setMode(appliedMode === "dark" ? "light" : "dark");
  };

  return (
    <header
      className="flex justify-between items-center mt-2 px-4 py-4 shadow-lg rounded-lg transition-colors duration-300"
      style={{
        backgroundColor: colors.background,
        borderColor: appliedMode === "dark" ? "#374151" : "#e5e7eb",
      }}
    >
      {/* Izquierda: nombre o menú mobile */}
      <div className="flex items-center gap-3">
        {isMobile && (
          <IconButton
            onClick={toggleSidebar}
            className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-full p-2"
          >
            <Menu style={{ color: colors.titlePrimary }} />
          </IconButton>
        )}

        <div className="flex gap-2">
          <div className="text-md md:text-3xl font-bold" style={{ color: colors.primary }}>
            P-SHOP
          </div>
          <div
            className="font-medium text-xs md:text-lg"
            style={{ color: appliedMode === "dark" ? "#d1d5db" : "#6b7280" }}
          >
            CRM
          </div>
        </div>
      </div>

      {/* Íconos de acciones */}
      <Box sx={{ display: "flex", alignItems: "center" }} className="gap-0">
        <Tooltip title="Cambiar tema">
          <IconButton
            onClick={toggleTheme}
            className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-full p-2"
          >
            {appliedMode === "light" ? (
              <Brightness4 style={{ color: colors.primary }} />
            ) : (
              <Brightness7 className="text-yellow-400" />
            )}
          </IconButton>
        </Tooltip>

        <Tooltip title="Mensajes">
          <IconButton className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-full p-2">
            <Badge badgeContent={4} color="error">
              <Mail style={{ color: colors.primary }} />
            </Badge>
          </IconButton>
        </Tooltip>

        <Tooltip title="Notificaciones">
          <IconButton className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-full p-2">
            <Badge badgeContent={3} color="error">
              <Notifications style={{ color: colors.primary }} />
            </Badge>
          </IconButton>
        </Tooltip>

        <UserDropdown />
      </Box>
    </header>
  );
}