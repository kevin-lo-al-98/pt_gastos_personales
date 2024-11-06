import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../application/redux/store";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const ExpensePieChart: React.FC = () => {
  const expensesList = useSelector((state: RootState) => state.expenses.list);

  // Agrupar los gastos por categoría
  const data = Object.entries(
    expensesList.reduce((acc, expense) => {
      if (acc[expense.category]) {
        acc[expense.category] += expense.amount;
      } else {
        acc[expense.category] = expense.amount;
      }
      return acc;
    }, {} as Record<string, number>)
  ).map(([category, amount]) => ({
    name: category,
    value: amount,
  }));

  // Colores para las categorías
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="mb-4">
      <PieChart width={400} height={250}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default ExpensePieChart;
