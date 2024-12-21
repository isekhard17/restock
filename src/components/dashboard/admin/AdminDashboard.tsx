import React from 'react';
import { useAdminGuard } from '../../../hooks/useAdminGuard';
import { motion } from 'framer-motion';
import StatsCards from './StatsCards';
import ActionButtons from './ActionButtons';
import InventoryMovements from './InventoryMovements';
import RecentUsers from './RecentUsers';
import WelcomeHeader from './WelcomeHeader';
import InfoCards from './InfoCards';

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
    <div className="p-6 space-y-6">
      <WelcomeHeader />
      <InfoCards />
      <StatsCards />
      <ActionButtons />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <InventoryMovements />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <RecentUsers />
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;