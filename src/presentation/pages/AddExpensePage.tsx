import React from "react";
import ExpenseForm from "../components/ExpenseForm";
import { addExpense } from "../../application/redux/slices/expensesSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../application/hooks/useAppDispatch";
import { Expense } from "../../domain/models/Expense";
import { ROUTES_NAVIGATION } from "../../domain/constants/constants";
import { MdArrowBackIos } from "react-icons/md";
import Swal from "sweetalert2";

const AddExpensePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleAddExpense = async (expenseData: Expense) => {
    try {
      await dispatch(addExpense(expenseData)).unwrap();

      Swal.fire({
        title: "Gasto agregado",
        text: "El gasto se ha agregado exitosamente.",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al agregar el gasto. Por favor, inténtalo de nuevo.",
        icon: "error",
        confirmButtonColor: "#d33",
        confirmButtonText: "OK",
      });
    }
  };
  const backPage = () => {
    navigate(`/${ROUTES_NAVIGATION.EXPENSES_MANAGEMENT}`);
  };
  return (
    <div className="container">
      <button onClick={backPage}>
        <div className="d-flex align-items-center column-gap-1">
          <MdArrowBackIos size={16} />
          <span>Regresar</span>
        </div>
      </button>
      <h2>Agregar Gasto</h2>
      <ExpenseForm onSubmit={handleAddExpense} />
    </div>
  );
};

export default AddExpensePage;
