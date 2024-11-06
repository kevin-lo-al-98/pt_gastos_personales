import React from "react";
import ExpenseForm from "../components/ExpenseForm";
import { useNavigate } from "react-router-dom";

const AddExpensePage: React.FC = () => {
  const navigate = useNavigate();

  const backPage = () => {
    navigate("/");
  };

  return (
    <div>
      <button onClick={backPage}>Regresar</button>
      <h2>Agregar Gasto</h2>
      <ExpenseForm />
    </div>
  );
};

export default AddExpensePage;
