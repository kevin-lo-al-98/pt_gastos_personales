import React, { useEffect } from "react";
import ExpenseForm from "../components/ExpenseForm";
import { useNavigate } from "react-router-dom";
import { setExpenseSelected } from "../../application/redux/slices/expensesSlice";
import { useAppDispatch } from "../../application/hooks/useAppDispatch";
const EditExpensePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const backPage = () => {
    navigate("/");
  };
  useEffect(() => {
    return () => {
      dispatch(setExpenseSelected(null));
    };
  }, [dispatch]);

  return (
    <div>
      <button onClick={backPage}>Regresar</button>
      <h2>Editar Gasto</h2>
      <ExpenseForm />
    </div>
  );
};

export default EditExpensePage;
