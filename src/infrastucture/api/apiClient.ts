import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://ca2b1a421f421769bde5.free.beeceptor.com", // Cambia la URL según tu servidor
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
