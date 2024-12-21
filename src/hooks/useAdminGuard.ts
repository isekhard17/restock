import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { toast } from 'sonner';

export const useAdminGuard = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (!user) {
        toast.error('Sesión no válida');
        navigate('/login');
        return;
      }

      if (user.rol !== 'admin') {
        toast.error('Acceso no autorizado');
        navigate('/unauthorized');
        return;
      }

      setIsAuthorized(true);
    };

    checkAuth();
  }, [user, navigate]);

  return isAuthorized;
};