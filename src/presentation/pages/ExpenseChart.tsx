import React from "react";
import ExpenseBarChart from "../components/ExpenseBarChart";
import { useSelector } from "react-redux";
import { RootState } from "../../application/redux/store";
import ExpenseSummary from "../components/ExpenseSummary";

const ExpenseChart: React.FC = () => {
  const expenses = useSelector((state: RootState) => state.expenses.list);

  return (
    <div className="homepage">
      <ExpenseSummary expenses={expenses} />
      <ExpenseBarChart expenses={expenses} />
    </div>
  );
};

export default ExpenseChart;
