import React, { useState } from "react";
import { EXPENSE_CATEGORIES } from "../../domain/constants/constants";
interface ExpenseFiltersProps {
  onFilterChange: (filters: {
    category: string;
    startDate: string;
    endDate: string;
  }) => void;
}

const ExpenseFilters: React.FC<ExpenseFiltersProps> = ({ onFilterChange }) => {
  const [category, setCategory] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    onFilterChange({ category: newCategory, startDate, endDate });
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);
    onFilterChange({ category, startDate: newStartDate, endDate });
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = e.target.value;
    setEndDate(newEndDate);
    onFilterChange({ category, startDate, endDate: newEndDate });
  };

  return (
    <div className="filter-controls mb-3 d-flex flex-column flex-md-row align-items-md-center gap-3">
      {/* Filtro por categoría */}
      <div>
        <label htmlFor="categoryFilter" className="form-label">
          Categoría:
        </label>
        <select
          id="categoryFilter"
          className="form-select"
          value={category}
          onChange={handleCategoryChange}
        >
          <option value="">Todas</option>
          {EXPENSE_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
          {/* Agrega más opciones según las categorías disponibles */}
        </select>
      </div>

      {/* Filtro por rango de fechas */}
      <div>
        <label htmlFor="startDate" className="form-label">
          Fecha Inicio:
        </label>
        <input
          type="date"
          id="startDate"
          className="form-control"
          value={startDate}
          onChange={handleStartDateChange}
        />
      </div>
      <div>
        <label htmlFor="endDate" className="form-label">
          Fecha Fin:
        </label>
        <input
          type="date"
          id="endDate"
          className="form-control"
          value={endDate}
          onChange={handleEndDateChange}
        />
      </div>
    </div>
  );
};

export default ExpenseFilters;
