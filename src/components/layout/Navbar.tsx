import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { LogOut, User, Bell, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';
import RestockLogo from '../icons/RestockLogo';

interface NavbarProps {
  isSidebarCollapsed: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isSidebarCollapsed }) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Solo visible cuando la sidebar está colapsada */}
          {isSidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <RestockLogo className="w-8 h-8" />
              <span className="text-xl font-semibold text-gray-800 dark:text-white">
                Restock
              </span>
            </motion.div>
          )}
          
          <div className="flex items-center space-x-4 ml-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </motion.button>

            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </motion.button>

            <div className="flex items-center space-x-3 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                {user?.nombre} {user?.apellido}
              </span>
            </div>
            
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30 rounded-lg transition-colors"
              title="Cerrar sesión"
            >
              <LogOut className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;