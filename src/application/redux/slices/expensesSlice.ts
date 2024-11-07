import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Expense } from "../../../domain/models/Expense";
import { LoadingState } from "../../../domain/types/types";
import {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from "../../../infrastucture/services/expenseService";
import { RootState } from "../store";

interface ExpensesState {
  expenseSelected: Expense;
  list: Expense[];
  loading: LoadingState;
  error?: string;
}

const initialState: ExpensesState = {
  expenseSelected: {
    id: 0,
    amount: 0,
    category: "",
    date: "",
    description: "",
  },
  list: [],
  loading: "idle",
};

// Thunks usando el servicio
export const fetchExpenses = createAsyncThunk(
  "expenses/fetchExpenses",
  async () => {
    return await getExpenses();
  }
);

export const addExpense = createAsyncThunk(
  "expenses/addExpense",
  async (expense: Expense) => {
    return await createExpense(expense);
  }
);

export const updateExpenseThunk = createAsyncThunk(
  "expenses/updateExpense",
  async ({ id, expense }: { id: number; expense: Expense }) => {
    return await updateExpense(id, expense);
  }
);

export const deleteExpenseThunk = createAsyncThunk(
  "expenses/deleteExpense",
  async (id: number) => {
    await deleteExpense(id);
    return id;
  }
);

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    setExpenseSelected(state, action: PayloadAction<Expense>) {
      state.expenseSelected = action.payload;
    },
    resetExpenseSelected(state) {
      state.expenseSelected = initialState.expenseSelected;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(
        fetchExpenses.fulfilled,
        (state, action: PayloadAction<Expense[]>) => {
          state.loading = "succeeded";
          state.list = action.payload;
        }
      )
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(
        addExpense.fulfilled,
        (state, action: PayloadAction<Expense>) => {
          state.list.push(action.payload);
        }
      )
      .addCase(
        updateExpenseThunk.fulfilled,
        (state, action: PayloadAction<Expense>) => {
          const index = state.list.findIndex(
            (expense) => expense.id === action.payload.id
          );
          if (index !== -1) {
            state.list[index] = action.payload;
          }
        }
      )
      .addCase(
        deleteExpenseThunk.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.list = state.list.filter(
            (expense) => expense.id !== action.payload
          );
        }
      );
  },
});

export const { setExpenseSelected, resetExpenseSelected } = expensesSlice.actions;
export const selectExpensesSlice = (state: RootState) => {
  return state.expenses;
};
export default expensesSlice.reducer;
