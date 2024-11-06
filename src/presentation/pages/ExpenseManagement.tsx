
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Expense } from "../../domain/models/Expense";
import ExpenseFilter from "../components/ExpenseFilters";
import { RootState } from "../../application/redux/store";
import ExpenseTable from "../components/ExpenseTable";

const HomePage: React.FC = () => {
  const expenses = useSelector((state: RootState) => state.expenses.list);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>(expenses);
  const [filters, setFilters] = useState({
    category: "",
    startDate: "",
    endDate: "",
  });

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

  return (
    <div className="homepage">
      <ExpenseFilter onFilterChange={handleFilterChange} />
      <ExpenseTable expenses={filteredExpenses} />
    </div>
  );
};

export default HomePage;
