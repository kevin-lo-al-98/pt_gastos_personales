import React from "react";
import {
  deleteExpenseThunk,
  setExpenseSelected,
} from "../../application/redux/slices/expensesSlice";
import { useNavigate } from "react-router-dom";
import { Expense } from "../../domain/models/Expense";
import { useAppDispatch } from "../../application/hooks/useAppDispatch";
import Swal from "sweetalert2";

interface ExpenseSummaryProps {
  expenses: Expense[];
  enableActions: boolean;
}

const ExpenseTable: React.FC<ExpenseSummaryProps> = ({
  expenses,
  enableActions,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleEdit = (expense: Expense) => {
    dispatch(setExpenseSelected(expense));
    navigate("/edit-expense");
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás deshacer esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteExpenseThunk(id));
        Swal.fire({
          title: "Eliminado",
          text: "El gasto ha sido eliminado exitosamente.",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
      }
    });
  };
  return (
    <div className="table-responsive w-100">
      <table className="table table-sm table-hover w-100">
        <thead className="table-light">
          <tr>
            <th>Monto</th>
            <th>Categoría</th>
            <th>Fecha</th>
            <th>Descripción</th>
            {enableActions && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody className="  w-100" style={{ height: "400px" }}>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td className="fw-bold">${expense.amount}</td>
              <td>
                <div className="d-flex align-content-stretch  align-items-center">
                  {expense.category}
                </div>
              </td>
              <td>
                <div style={{ minWidth: "100px" }}>{expense.date}</div>
              </td>
              <td>{expense.description || "N/A"}</td>
              {enableActions && (
                <td>
                  <div className="d-flex flex-column flex-md-row gap-2">
                    <button
                      className="btn btn-md btn-warning"
                      onClick={() => handleEdit(expense)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-md btn-danger"
                      onClick={() => handleDelete(expense.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;
