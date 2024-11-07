import React, { useMemo } from "react";
import { Expense } from "../../domain/models/Expense";

interface ExpenseSummaryProps {
  expenses: Expense[];
}

const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({ expenses }) => {
  // Calcular el total de gastos
  const totalAmount = useMemo(() => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [expenses]);

  // Agrupar gastos por categoría y sumar los montos
  const expensesByCategory = useMemo(() => {
    return expenses.reduce((acc, expense) => {
      if (!acc[expense.category]) {
        acc[expense.category] = expense.amount;
      } else {
        acc[expense.category] += expense.amount;
      }
      return acc;
    }, {} as Record<string, number>);
  }, [expenses]);

  return (
    <div className="expense-summary card p-3 mb-3">
      <h4 className="text-center">Resumen de Gastos</h4>
      <p className="text-center m-0 fw-bold">Total: ${totalAmount.toFixed(2)}</p>
      
      <ul className="list-group mt-3">
        {Object.entries(expensesByCategory).map(([category, amount]) => (
          <li key={category} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{category}</span>
            <span className="fw-bold">${amount.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseSummary;
