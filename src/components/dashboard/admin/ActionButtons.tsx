import React from 'react';
import { Plus, FileText, Users, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const actions = [
  {
    icon: Plus,
    label: 'Nuevo Producto',
    to: '/productos/nuevo',
    color: 'bg-pink-500'
  },
  {
    icon: FileText,
    label: 'Generar Reporte',
    to: '/reportes',
    color: 'bg-blue-500'
  },
  {
    icon: Users,
    label: 'Gestionar Usuarios',
    to: '/usuarios',
    color: 'bg-purple-500'
  },
  {
    icon: Settings,
    label: 'Configuración',
    to: '/configuracion',
    color: 'bg-gray-500'
  }
];

const ActionButtons: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {actions.map((action, index) => (
        <motion.div
          key={action.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Link
            to={action.to}
            className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-xl 
                     shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700"
          >
            <div className={`p-3 rounded-full ${action.color} text-white mb-3`}>
              <action.icon className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {action.label}
            </span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default ActionButtons;