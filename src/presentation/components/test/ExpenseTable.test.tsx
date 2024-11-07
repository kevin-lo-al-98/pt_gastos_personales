import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import { Expense } from "../../../domain/models/Expense";
import ExpenseTable from "../ExpenseTable";

const mockStore = configureStore([]);
const mockExpenses: Expense[] = [
  {
    id: 1,
    amount: 100,
    category: "Food",
    date: "2023-10-01",
    description: "Lunch",
  },
  {
    id: 2,
    amount: 50,
    category: "Transport",
    date: "2023-10-02",
    description: "Bus ticket",
  },
];

describe("ExpenseTable Component", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      expenses: { list: mockExpenses },
    });
  });

  test("renders expenses and actions", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ExpenseTable expenses={mockExpenses} enableActions={true} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Food")).toBeInTheDocument();
    expect(screen.getByText("Transport")).toBeInTheDocument();
    expect(screen.getAllByText("Editar").length).toBe(2);
    expect(screen.getAllByText("Eliminar").length).toBe(2);
  });

  test("triggers delete confirmation", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ExpenseTable expenses={mockExpenses} enableActions={true} />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click(screen.getAllByText("Eliminar")[0]);
    expect(screen.getByText("¿Estás seguro?")).toBeInTheDocument();
  });
});
