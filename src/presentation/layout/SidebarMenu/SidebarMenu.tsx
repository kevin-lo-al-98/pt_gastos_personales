import React from "react";
import { NavLink } from "react-router-dom";
import { useSidebar } from "../../hooks/SidebarContext";
import { FaBars, FaHome } from "react-icons/fa";
import { GiCash } from "react-icons/gi";
import { IoBarChartSharp } from "react-icons/io5";
import "./SidebarMenu.css";
import { ROUTES_NAVIGATION } from "../../../domain/constants/constants";

const SidebarMenu: React.FC = () => {
  const { isOpen, toggleSidebar } = useSidebar();
  const classNameActive = ({ isActive }: { isActive: boolean }) => {
    return `text-decoration-none list-group-item ${
      isActive ? "bg-primary text-white" : "bg-light text-secondary"
    }`;
  };
  return (
    <div
      className={`sidebar-menu bg-light bg-gradient ${isOpen ? "open" : ""}`}
    >
      <div className="p-3 w-auto d-flex justify-content-end">
        <button
          className="btn btn-link  rounded-1 w-auto "
          onClick={toggleSidebar}
        >
          <FaBars size={26} />
        </button>
      </div>
      <div className={`menu-content p-0 ${isOpen ? "d-block" : "d-none"}`}>
        <ul className="list-group list-group-flush">
          <NavLink
            to={ROUTES_NAVIGATION.HOME}
            className={classNameActive}
            onClick={toggleSidebar}
          >
            <div className="d-flex column-gap-3">
              <FaHome size={20} />
              <span>Inicio</span>
            </div>
          </NavLink>
          <NavLink
            to={`/${ROUTES_NAVIGATION.EXPENSES_MANAGEMENT}`}
            className={classNameActive}
            onClick={toggleSidebar}
          >
            <div className="d-flex column-gap-3">
              <GiCash size={20} />
              <span>Gestión de gastos</span>
            </div>
          </NavLink>
          <NavLink
            to={`/${ROUTES_NAVIGATION.EXPENSES_CHART}`}
            className={classNameActive}
            onClick={toggleSidebar}
          >
            <div className="d-flex column-gap-3">
              <IoBarChartSharp size={20} />
              <span>Gráfica de gastos</span>
            </div>
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default SidebarMenu;
