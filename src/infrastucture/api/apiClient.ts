import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://ca19855df6b2962a89d6.free.beeceptor.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;