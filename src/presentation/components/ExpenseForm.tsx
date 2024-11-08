import React, { useMemo } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectExpensesSlice } from "../../application/redux/slices/expensesSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { EXPENSE_CATEGORIES } from "../../domain/constants/constants";
import { Expense } from "../../domain/models/Expense";
import DatePickerDialog from "./DatePicker/DatePickerDialog";

interface ExpenseFormProps {
  onSubmit: (expenseData: Expense) => void;
}

const schema = yup.object({
  amount: yup
    .number()
    .required("Este es un campo obligatorio.")
    .min(1, "El monto debe ser mayor a cero")
    .typeError("Este campo es incorrecto"),

  category: yup
    .string()
    .required("Este es un campo obligatorio.")
    .typeError("Este campo es incorrecto"),
  date: yup
    .string()
    .required("Este es un campo obligatorio.")
    .typeError("Este campo es incorrecto"),
  description: yup.string().typeError("Este campo es incorrecto"),
});
type FormValues = yup.InferType<typeof schema>;

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onSubmit }) => {
  const { expenseSelected, list } = useSelector(selectExpensesSlice);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: expenseSelected || {
      amount: 0,
      category: "",
      date: "",
      description: "",
    },
    resolver: yupResolver(schema),
  });

  const lastId: number = useMemo(() => {
    const orderList = [...list].sort((a, b) => b.id - a.id);
    return orderList.length > 0 ? orderList[0].id : 0;
  }, [list]);

  const onSubmitForm: SubmitHandler<FormValues> = (data) => {
    console.log(data);

    const id = expenseSelected?.id || lastId + 1;
    const expenseData: Expense = {
      ...data,
      id,
    };
    onSubmit(expenseData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="p-3 ">
      <div className="mb-3">
        <label htmlFor="amount">Monto del gasto</label>
        <input
          id="amount"
          type="number"
          className="form-control"
          {...register("amount")}
          onFocus={(event) => event.target.select()}
        />
        {errors.amount && (
          <p className="text-danger">{errors?.amount?.message || ""}</p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="category">Categoría</label>
        <select
          id="category"
          className="form-control"
          {...register("category")}
        >
          <option value="">Selecciona una categoría</option>
          {EXPENSE_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-danger">{errors?.category?.message || ""}</p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="date">Fecha del gasto</label>
        <Controller
          control={control}
          name="date"
          render={({ field }) => (
            <div>
              <DatePickerDialog
                selectedDate={field.value}
                onDateChange={field.onChange}
              />
              {errors.date && (
                <p className="text-danger">{errors?.date?.message || ""}</p>
              )}
            </div>
          )}
        />
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

      <button
        type="submit"
        id="btnSubmit"
        data-testid="btnSubmit"
        className="btn btn-primary"
      >
        {expenseSelected?.id ? "Actualizar Gasto" : "Agregar Gasto"}
      </button>
    </form>
  );
};

export default ExpenseForm;
