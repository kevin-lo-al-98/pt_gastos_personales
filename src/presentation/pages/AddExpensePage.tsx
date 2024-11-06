import React from "react";
import ExpenseForm from "../components/ExpenseForm";
import { addExpense } from "../../application/redux/slices/expensesSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../application/hooks/useAppDispatch";
import { Expense } from "../../domain/models/Expense";
import { ROUTES_NAVIGATION } from "../../domain/constants/constants";

const AddExpensePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleAddExpense = (expenseData: Expense) => {
    dispatch(addExpense(expenseData));
    navigate(ROUTES_NAVIGATION.EXPENSES_MANAGEMENT); // Redirige a HomePage tras agregar el gasto
  };
  const backPage = () => {
    navigate(ROUTES_NAVIGATION.EXPENSES_MANAGEMENT); // Redirige a HomePage tras agregar el gasto
  };
  return (
    <div className="container">
      <button onClick={backPage}>Regresar</button>
      <h2>Agregar Gasto</h2>
      <ExpenseForm onSubmit={handleAddExpense} />
    </div>
  );
};

export default AddExpensePage;
