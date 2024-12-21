import React from 'react';
import { Package, AlertTriangle, TrendingUp, BarChart3 } from 'lucide-react';
import DashboardCard from '../../components/dashboard/DashboardCard';
import DashboardStats from '../../components/dashboard/DashboardStats';

const SupervisorDashboard: React.FC = () => {
  const stats = [
    { title: 'Total Productos', value: '156', icon: Package, trend: '+5%' },
    { title: 'Stock Bajo', value: '8', icon: AlertTriangle, trend: '-2%', trending: 'down' },
    { title: 'Movimientos Hoy', value: '34', icon: TrendingUp, trend: '+15%' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        Panel de Supervisor
      </h1>
      
      <DashboardStats stats={stats} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardCard
          title="Productos con Stock Bajo"
          icon={AlertTriangle}
          to="/productos"
          loading={false}
        >
          {/* Low stock products list will go here */}
        </DashboardCard>

        <DashboardCard
          title="Estadísticas de Inventario"
          icon={BarChart3}
          to="/reportes"
          loading={false}
        >
          {/* Inventory stats will go here */}
        </DashboardCard>
      </div>
    </div>
  );
};

export default SupervisorDashboard;