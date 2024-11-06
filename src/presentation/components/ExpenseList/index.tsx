import React, { useState, Suspense } from "react";
import { Expense } from "../../../domain/models/Expense";

interface ExpenseSummaryProps {
  expenses: Expense[];
}
// Cargar ExpenseDetail de forma diferida
const LazyExpenseDetail = React.lazy(() => import("./ExpenseDetail"));

const ExpenseList: React.FC<ExpenseSummaryProps> = ({ expenses }) => {
  const [openExpenseId, setOpenExpenseId] = useState<number | null>(null);

  const toggleCollapse = (id: number) => {
    setOpenExpenseId(openExpenseId === id ? null : id);
  };

  return (
    <div className="list-container overflow-auto">
      <h3>Lista de gastos</h3>
      <ul className="list-group">
        {expenses.map((expense, index) => (
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
