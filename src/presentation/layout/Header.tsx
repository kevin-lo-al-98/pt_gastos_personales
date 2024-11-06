import React from "react";
import { useSidebar } from "../hooks/SidebarContext";
import { FaBars } from "react-icons/fa";

const Header: React.FC = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <nav className="navbar p-3 shadow-sm">
      <div className="container-fluid">
        <button className="btn btn-link text-dark" onClick={toggleSidebar}>
          <FaBars size={24} />
        </button>
        <a className="navbar-brand" href="#">
          Aplicación de gastos
        </a>
      </div>
    </nav>
  );
};

export default Header;
