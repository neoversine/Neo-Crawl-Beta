import { create } from "zustand";

interface AuthState {
    secretToken: string | null;
    setSecretToken: (token: string) => void;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    secretToken: null,
    setSecretToken: (token) => set({ secretToken: token }),
    clearAuth: () => set({ secretToken: null }),
}));
