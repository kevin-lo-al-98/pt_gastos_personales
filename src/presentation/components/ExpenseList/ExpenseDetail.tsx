import React from "react";
import { Expense } from "../../../store/slices/expensesSlice";

interface ExpenseDetailProps {
  expense: Expense;
}

const ExpenseDetail: React.FC<ExpenseDetailProps> = ({ expense }) => {
  return (
    <div className="pt-2">
      <p>
        <strong>Categoría:</strong> {expense.category}
      </p>
      <p>
        <strong>Fecha:</strong> {expense.date}
      </p>
      <p>
        <strong>Monto:</strong> ${expense.amount}
      </p>
      <p>
        <strong>Descripción:</strong> {expense.description || "N/A"}
      </p>
    </div>
  );
};

export default ExpenseDetail;
