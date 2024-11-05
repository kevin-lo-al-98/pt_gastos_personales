// # Configuración principal de Redux y Persistencia
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import authReducer from './slices/authSlice';
import expenseReducer from './slices/expenseSlice';

// Configuración de los reducers combinados
const rootReducer = combineReducers({
  auth: authReducer,
  expenses: expenseReducer,
});

// Configuración de persistencia en localStorage para mantener el estado del auth
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Solo persiste la autenticación
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Crear el store con los middleware de Redux y Persistencia
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Evitar advertencias por datos no serializables en Redux Persist
    }),
});

// Configuración de Persistor para persistencia
export const persistor = persistStore(store);

// Tipos para el estado y el dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
