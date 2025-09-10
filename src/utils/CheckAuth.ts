import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";
import axiosInstance from "@/lib/axiosInstance";

export const checkAuth = async (): Promise<boolean> => {
    const token = localStorage.getItem("token");
    const { setSecretToken, clearAuth } = useAuthStore.getState();

    if (!token) {
        clearAuth();
        return false;
    }

    try {
        const res = await axiosInstance.post("/auth/generate-secret");

        console.log(res);
        setSecretToken(res.data.secret_token);
        return true;
    } catch (err) {
        console.error("Auth failed:", err);
        clearAuth();
        return false;
    }
};
