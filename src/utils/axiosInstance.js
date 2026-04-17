import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true, // required for Render cookie auth
});

// Add token to all requests
axiosInstance.interceptors.request.use(
  (config) => {
    // Try to get token from localStorage
    const authStorage = localStorage.getItem("auth-storage");
    if (authStorage) {
      try {
        const parsedAuth = JSON.parse(authStorage);
        const token = parsedAuth?.state?.authUser?.token || parsedAuth?.token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Error parsing auth storage:", error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

