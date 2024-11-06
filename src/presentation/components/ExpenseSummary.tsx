import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../application/redux/store";

const ExpenseSummary: React.FC = () => {
  const expensesList = useSelector((state: RootState) => state.expenses.list);

  // Calcular el gasto total
  const totalAmount = expensesList.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  // Calcular el gasto total por categoría
  const amountByCategory = expensesList.reduce((acc, expense) => {
    if (acc[expense.category]) {
      acc[expense.category] += expense.amount;
    } else {
      acc[expense.category] = expense.amount;
    }
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="mb-4">
      <h3>Resumen</h3>
      <p>
        <strong>Gasto Total:</strong> ${totalAmount}
      </p>

      <h5>Categorías</h5>
      <ul className="d-flex flex-wrap p-0 gap-3">
        {Object.entries(amountByCategory).map(([category, amount]) => (
          <div
            className="d-inline-flex p-1 shadow-sm border rounded-1 border-primary"
            key={category}
          >
            {category}: ${amount}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseSummary;
