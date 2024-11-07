import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import SidebarMenu from "./SidebarMenu/SidebarMenu";
import "./layout.css";
const Layout: React.FC = () => {
  return (
    <div className="w-100 h-100  ">
      <SidebarMenu />
      <Header />
      <main className="main-content w-100 overflow-auto">
        <div className="container pt-4 pb-4 w-100 h-100 ">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
