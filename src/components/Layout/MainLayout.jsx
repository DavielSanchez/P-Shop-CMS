import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../NavBar/Navbar";
import SideBar from "../SideBar/SideBar";
import ThemeCustomizer from "../ThemeCustomizer";
import { useTheme } from "../../context/ThemeContext";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  // Detectar si es mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Colores del tema
  const { themeKey, mode, themes } = useTheme();
  const appliedMode =
    mode === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : mode;

  const currentColors = themes[themeKey][appliedMode];
  const colors = { surface: currentColors.surface };

  return (
    <div
      className="relative px-2 md:pl-0 lg:px-0 flex h-screen w-screen overflow-hidden transition-colors duration-300"
      style={{ backgroundColor: colors.surface }}
    >
      {/* Overlay cuando el sidebar está abierto en mobile */}
      {isMobile && sidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
        />
      )}

      {/* Sidebar */}
      <div
        className={`max-md:fixed max-md:top-0 max-md:left-0 max-md:z-50 transition-transform duration-300 ${
          isMobile && !sidebarOpen ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <SideBar open={sidebarOpen} setOpen={setSidebarOpen} isMobile={isMobile} />
      </div>

      {/* Contenido principal */}
      <div
        className={`
          flex-1 flex flex-col transition-all duration-300 ease-in-out
          w-full max-w-screen
          ${!isMobile ? "md:ml-[1rem] lg:ml-4 mr-3 lg:mr-4" : ""}
        `}
      >
        {/* Navbar (se le pasa isMobile y toggleSidebar) */}
        <Navbar
          toggleSidebar={toggleSidebar}
          isMobile={isMobile}
        />

        <main className="flex-1 overflow-auto py-6 scrollbar-hide">
          <Outlet />
          <ThemeCustomizer />
        </main>
      </div>
    </div>
  );
}
