import { useEffect } from "react";
import ExpenseSummary from "../components/ExpenseSummary.tsx";
import ExpensePieChart from "../components/ExpensePieChart.tsx";
import ExpenseList from "../components/ExpenseList/index.tsx";
import { fetchExpenses } from "../../application/redux/slices/expensesSlice.ts";
import { useAppDispatch } from "../../application/hooks/useAppDispatch.ts";

const HomePage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  return (
    <div className="w-auto h-auto">
      <ExpenseSummary />
      <ExpensePieChart />
      <ExpenseList />
    </div>
  );
};

export default HomePage;
