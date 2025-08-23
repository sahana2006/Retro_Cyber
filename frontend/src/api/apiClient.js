import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/", // Django backend
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
