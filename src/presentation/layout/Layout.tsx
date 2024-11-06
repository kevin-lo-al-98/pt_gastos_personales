import React from "react";
import { Outlet } from "react-router-dom";
// import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      {/* Sidebar Desplegable */}
      {/* <Sidebar /> */}
      {/* Header Fijo */}
      <Header />

      {/* Contenido Principal */}
      <main className="p-2 w-100 h-100 overflow-auto">
        <Outlet /> {/* Renderiza el contenido de la página actual */}
      </main>
    </div>
  );
};

export default Layout;
