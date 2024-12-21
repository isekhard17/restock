import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Role, hasPermission } from '../../utils/roleManager';
import { toast } from 'sonner';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles?: Role[];
  requiredPermissions?: string[];
}

const RoleGuard: React.FC<RoleGuardProps> = ({
  children,
  allowedRoles = [],
  requiredPermissions = [],
}) => {
  const { user } = useAuthStore();

  if (!user) {
    toast.error('Sesión no válida', {
      description: 'Por favor, inicia sesión nuevamente'
    });
    return <Navigate to="/login" replace />;
  }

  const hasRole = allowedRoles.length === 0 || allowedRoles.includes(user.rol);
  const hasRequiredPermissions = requiredPermissions.every(permission => 
    hasPermission(user, permission)
  );

  if (!hasRole || !hasRequiredPermissions) {
    toast.error('Acceso denegado', {
      description: 'No tienes permisos para acceder a esta sección'
    });
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default RoleGuard;