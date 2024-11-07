import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ExpenseForm from "../ExpenseForm";

const mockStore = configureStore([]);

describe("ExpenseForm Component", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      expenses: { expenseSelected: null, list: [] },
    });
  });

  test("renders form fields", () => {
    render(
      <Provider store={store}>
        <ExpenseForm onSubmit={() => {}} />
      </Provider>
    );

    expect(screen.getByLabelText("Monto del gasto")).toBeInTheDocument();
    expect(screen.getByLabelText("Categoría")).toBeInTheDocument();
    expect(screen.getByLabelText("Fecha del gasto")).toBeInTheDocument();
    expect(screen.getByLabelText("Descripción")).toBeInTheDocument();
  });

  test("submits form data", async () => {
    const handleSubmit = jest.fn();

    render(
      <Provider store={store}>
        <ExpenseForm onSubmit={handleSubmit} />
      </Provider>
    );

    // Llenado de campos del formulario
    fireEvent.change(screen.getByLabelText("Monto del gasto"), {
      target: { value: "200" },
    });
    fireEvent.change(screen.getByLabelText("Categoría"), {
      target: { value: "Comida" },
    });
    fireEvent.change(screen.getByLabelText("Fecha del gasto"), {
      target: { value: "2023-10-10" },
    });
    fireEvent.change(screen.getByLabelText("Descripción"), {
      target: { value: "Cena con amigos" },
    });

    // Envío del formulario utilizando el id del botón
    fireEvent.click(screen.getByTestId("btnSubmit"));

    // Verificación de llamada a `handleSubmit`
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
      expect(handleSubmit).toHaveBeenCalledWith({
        amount: 200,
        category: "Comida",
        date: "2023-10-10",
        description: "Cena con amigos",
        id: expect.any(Number), // Este ID es generado automáticamente en el componente
      });
    });
  });
});
