import "bootstrap/dist/css/bootstrap.min.css"; // Importar Bootstrap
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store, persistor } from "./application/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import axios from "axios";
import dayjs from "dayjs";
import "./index.css";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.locale("es");
axios.defaults.timeout = 0;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
