import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div className="bg-light sidebar p-3">
      <h5>Gastos Personales</h5>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Ver Gastos
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/add-expense">
            Agregar Gasto
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
