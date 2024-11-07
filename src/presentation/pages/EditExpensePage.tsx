import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ExpenseForm from "../components/ExpenseForm";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../application/hooks/useAppDispatch";
import {
  selectExpensesSlice,
  resetExpenseSelected,
  updateExpenseThunk,
} from "../../application/redux/slices/expensesSlice";
import { Expense } from "../../domain/models/Expense";
import { ROUTES_NAVIGATION } from "../../domain/constants/constants";
import { MdArrowBackIos } from "react-icons/md";

const EditExpensePage: React.FC = () => {
  const { expenseSelected } = useSelector(selectExpensesSlice);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      dispatch(resetExpenseSelected());
    };
  }, [dispatch]);

  // Redireccionar si no se encuentra el gasto seleccionado
  useEffect(() => {
    if (!expenseSelected) {
      navigate(`/${ROUTES_NAVIGATION.EXPENSES_MANAGEMENT}`);
    }
  }, [expenseSelected, navigate]);

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
    navigate(`/${ROUTES_NAVIGATION.EXPENSES_MANAGEMENT}`); // Redirige a HomePage tras editar el gasto
  };

  const backPage = () => {
    navigate(`/${ROUTES_NAVIGATION.EXPENSES_MANAGEMENT}`); // Redirige a HomePage tras agregar el gasto
  };

  return (
    <div className="container">
      <button onClick={backPage}>
        <div className="d-flex align-items-center column-gap-1">
          <MdArrowBackIos size={16} />
          <span>Regresar</span>
        </div>
      </button>
      <h2>Editar Gasto</h2>
      <ExpenseForm onSubmit={handleUpdateExpense} />
    </div>
  );
};

export default EditExpensePage;
