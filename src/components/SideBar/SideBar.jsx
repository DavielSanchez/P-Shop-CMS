import { cloneElement } from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Home, Category, LocalOffer, Settings, Folder, Inventory, ShoppingCart, People, Payment, Percent, ConfirmationNumber, LocalShipping, BarChart, Group } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { text: "Dashboard", icon: <Home />, path: "/" },
  { text: "Productos", icon: <Category />, path: "/products" },
  { text: "Categorías", icon: <Folder />, path: "/categories" },
  { text: "Inventario", icon: <Inventory />, path: "/inventory", disabled: true },
  { text: "Pedidos", icon: <ShoppingCart />, path: "/orders" },
  { text: "Clientes", icon: <People />, path: "/customers" },
  { text: "Pagos", icon: <Payment />, path: "/payments" },
  { text: "Campañas", icon: <LocalOffer />, path: "/campaigns" },
  { text: "Descuentos", icon: <Percent />, path: "/discounts" },
  { text: "Cupones", icon: <ConfirmationNumber />, path: "/coupons" },
  { text: "Proveedores", icon: <LocalShipping />, path: "/suppliers" },
  { text: "Reportes", icon: <BarChart />, path: "/reports" },
  { text: "Configuración", icon: <Settings />, path: "/settings" },
  { text: "Usuarios y Roles", icon: <Group />, path: "/users" },
];

export default function SidebarItem({ open }) {
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? 240 : 60,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? 240 : 60,
          boxSizing: "border-box",
          backgroundColor: "#9155FD",
          color: "#fff",
          transition: "all 0.5s",
        },
      }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            button
            disabled={item.disabled}
            onClick={() => !item.disabled && navigate(item.path)}
            sx={{ minHeight: 40, px: 2, py: 1 }}
          >
            <ListItemIcon sx={{ color: item.disabled ? "#555" : "white", minWidth: 32 }}>
              {cloneElement(item.icon, { fontSize: "small" })}
            </ListItemIcon>
            {open && <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: "0.85rem" }} />}
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
