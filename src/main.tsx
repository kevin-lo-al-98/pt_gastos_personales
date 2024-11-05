import "bootstrap/dist/css/bootstrap.min.css"; // Importar Bootstrap
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import axios from "axios";
import dayjs from "dayjs";

dayjs.locale("es");
axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.timeout = 0;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
