import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import SidebarMenu from "./SidebarMenu/SidebarMenu";

const Layout: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <SidebarMenu />
      <Header />

      <main className="p-2 w-100 h-100 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
