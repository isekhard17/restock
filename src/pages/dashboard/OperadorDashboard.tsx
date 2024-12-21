import React from 'react';
import { Package, ArrowDownUp, Clock } from 'lucide-react';
import DashboardCard from '../../components/dashboard/DashboardCard';
import DashboardStats from '../../components/dashboard/DashboardStats';

const OperadorDashboard: React.FC = () => {
  const stats = [
    { title: 'Productos', value: '156', icon: Package },
    { title: 'Movimientos Hoy', value: '34', icon: ArrowDownUp, trend: '+8%' },
    { title: 'Último Movimiento', value: '12:45', icon: Clock },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        Panel de Operador
      </h1>
      
      <DashboardStats stats={stats} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardCard
          title="Últimos Movimientos"
          icon={ArrowDownUp}
          to="/inventario"
          loading={false}
        >
          {/* Recent movements list will go here */}
        </DashboardCard>

        <DashboardCard
          title="Productos Frecuentes"
          icon={Package}
          to="/productos"
          loading={false}
        >
          {/* Frequent products list will go here */}
        </DashboardCard>
      </div>
    </div>
  );
};

export default OperadorDashboard;