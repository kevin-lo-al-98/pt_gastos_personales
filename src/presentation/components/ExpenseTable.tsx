import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../application/redux/store";
import {
  deleteExpenseThunk,
  setExpenseSelected,
} from "../../application/redux/slices/expensesSlice";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import ExpenseFilters from "./ExpenseFilters";
import { Expense } from "../../domain/models/Expense";
import { useAppDispatch } from "../../application/hooks/useAppDispatch";

const ExpenseList: React.FC = () => {
  const expensesList = useSelector((state: RootState) => state.expenses.list);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // Estado para los filtros
  const [expensesFilters, setExpensesFilters] = useState({
    category: "",
    startDate: "",
    endDate: "",
  });
  const handleEdit = (expense: Expense) => {
    dispatch(setExpenseSelected(expense));

    navigate("/edit-expense");
  };

  const handleDelete = (id: number) => {
    dispatch(deleteExpenseThunk(id));
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
    <div>
      {/* Componente de filtros */}
      <ExpenseFilters onFilterChange={handleFilterChange} />
      <div className="table-responsive">
        <table className="table table-sm table-hover">
          <thead>
            <tr>
              <th>Monto</th>
              <th>Categoría</th>
              <th>Fecha</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className="overflow-auto">
            {filteredExpenses.map((expense) => (
              <tr key={expense.id}>
                <td>${expense.amount}</td>
                <td>
                  <div className="">{expense.category}</div>
                </td>
                <td>{expense.date}</td>
                <td>{expense.description || "N/A"}</td>
                <td>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => handleEdit(expense)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(expense.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseList;
