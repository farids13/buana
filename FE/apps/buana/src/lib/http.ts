import { useAuthStore } from "@/stores/use-auth-store";
import axios from "axios";
import { toast } from 'react-toastify';

export const API_URL = "http://localhost:8080/api";

export const httpClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

httpClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = "Terjadi kesalahan pada server";
    
    if (error.response) {
      switch (error.response.status) {
        case 400:
          message = error.response.data.message || "Data yang dikirim tidak valid";
          break;
        case 401:
          message = "Sesi anda telah berakhir, silahkan login kembali";
          // Redirect ke halaman login
          window.location.href = '/login';
          break;
        case 403:
          message = "Anda tidak memiliki akses";
          break;
        case 404:
          message = "Data tidak ditemukan";
          break;
        case 500:
          message = "Terjadi kesalahan pada server";
          break;
      }
    }

    toast.error(message, {
      position: "top-right",
      autoClose: 3000
    });

    return Promise.reject(error);
  }
);
