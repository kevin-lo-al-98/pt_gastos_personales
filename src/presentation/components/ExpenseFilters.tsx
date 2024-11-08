import React, { useState } from "react";
import { EXPENSE_CATEGORIES } from "../../domain/constants/constants";
import DatePickerDialog from "./DatePicker/DatePickerDialog";

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

  const handleStartDateChange = (date: string) => {
    setStartDate(date);
    onFilterChange({ category, startDate: date, endDate });
  };

  const handleEndDateChange = (date: string) => {
    setEndDate(date);
    onFilterChange({ category, startDate, endDate: date });
  };

  return (
    <div className="d-flex flex-wrap gap-2 mb-3">
      <select
        className="form-select w-auto"
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
      <div className="d-flex column-gap-2">
        <DatePickerDialog
          selectedDate={startDate}
          onDateChange={handleStartDateChange}
        />
        <DatePickerDialog
          selectedDate={endDate}
          onDateChange={handleEndDateChange}
        />
      </div>
    </div>
  );
};

export default ExpenseFilter;
