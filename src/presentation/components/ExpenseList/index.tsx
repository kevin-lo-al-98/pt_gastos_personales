import React, { useState, Suspense } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../application/redux/store";
import ExpenseFilters from "../ExpenseFilters";
import dayjs from "dayjs";

// Cargar ExpenseDetail de forma diferida
const LazyExpenseDetail = React.lazy(() => import("./ExpenseDetail"));

const ExpenseList: React.FC = () => {
  const expensesList = useSelector((state: RootState) => state.expenses.list);
  const [openExpenseId, setOpenExpenseId] = useState<number | null>(null);

  // Estado para los filtros
  const [expensesFilters, setExpensesFilters] = useState({
    category: "",
    startDate: "",
    endDate: "",
  });

  const toggleCollapse = (id: number) => {
    setOpenExpenseId(openExpenseId === id ? null : id);
  };

  // Función para actualizar el estado de los filtros
  const handleFilterChange = (filters: {
    category: string;
    startDate: string;
    endDate: string;
  }) => {
    setExpensesFilters(filters);
  };

  // Filtrar la lista de gastos según los filtros seleccionados
  const filteredExpenses = expensesList.filter((expense) => {
    const expenseDate = dayjs(expense.date);
    const startDate = dayjs(expensesFilters.startDate);
    const endDate = dayjs(expensesFilters.endDate);
    const isCategoryMatch = expensesFilters.category
      ? expense.category === expensesFilters.category
      : true;
    const isStartDateMatch = expensesFilters.startDate
      ? startDate.isSameOrAfter(expenseDate, "day")
      : true;
    const isEndDateMatch = expensesFilters.endDate
      ? endDate.isSameOrBefore(expenseDate, "day")
      : true;
    return isCategoryMatch && isStartDateMatch && isEndDateMatch;
  });

  return (
    <div className="list-container overflow-auto">
      <h3>Filtrar Gastos</h3>

      {/* Componente de filtros */}
      <ExpenseFilters onFilterChange={handleFilterChange} />

      <ul className="list-group">
        {filteredExpenses.map((expense, index) => (
          <li key={`${expense.id}-${index}`} className="list-group-item">
            <div className="d-flex justify-content-between align-items-center border-bottom">
              <div className="">
                <button
                  className="btn btn-link p-0"
                  onClick={() => toggleCollapse(expense.id)}
                >
                  {openExpenseId === expense.id ? "▼" : "▶"} {expense.category}
                </button>
              </div>
              <div className="w-auto d-flex column-gap-3">
                <div className=" ">
                  <strong>{expense.date}</strong>
                </div>
                <div className="">
                  <strong>${expense.amount}</strong>
                </div>
              </div>
            </div>

            {/* Colapso con carga diferida */}
            {openExpenseId === expense.id && (
              <Suspense fallback={<div>Cargando detalles...</div>}>
                <LazyExpenseDetail expense={expense} />
              </Suspense>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
