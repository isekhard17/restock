import React from 'react';
import { useAuthStore } from '../../store/authStore';
import AdminDashboard from './AdminDashboard';
import SupervisorDashboard from './SupervisorDashboard';
import OperadorDashboard from './OperadorDashboard';

const DashboardPage: React.FC = () => {
  const { user } = useAuthStore();

  if (!user) return null;

  const dashboards = {
    admin: AdminDashboard,
    supervisor: SupervisorDashboard,
    operador: OperadorDashboard,
  };

  const Dashboard = dashboards[user.rol];

  return (
    <div className="p-6">
      <Dashboard />
    </div>
  );
};

export default DashboardPage;