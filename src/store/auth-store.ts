import { create } from 'zustand';

interface Iuser {
    email: string;
    name: string;
}

interface AuthState {
    isAuthenticated: boolean;
    user: Iuser | null;
    login: (user: Iuser) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    user: null,
    login: (user) => set({ isAuthenticated: true, user }),
    logout: () => set({ isAuthenticated: false, user: null }),
}));
