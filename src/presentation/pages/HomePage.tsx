import React, { useState, useEffect } from "react";
import ExpenseTable from "../components/ExpenseTable";
import { useSelector } from "react-redux";
import { Expense } from "../../domain/models/Expense";
import ExpenseFilter from "../components/ExpenseFilters";
import { RootState } from "../../application/redux/store";
import ExpenseSummary from "../components/ExpenseSummary";
import { useAppDispatch } from "../../application/hooks/useAppDispatch";
import { fetchExpenses } from "../../application/redux/slices/expensesSlice";

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list: expenses, loading } = useSelector(
    (state: RootState) => state.expenses
  );
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>(expenses);
  const [filters, setFilters] = useState({
    category: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  useEffect(() => {
    setFilteredExpenses(
      expenses.filter((expense) => {
        const matchesCategory = filters.category
          ? expense.category === filters.category
          : true;
        const matchesStartDate = filters.startDate
          ? new Date(expense.date) >= new Date(filters.startDate)
          : true;
        const matchesEndDate = filters.endDate
          ? new Date(expense.date) <= new Date(filters.endDate)
          : true;
        return matchesCategory && matchesStartDate && matchesEndDate;
      })
    );
  }, [expenses, filters]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  if (loading === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-100 h-100  ">
      <ExpenseSummary expenses={expenses} />
      <ExpenseFilter onFilterChange={handleFilterChange} />
      <ExpenseTable expenses={filteredExpenses} enableActions={false} />
    </div>
  );
};

export default HomePage;
