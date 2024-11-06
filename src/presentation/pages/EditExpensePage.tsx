import React from "react";
import { useNavigate } from "react-router-dom";
import ExpenseForm from "../components/ExpenseForm";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../application/hooks/useAppDispatch";
import {
  selectExpensesSlice,
  updateExpenseThunk,
} from "../../application/redux/slices/expensesSlice";
import { Expense } from "../../domain/models/Expense";
import { ROUTES_NAVIGATION } from "../../domain/constants/constants";

const EditExpensePage: React.FC = () => {
  const { expenseSelected } = useSelector(selectExpensesSlice);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (!expenseSelected) {
    return <p>Gasto no encontrado</p>;
  }

  const handleUpdateExpense = (updatedExpenseData: Expense) => {
    dispatch(
      updateExpenseThunk({
        expense: updatedExpenseData,
        id: expenseSelected.id,
      })
    );
    navigate("/"); // Redirige a HomePage tras editar el gasto
  };

  const backPage = () => {
    navigate(ROUTES_NAVIGATION.EXPENSES_MANAGEMENT); // Redirige a HomePage tras agregar el gasto
  };

  return (
    <div className="container">
      <button onClick={backPage}>Regresar</button>
      <h2>Editar Gasto</h2>
      <ExpenseForm onSubmit={handleUpdateExpense} />
    </div>
  );
};

export default EditExpensePage;
