import React, { useState } from "react";
import { Avatar, IconButton, Menu, MenuItem, Badge, Tooltip, Divider, Typography, Box } from "@mui/material";
import { Person, Settings as SettingsIcon, CreditCard, Logout, PowerSettingsNew } from "@mui/icons-material";
import { useColors } from "../../hooks/useColor";

export default function UserDropdown() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const colors = useColors();

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <div>
      <Tooltip title="Cuenta">
        <IconButton
          color="inherit"
          onClick={handleMenu}
          className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-full p-1"
        >
          <Avatar alt="Daviel" src="/avatar.png" sx={{ bgcolor: colors.primary }} />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
            style: { backgroundColor: colors.background }, // aquí se aplica solo al menú
            className: "rounded-lg shadow-lg",
        }}
        >
        {/* Usuario arriba */}
        <MenuItem onClick={handleClose}>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar alt="Daviel" src="/avatar.png" sx={{ bgcolor: colors.primary }} />
            <Box>
              <Typography fontWeight="bold" style={{color: colors.textPrimary}}>Daviel Sanchez</Typography>
              <Typography variant="body2" color="text.secondary" style={{color: colors.textSecondary}}>
                Admin
              </Typography>
            </Box>
          </Box>
        </MenuItem>

        <Divider />

        {/* Opciones */}
        <MenuItem onClick={handleClose} style={{color: colors.textPrimary}}>
          <Person fontSize="small" className="me-4" />
          My Profile
        </MenuItem>

        <MenuItem onClick={handleClose} style={{color: colors.textPrimary}}>
          <SettingsIcon fontSize="small" className="me-4" />
          Settings
        </MenuItem>

        <MenuItem onClick={handleClose} style={{color: colors.textPrimary}}>
          <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
            <Box display="flex" alignItems="center" gap={1}>
              <CreditCard fontSize="small" className="me-2" />
              Billing
            </Box>
            <Badge badgeContent={4} color="error" />
          </Box>
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleClose} style={{color: colors.textPrimary}}>
            <PowerSettingsNew fontSize="small" className="me-2"/>
          Log Out
        </MenuItem>
      </Menu>
    </div>
  );
}
