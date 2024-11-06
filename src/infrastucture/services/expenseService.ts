import apiClient from "../api/apiClient";
import { Expense } from "../../domain/models/Expense";
import { API_ENDPOINTS } from "../../domain/constants/constants";

export const getExpenses = async (): Promise<Expense[]> => {
  const response = await apiClient.get(API_ENDPOINTS.EXPENSES);
  return response.data;
};

export const createExpense = async (expense: Expense): Promise<Expense> => {
  const response = await apiClient.post(API_ENDPOINTS.EXPENSES, expense);
  return response.data;
};

export const updateExpense = async (
  id: number,
  expense: Expense
): Promise<Expense> => {
  const response = await apiClient.put(
    `${API_ENDPOINTS.EXPENSES}/${id}`,
    expense
  );
  return response.data;
};

export const deleteExpense = async (id: number): Promise<void> => {
  await apiClient.delete(`${API_ENDPOINTS.EXPENSES}/${id}`);
};
