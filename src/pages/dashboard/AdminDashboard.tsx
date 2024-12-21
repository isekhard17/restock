import React from 'react';
import { BarChart3, Users } from 'lucide-react';
import { useAdminGuard } from '../../hooks/useAdminGuard';
import DashboardCard from '../../components/dashboard/DashboardCard';
import StatsOverview from '../../components/dashboard/admin/StatsOverview';
import RecentUsers from '../../components/dashboard/admin/RecentUsers';
import InventoryMovements from '../../components/dashboard/admin/InventoryMovements';

const AdminDashboard: React.FC = () => {
  const isAuthorized = useAdminGuard();

  if (!isAuthorized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Panel de Administración
        </h1>
      </div>
      
      <StatsOverview />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCard
          title="Movimientos de Inventario"
          icon={BarChart3}
          to="/reportes"
        >
          <InventoryMovements />
        </DashboardCard>

        <DashboardCard
          title="Usuarios Recientes"
          icon={Users}
          to="/usuarios"
        >
          <RecentUsers />
        </DashboardCard>
      </div>
    </div>
  );
};

export default AdminDashboard;