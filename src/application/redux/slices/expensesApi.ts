import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ENDPOINTS } from "./../../../domain/constants/constants";

export const expensesApi = createApi({
  reducerPath: "expensesApi",
  baseQuery: fetchBaseQuery(),
  endpoints: (builder) => ({
    fetchExpenses: builder.query({
      query: () => API_ENDPOINTS.EXPENSES,
    }),
  }),
});

export const { useFetchExpensesQuery } = expensesApi;
