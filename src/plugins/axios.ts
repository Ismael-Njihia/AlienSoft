import axios from "axios";
import { useAuthStore } from "../stores/auth";

const api = axios.create({
  baseURL: "https://dummyjson.com", // Base URL for the API
});

// Auto-attach token to requests
api.interceptors.request.use((config) => {
  const auth = useAuthStore();

  if (auth.token) {
    config.headers.Authorization = `Bearer ${auth.token}`;
  }

  return config;
});

export default api;
