import React from "react";
import { useSidebar } from "../hooks/SidebarContext";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { ROUTES_NAVIGATION } from "../../domain/constants/constants";

const Header: React.FC = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <nav className="navbar-header navbar p-3 shadow-sm">
      <div className="container-fluid">
        <div className="w-auto d-flex justify-content-end">
          <button
            className="btn btn-link text-white rounded-1 w-auto "
            onClick={toggleSidebar}
          >
            <FaBars size={26} />
          </button>
        </div>
        <NavLink
          className="navbar-brand text-light"
          to={ROUTES_NAVIGATION.HOME}
        >
          Aplicación de gastos
        </NavLink>
      </div>
    </nav>
  );
};

export default Header;
