import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000", // Cambia la URL según tu servidor
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
