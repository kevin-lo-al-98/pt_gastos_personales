import React from "react";
import { Link } from "react-router-dom";
import { useSidebar } from "../../hooks/SidebarContext";
import { FaBars } from "react-icons/fa";
import "./SidebarMenu.css";
import { ROUTES_NAVIGATION } from "../../../domain/constants/constants";
const SidebarMenu: React.FC = () => {
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <div className={`sidebar-menu ${isOpen ? "open" : ""}`}>
      <button className="btn btn-primary toggle-button" onClick={toggleSidebar}>
        <FaBars size={24} />
      </button>
      <div className={`menu-content p-0 ${isOpen ? "d-block" : "d-none"}`}>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <Link to={ROUTES_NAVIGATION.HOME} className="text-decoration-none">
              Inicio
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              to={`/${ROUTES_NAVIGATION.EXPENSES_MANAGEMENT}`}
              className="text-decoration-none"
            >
              Gestión de gastos
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarMenu;
