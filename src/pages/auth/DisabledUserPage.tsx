import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserX } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';

const DisabledUserPage: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
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
            <UserX className="w-12 h-12 text-red-500 dark:text-red-400" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Usuario Desactivado
        </h1>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Tu cuenta ha sido desactivada. Por favor, contacta al administrador 
          del sistema para más información.
        </p>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="px-6 py-2 bg-red-500 text-white rounded-lg
                   hover:bg-red-600 transition-colors"
        >
          Cerrar Sesión
        </motion.button>
      </motion.div>
    </div>
  );
};

export default DisabledUserPage;