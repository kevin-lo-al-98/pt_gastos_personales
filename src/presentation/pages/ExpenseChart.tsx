import React, { useEffect } from "react";
import ExpenseBarChart from "../components/ExpenseBarChart";
import { useSelector } from "react-redux";
import { RootState } from "../../application/redux/store";
import ExpenseSummary from "../components/ExpenseSummary";
import { useAppDispatch } from "../../application/hooks/useAppDispatch";
import { fetchExpenses } from "../../application/redux/slices/expensesSlice";

const ExpenseChart: React.FC = () => {
  const dispatch = useAppDispatch();
  const expenses = useSelector((state: RootState) => state.expenses.list);

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  return (
    <div className="w-100 h-100">
      <ExpenseSummary expenses={expenses} />
      <ExpenseBarChart expenses={expenses} />
    </div>
  );
};

export default ExpenseChart;
