import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import { getDashboardPath } from '../../utils/roleManager';

const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const handleBack = () => {
    navigate(getDashboardPath(user));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center"
      >
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full">
            <Shield className="w-12 h-12 text-red-500 dark:text-red-400" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Acceso No Autorizado
        </h1>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          No tienes permisos para acceder a esta sección.
        </p>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleBack}
          className="px-6 py-2 bg-lime-500 dark:bg-pink-500 text-white rounded-lg
                   hover:bg-lime-600 dark:hover:bg-pink-600 transition-colors"
        >
          Volver al inicio
        </motion.button>
      </motion.div>
    </div>
  );
};

export default UnauthorizedPage;