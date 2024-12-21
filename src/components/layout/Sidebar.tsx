import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Package, 
  MapPin, 
  BarChart2, 
  Users, 
  Settings,
  Boxes,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { motion, AnimatePresence } from 'framer-motion';
import RestockLogo from '../icons/RestockLogo';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
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
      icon: MapPin, 
      label: 'Ubicaciones', 
      path: '/ubicaciones',
      roles: ['admin', 'supervisor']
    },
    { 
      icon: BarChart2, 
      label: 'Reportes', 
      path: '/reportes',
      roles: ['admin', 'supervisor']
    },
    { 
      icon: Users, 
      label: 'Usuarios', 
      path: '/usuarios',
      roles: ['admin']
    },
    { 
      icon: Settings, 
      label: 'Configuración', 
      path: '/configuracion',
      roles: ['admin']
    },
  ];

  return (
    <motion.aside
      initial={false}
      animate={{ 
        width: isCollapsed ? '4rem' : '16rem',
        transition: { duration: 0.2 }
      }}
      className="fixed left-0 top-0 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-20 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4">
        <AnimatePresence initial={false}>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex items-center space-x-3"
            >
              <RestockLogo className="w-8 h-8" />
              <span className="text-xl font-semibold text-gray-900 dark:text-white">
                Restock
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onToggle(!isCollapsed)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </motion.button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        {menuItems.map((item, index) => (
          user?.rol && item.roles.includes(user.rol) ? (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) => `
                flex items-center px-3 py-2.5 my-1 rounded-lg transition-all
                ${isActive 
                  ? 'bg-lime-50 dark:bg-pink-500/20 text-lime-600 dark:text-pink-400' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                }
              `}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <item.icon className={`w-5 h-5 ${
                  isCollapsed ? 'mx-auto' : 'mr-3'
                }`} />
              </motion.div>
              <AnimatePresence initial={false}>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="font-medium whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          ) : null
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4">
        <AnimatePresence initial={false}>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xs text-gray-500 dark:text-gray-400 text-center"
            >
              Restock v1.0.0
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  );
};

export default Sidebar;