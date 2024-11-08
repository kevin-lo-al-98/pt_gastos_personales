import React, { useState, useEffect } from "react";
import ExpenseTable from "../components/ExpenseTable";
import { useSelector } from "react-redux";
import { Expense } from "../../domain/models/Expense";
import ExpenseFilter from "../components/ExpenseFilters";
import { RootState } from "../../application/redux/store";
import ExpenseSummary from "../components/ExpenseSummary";
import { useAppDispatch } from "../../application/hooks/useAppDispatch";
import { fetchExpenses } from "../../application/redux/slices/expensesSlice";
import dayjs from "dayjs";

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const expenses = useSelector((state: RootState) => state.expenses.list);
  const loading = useSelector((state: RootState) => state.expenses.loading);

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
        const matchesStartDate = dayjs(expense.date).isSameOrBefore(
          filters.startDate
        );
        const matchesEndDate = dayjs(filters.startDate).isSameOrAfter(
          filters.endDate
        );
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
