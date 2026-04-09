import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

// Membuat instance dengan tipe AxiosInstance
const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Otomatis ambil token dari localStorage jika ada
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // Cek apakah kode berjalan di browser (client-side)
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      
      if (token && config.headers) {
        // Menggunakan .set() adalah cara yang lebih aman di versi Axios terbaru
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;