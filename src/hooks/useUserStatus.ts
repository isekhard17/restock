import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { toast } from 'sonner';

/**
 * Hook to check and handle user status (active/inactive)
 * Redirects to disabled page if user is inactive
 */
export const useUserStatus = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const checkStatus = async () => {
      if (user && !user.activo) {
        await logout();
        toast.error('Tu cuenta ha sido desactivada');
        navigate('/disabled');
      }
    };

    checkStatus();
  }, [user, navigate, logout]);

  return user?.activo ?? false;
};