import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import { Expense } from "../../../domain/models/Expense";

interface ExpenseBarChartProps {
  expenses: Expense[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const ExpenseBarChart: React.FC<ExpenseBarChartProps> = ({ expenses }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Función para actualizar el estado según el ancho de la pantalla
  const updateLayout = () => {
    setIsMobile(window.innerWidth < 768);
  };

  // useEffect para escuchar cambios en el tamaño de la ventana
  useEffect(() => {
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  // Calcular el total por categoría
  const categoryTotals = expenses.reduce<{ [key: string]: number }>(
    (acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    },
    {}
  );

  const data = Object.keys(categoryTotals).map((category) => ({
    name: category,
    value: categoryTotals[category],
  }));

  return (
    <div className="expense-summary">
      <h4>Total de Gastos por Categoría</h4>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          layout={isMobile ? "vertical" : "horizontal"}
          barCategoryGap="20%"
          className="bar-chart"
        >
          {isMobile ? (
            <>
              {/* En modo vertical, ocultamos las etiquetas del eje Y */}
              <YAxis type="category" dataKey="name" tick={false} width={0} />
              <XAxis type="number" />
            </>
          ) : (
            <>
              <XAxis dataKey="name" />
              <YAxis />
            </>
          )}
          <Tooltip />

          <Bar dataKey="value" fill="#8884d8">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
            {/* Mostrar el nombre de la categoría encima de cada barra */}
            {isMobile && (
              <LabelList dataKey="name" position="top" fill="#333" />
            )}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseBarChart;
