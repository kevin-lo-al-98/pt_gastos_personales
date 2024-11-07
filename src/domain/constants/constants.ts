// Categorías de gastos
export const EXPENSE_CATEGORIES = [
  "Comida",
  "Transporte",
  "Entretenimiento",
  "Otros",
];

// Rutas de API
export const API_ENDPOINTS = {
  EXPENSES: "/expenses",
  USERS: "/users",
};

// Rutas de navegacion
export const ROUTES_NAVIGATION = {
  HOME: "/",
  EXPENSES_MANAGEMENT: "expenses-management",
  EXPENSES_CHART: "expenses-chart",
  ADD_EXPENSE: "add-expense",
  EDIT_EXPENSE: "edit-expense",
  
};

// Mensajes de error comunes
export const ERROR_MESSAGES = {
  NETWORK_ERROR:
    "No se pudo conectar con el servidor. Por favor, inténtalo de nuevo más tarde.",
  UNAUTHORIZED: "No tienes permiso para realizar esta acción.",
  NOT_FOUND: "Recurso no encontrado.",
};
