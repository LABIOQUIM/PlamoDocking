import { create } from 'zustand';

interface Iuser {
  id: string;
  name: string;
  email: string;
  username: string;
  role: string;
  active: boolean;
  deleted: boolean;
  created_at: string;
  updated_at: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: Iuser | null;
  accessToken: string | null;
  login: (user: Iuser, accessToken: string) => void;
  logout: () => void;
}

// Função para carregar o estado inicial do localStorage
const getInitialState = () => {
  if (typeof window !== 'undefined') {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('accessToken');
    if (storedUser && storedToken) {
      return {
        isAuthenticated: true,
        user: JSON.parse(storedUser),
        accessToken: storedToken,
      };
    }
  }
  return {
    isAuthenticated: false,
    user: null,
    accessToken: null,
  };
};

export const useAuthStore = create<AuthState>((set) => ({
  ...getInitialState(),
  login: (user, accessToken) => {
    set({ isAuthenticated: true, user, accessToken });

    // Salva no localStorage
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('accessToken', accessToken);
  },
  logout: () => {
    set({ isAuthenticated: false, user: null, accessToken: null });

    // Remove do localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
  },
}));
