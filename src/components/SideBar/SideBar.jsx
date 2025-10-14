import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home, Category, Folder, Inventory, ShoppingCart, People, Payment,
  LocalOffer, Percent, ConfirmationNumber, LocalShipping, BarChart, Settings,
  Group, MenuOpen, Menu
} from "@mui/icons-material";
import { useColors } from "../../hooks/useColor";

const menuItems = [
  { text: "Dashboard", icon: <Home />, path: "/" },
  { text: "Productos", icon: <Category />, path: "/products" },
  { text: "Categorías", icon: <Folder />, path: "/categories", disabled: true },
  { text: "Inventario", icon: <Inventory />, path: "/inventory", disabled: true },
  { text: "Pedidos", icon: <ShoppingCart />, path: "/orders",disabled: true },
  { text: "Clientes", icon: <People />, path: "/customers", disabled: true },
  { text: "Pagos", icon: <Payment />, path: "/payments", disabled: true },
  { text: "Campañas", icon: <LocalOffer />, path: "/campaigns", disabled: true },
  { text: "Descuentos", icon: <Percent />, path: "/discounts", disabled: true },
  { text: "Cupones", icon: <ConfirmationNumber />, path: "/coupons", disabled: true },
  { text: "Proveedores", icon: <LocalShipping />, path: "/suppliers", disabled: true },
  { text: "Reportes", icon: <BarChart />, path: "/reports", disabled: true },
  { text: "Configuración", icon: <Settings />, path: "/settings", disabled: true },
  { text: "Usuarios y Roles", icon: <Group />, path: "/users", disabled: true },
];

export default function Sidebar({ open, setOpen, isMobile }) {
  const [showText, setShowText] = useState(open);
  const location = useLocation();
  const colors = useColors();

  useEffect(() => {
    let timeout;
    if (open) {
      timeout = setTimeout(() => setShowText(true), 150);
    } else {
      setShowText(false);
    }
    return () => clearTimeout(timeout);
  }, [open]);

  return (
    <div
      className="h-screen p-5 flex flex-col transition-all duration-300 text-white shadow-xl"
      style={{ width: open ? "16rem" : "5rem", backgroundColor: colors.background }}
    >
      <div
        className={`flex items-center mb-8 transition-all duration-300 ${
          open ? "justify-between" : "justify-center"
        }`}
        style={{ height: "3rem" }}
      >
        {showText && (
          <h1
            className="text-xl font-bold transition-all duration-500"
            style={{
              color: colors.titlePrimary,
              transform: showText ? "translateX(0)" : "translateX(-20px)",
              opacity: showText ? 1 : 0,
            }}
          >
            P-SHOP CRM
          </h1>
        )}

        {/* Solo mostrar el botón si NO es mobile */}
        {!isMobile && (
          <button onClick={() => setOpen(!open)} className="focus:outline-none">
            {open ? (
              <MenuOpen style={{ color: colors.titlePrimary }} />
            ) : (
              <Menu style={{ color: colors.titlePrimary }} />
            )}
          </button>
        )}
      </div>

      {/* Menú de navegación */}
      <nav className="flex flex-col gap-2">
        {menuItems.map((item, index) => {
          const active = location.pathname === item.path;
          const linkColor = active ? colors.white : colors.textPrimary;

          return (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center gap-3 p-2 rounded transition-all duration-300 ${
                active ? "font-semibold" : ""
              }`}
              style={{
                backgroundColor: active ? colors.primary : "transparent",
                color: linkColor,
                opacity: item.disabled ? 0.5 : 1,
                cursor: item.disabled ? "not-allowed" : "pointer",
              }}
              onMouseEnter={(e) => {
                if (!active) e.currentTarget.style.backgroundColor = colors.active;
              }}
              onMouseLeave={(e) => {
                if (!active) e.currentTarget.style.backgroundColor = "transparent";
              }}
              onClick={(e) => item.disabled && e.preventDefault()}
            >
              <span style={{ color: linkColor }} className="w-6 h-6 flex-shrink-0 flex justify-center">
                {item.icon}
              </span>

              <span
                style={{ color: linkColor }}
                className={`overflow-hidden transition-all duration-300 whitespace-nowrap`}
              >
                <span className={`inline-block transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}>
                  {item.text}
                </span>
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}