import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen">
      <SideBar open={sidebarOpen} />
      <div
        className={`flex-1 flex flex-col transition-all duration-500 ease-in-out`}
        style={{
          marginLeft: sidebarOpen ? "50px" : "40px",
        }}
      >
        <Navbar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        <div className="mt-20 flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}