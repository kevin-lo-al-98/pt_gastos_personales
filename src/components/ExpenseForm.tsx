import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addExpense, updateExpense } from '../store/slices/expenseSlice';
import { useNavigate } from 'react-router-dom';

interface ExpenseFormProps {
  expense?: {
    id: number;
    amount: number;
    category: string;
    date: string;
    description?: string;
  };
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ expense }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: expense || {
      amount: '',
      category: '',
      date: '',
      description: '',
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    if (expense) {
      dispatch(updateExpense({ ...data, id: expense.id }));
    } else {
      dispatch(addExpense({ ...data, id: Date.now() }));
    }
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-3">
      <div className="mb-3">
        <label htmlFor="amount">Monto del gasto</label>
        <input
          id="amount"
          type="number"
          className="form-control"
          {...register('amount', { required: true, min: 0 })}
        />
        {errors.amount && <p className="text-danger">Monto es requerido y debe ser positivo</p>}
      </div>

      <div className="mb-3">
        <label htmlFor="category">Categoría</label>
        <select
          id="category"
          className="form-control"
          {...register('category', { required: true })}
        >
          <option value="">Selecciona una categoría</option>
          <option value="Comida">Comida</option>
          <option value="Transporte">Transporte</option>
          <option value="Entretenimiento">Entretenimiento</option>
          <option value="Salud">Salud</option>
        </select>
        {errors.category && <p className="text-danger">La categoría es requerida</p>}
      </div>

      <div className="mb-3">
        <label htmlFor="date">Fecha del gasto</label>
        <input
          id="date"
          type="date"
          className="form-control"
          {...register('date', { required: true })}
        />
        {errors.date && <p className="text-danger">La fecha es requerida</p>}
      </div>

      <div className="mb-3">
        <label htmlFor="description">Descripción</label>
        <input
          id="description"
          type="text"
          className="form-control"
          {...register('description')}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        {expense ? 'Actualizar Gasto' : 'Agregar Gasto'}
      </button>
    </form>
  );
};

export default ExpenseForm;
