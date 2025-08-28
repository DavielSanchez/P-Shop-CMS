import { AppBar, Toolbar, IconButton, Typography, Box, Badge, Menu, MenuItem, Avatar } from "@mui/material";
import { Menu as MenuIcon, Notifications, Mail } from "@mui/icons-material";
import { useState } from "react";

export default function Navbar({ toggleSidebar, sidebarOpen }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
  position="fixed"
  sx={{
    zIndex: (theme) => theme.zIndex.drawer + 1,
    backgroundColor: "#6b21a8",
    transition: "all 0.3s ease-in-out",
    width: sidebarOpen ? `calc(100% - 240px)` : `calc(100% - 60px)`,
    ml: sidebarOpen ? `240px` : `60px`, // 
  }}
>
      <Toolbar>
        {/* Botón para colapsar el sidebar */}
        <IconButton color="inherit" edge="start" onClick={toggleSidebar} sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>

        {/* Logo / nombre */}
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          P-Shop CMS
        </Typography>

        {/* Iconos de notificaciones y mensajes */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <Mail />
            </Badge>
          </IconButton>

          <IconButton color="inherit" sx={{ ml: 2 }}>
            <Badge badgeContent={3} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          {/* Avatar de usuario */}
          <IconButton color="inherit" onClick={handleMenu} sx={{ ml: 2 }}>
            <Avatar alt="Usuario" src="/avatar.png" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleClose}>Perfil</MenuItem>
            <MenuItem onClick={handleClose}>Cerrar sesión</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
