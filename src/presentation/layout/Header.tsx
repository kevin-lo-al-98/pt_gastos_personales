import React from "react";
import { useSidebar } from "../hooks/SidebarContext";
import { FaBars } from "react-icons/fa";

const Header: React.FC = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <nav className="navbar p-3 shadow-sm">
      <div className="container-fluid">
        <div className="w-auto d-flex justify-content-end">
          <button className="btn btn-primary  rounded-1 toggle-button" onClick={toggleSidebar}>
            <FaBars size={24} />
          </button>
        </div>
        <a className="navbar-brand" href="#">
          Aplicación de gastos
        </a>
      </div>
    </nav>
  );
};

export default Header;
