import { useAuthStore } from '@/store/authStore';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const navigate = useNavigate();
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
  } = useAuthStore();

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      navigate('/dashboard');
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleRegister = async (data: {
    email: string;
    username: string;
    password: string;
    fullName: string;
  }) => {
    try {
      await register(data);
      navigate('/dashboard');
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    handleLogin,
    handleRegister,
    handleLogout,
    clearError,
  };
};