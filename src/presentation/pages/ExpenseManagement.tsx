import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Expense } from "../../domain/models/Expense";
import ExpenseFilter from "../components/ExpenseFilters";
import { RootState } from "../../application/redux/store";
import ExpenseTable from "../components/ExpenseTable";
import { MdAdd } from "react-icons/md";
import { ROUTES_NAVIGATION } from "../../domain/constants/constants";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../application/hooks/useAppDispatch";
import { fetchExpenses } from "../../application/redux/slices/expensesSlice";

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const expenses = useSelector((state: RootState) => state.expenses.list);
  const navigate = useNavigate();
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
  const goToPage = () => {
    navigate(`/${ROUTES_NAVIGATION.ADD_EXPENSE}`); // Redirige a HomePage tras agregar el gasto
  };
  return (
    <div className="w-100 h-100  ">
      <div className="p-3 d-flex w-100 align-items-center justify-content-end">
        <button onClick={goToPage}>
          <div className="d-flex align-items-center column-gap-1">
            <MdAdd size={24} />
            <span>Añadir Gasto</span>
          </div>
        </button>
      </div>
      <ExpenseFilter onFilterChange={handleFilterChange} />
      <ExpenseTable expenses={filteredExpenses} enableActions={true} />
    </div>
  );
};

export default HomePage;
