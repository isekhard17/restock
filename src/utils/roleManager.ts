import { Usuario } from '../types/database.types';

export type Role = 'admin' | 'supervisor' | 'operador';

interface RoleConfig {
  name: string;
  dashboardPath: string;
  permissions: string[];
}

export const ROLES: Record<Role, RoleConfig> = {
  admin: {
    name: 'Administrador',
    dashboardPath: '/admin',
    permissions: ['manage_users', 'manage_inventory', 'view_reports', 'manage_settings'],
  },
  supervisor: {
    name: 'Supervisor',
    dashboardPath: '/supervisor',
    permissions: ['manage_inventory', 'view_reports'],
  },
  operador: {
    name: 'Operador',
    dashboardPath: '/operador',
    permissions: ['view_inventory', 'manage_stock'],
  },
};

export const hasPermission = (user: Usuario | null, permission: string): boolean => {
  if (!user) return false;
  return ROLES[user.rol]?.permissions.includes(permission) || false;
};

export const getRoleName = (role: Role): string => {
  return ROLES[role]?.name || role;
};

export const getDashboardPath = (user: Usuario | null): string => {
  if (!user) return '/login';
  return ROLES[user.rol]?.dashboardPath || '/dashboard';
};