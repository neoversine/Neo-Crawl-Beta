import axios from "axios";

// Create an axios instance
const axiosInstance = axios.create({
    baseURL: "https://fasttools.neoversine.in", // change if needed
    headers: {
        accept: "application/json",
    }
});

// Add interceptor to include token if available
axiosInstance.interceptors.request.use(
    (config) => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
