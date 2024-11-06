import React from "react";
import {
  deleteExpenseThunk,
  setExpenseSelected,
} from "../../application/redux/slices/expensesSlice";
import { useNavigate } from "react-router-dom";
import { Expense } from "../../domain/models/Expense";
import { useAppDispatch } from "../../application/hooks/useAppDispatch";

interface ExpenseSummaryProps {
  expenses: Expense[];
}
const ExpenseTable: React.FC<ExpenseSummaryProps> = ({ expenses }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleEdit = (expense: Expense) => {
    dispatch(setExpenseSelected(expense));

    navigate("/edit-expense");
  };

  const handleDelete = (id: number) => {
    dispatch(deleteExpenseThunk(id));
  };
  return (
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
          {expenses.map((expense) => (
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
  );
};

export default ExpenseTable;
