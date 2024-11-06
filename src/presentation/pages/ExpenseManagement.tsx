import { useEffect } from "react";
import ExpenseList from "../components/ExpenseTable.tsx";
import { useNavigate } from "react-router-dom";
import { fetchExpenses } from "../../application/redux/slices/expensesSlice.ts";
import { useAppDispatch } from "../../application/hooks/useAppDispatch.ts";

const ExpenseManagement = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  const goAddExpense = () => {
    navigate("/add-expense");
  };

  return (
    <div className="w-100 h-100">
      <button onClick={goAddExpense}>Añadir</button>
      <ExpenseList />
    </div>
  );
};

export default ExpenseManagement;
