import axios from "axios";

export const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api"
});

request.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
