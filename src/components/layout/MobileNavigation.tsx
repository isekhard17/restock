import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard,
  Package, 
  Boxes,
  BarChart2,
  Settings
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';

const MobileNavigation: React.FC = () => {
  const { user } = useAuthStore();

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: 'Panel',
      path: `/${user?.rol}`,
      roles: ['admin', 'supervisor', 'operador']
    },
    { 
      icon: Package, 
      label: 'Productos', 
      path: '/productos',
      roles: ['admin', 'supervisor', 'operador']
    },
    { 
      icon: Boxes, 
      label: 'Inventario', 
      path: '/inventario',
      roles: ['admin', 'supervisor', 'operador']
    },
    { 
      icon: BarChart2, 
      label: 'Reportes', 
      path: '/reportes',
      roles: ['admin', 'supervisor']
    },
    { 
      icon: Settings, 
      label: 'Config', 
      path: '/configuracion',
      roles: ['admin']
    }
  ];

  return (
    <motion.nav 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-50"
    >
      <div className="flex justify-around items-center h-16 px-4">
        {menuItems.map((item, index) => (
          user?.rol && item.roles.includes(user.rol) ? (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) => `
                flex flex-col items-center justify-center w-16 py-1
                ${isActive 
                  ? 'text-lime-500 dark:text-pink-400' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }
              `}
            >
              {({ isActive }) => (
                <>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="relative"
                  >
                    <item.icon className="w-5 h-5" />
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute -bottom-1 left-1/2 w-1 h-1 bg-lime-500 dark:bg-pink-400 rounded-full -translate-x-1/2"
                      />
                    )}
                  </motion.div>
                  <span className="text-xs mt-1">{item.label}</span>
                </>
              )}
            </NavLink>
          ) : null
        ))}
      </div>
    </motion.nav>
  );
};

export default MobileNavigation;