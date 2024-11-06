// Tipo para el estado de carga
export type LoadingState = "idle" | "loading" | "succeeded" | "failed";

// Tipo para representar las categorías de gastos
export type ExpenseCategory =
  | "Comida"
  | "Transporte"
  | "Entretenimiento"
  | "Otros";

// Tipo para una respuesta de API genérica
export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}
