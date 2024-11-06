import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  addExpense,
  selectExpensesSlice,
  updateExpenseThunk
} from "../../application/redux/slices/expensesSlice";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { EXPENSE_CATEGORIES } from "../../domain/constants/constants";
import { useAppDispatch } from "../../application/hooks/useAppDispatch";
import { Expense } from "../../domain/models/Expense";

interface ExpenseFormProps {
  expense?: {
    id: number;
    amount: number;
    category: string;
    date: string;
    description?: string;
  };
}
const schema = yup.object().shape({
  amount: yup
    .number()
    .required("Este es un campo obligatorio.")
    .typeError("Este campo es incorrecto"),
  category: yup
    .string()
    .required("Este es un campo obligatorio.")
    .typeError("Este campo es incorrecto"),
  date: yup
    .string()
    .required("Este es un campo obligatorio.")
    .typeError("Este campo es incorrecto"),
});

const ExpenseForm: React.FC<ExpenseFormProps> = () => {
  const { expenseSelected, list } = useSelector(selectExpensesSlice);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: expenseSelected || {
      amount: "",
      category: "",
      date: "",
      description: "",
    },
    resolver: yupResolver(schema),
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const lastId: number = useMemo(() => {
    const orderList = [...list].sort((a, b) => a.id - b.id);
    return (orderList.length && orderList[0]?.id) || 0;
  }, [list]);

  const onSubmit = (data: Expense) => {
    console.log(data);

    if (expenseSelected) {
      dispatch(updateExpenseThunk({ ...data, id: expenseSelected.id }));
    } else {
      dispatch(addExpense({ ...data, id: lastId + 1 }));
    }
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-3">
      <div className="mb-3">
        <label htmlFor="amount">Monto del gasto</label>
        <input
          id="amount"
          type="number"
          className="form-control"
          {...register("amount", {
            required: true,
            min: 0,
          })}
        />
        {errors.amount && (
          <p className="text-danger">Monto es requerido y debe ser positivo</p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="category">Categoría</label>
        <select
          id="category"
          className="form-control"
          {...register("category", { required: true })}
        >
          <option value="">Selecciona una categoría</option>
          {EXPENSE_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-danger">La categoría es requerida</p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="date">Fecha del gasto</label>
        <input
          id="date"
          type="date"
          className="form-control"
          {...register("date", { required: true })}
        />
        {errors.date && <p className="text-danger">La fecha es requerida</p>}
      </div>

      <div className="mb-3">
        <label htmlFor="description">Descripción</label>
        <input
          id="description"
          type="text"
          className="form-control"
          {...register("description")}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        {expenseSelected ? "Actualizar Gasto" : "Agregar Gasto"}
      </button>
    </form>
  );
};

export default ExpenseForm;
