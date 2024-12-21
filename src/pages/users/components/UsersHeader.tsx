import React from 'react';
import { Plus, FileText, Filter, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUsersStore } from '../../../store/usersStore';
import UserModal from './UserModal';

const UsersHeader: React.FC = () => {
  const { totalUsers } = useUsersStore();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Users className="w-6 h-6" />
            Usuarios
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {totalUsers} usuarios registrados
          </p>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-lime-500 dark:bg-pink-500 text-white rounded-lg hover:bg-lime-600 dark:hover:bg-pink-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Nuevo Usuario</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Filter className="w-5 h-5" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <FileText className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      <UserModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default UsersHeader;