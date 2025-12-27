import { create } from 'zustand';
import { User } from '@/types';
import { authService } from '@/services/authService';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  setUser: (user: User | null) => void;
  updateUserXP: (xp: number, level: number) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { email: string; username: string; password: string; fullName: string }) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
  refreshUser: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: authService.getCurrentUser(),
  isAuthenticated: authService.isAuthenticated(),
  isLoading: false,
  error: null,

  setUser: (user) => {
    set({ user, isAuthenticated: !!user });
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  },

  updateUserXP: (xpGained: number, newLevel?: number) => {
  set((state) => ({
    user: state.user
      ? {
          ...state.user,
          xp: state.user.xp + xpGained,
          level: newLevel || state.user.level,
        }
      : null,
  }));
},

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { user } = await authService.login({ email, password });
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Login failed',
        isLoading: false,
      });
      throw error;
    }
  },

  register: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const { user } = await authService.register(data);
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Registration failed',
        isLoading: false,
      });
      throw error;
    }
  },
  

  logout: () => {
    authService.logout();
    set({ user: null, isAuthenticated: false });
  },

  checkAuth: () => {
    const user = authService.getCurrentUser();
    const isAuthenticated = authService.isAuthenticated();
    set({ user, isAuthenticated });
  },

  refreshUser: async () => {
    try {
      const user = await authService.getMe();
      set({ user });
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Failed to refresh user:', error);
    }
  },

  clearError: () => set({ error: null }),
}));