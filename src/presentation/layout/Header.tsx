import React from "react";

const Header: React.FC = () => {
  return (
    <nav className="navbar p-3 shadow-sm">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Aplicación de gastos
        </a>
      </div>
    </nav>
  );
};

export default Header;
