import React, { useState } from "react";
import { EXPENSE_CATEGORIES } from "../../domain/constants/constants";

interface ExpenseFilterProps {
  onFilterChange: (filters: {
    category: string;
    startDate: string;
    endDate: string;
  }) => void;
}

const ExpenseFilter: React.FC<ExpenseFilterProps> = ({ onFilterChange }) => {
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategory(event.target.value);
    onFilterChange({ category: event.target.value, startDate, endDate });
  };

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStartDate(event.target.value);
    onFilterChange({ category, startDate: event.target.value, endDate });
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
    onFilterChange({ category, startDate, endDate: event.target.value });
  };

  return (
    <div className="expense-filter d-flex gap-2 mb-3">
      <select
        className="form-select"
        value={category}
        onChange={handleCategoryChange}
      >
        <option value="">Todas las Categorías</option>
        {EXPENSE_CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <input
        type="date"
        className="form-control"
        value={startDate}
        onChange={handleStartDateChange}
        placeholder="Fecha de inicio"
      />
      <input
        type="date"
        className="form-control"
        value={endDate}
        onChange={handleEndDateChange}
        placeholder="Fecha de fin"
      />
    </div>
  );
};

export default ExpenseFilter;
