import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, FileText, Settings, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const QuickActions: React.FC = () => {
  const actions = [
    {
      icon: Plus,
      label: 'Nuevo Producto',
      to: '/productos/nuevo',
      color: 'bg-lime-500 dark:bg-pink-500'
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

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action, index) => (
        <Link
          key={index}
          to={action.to}
          className="flex flex-col items-center p-4 rounded-lg bg-white dark:bg-gray-800 
                   shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-700"
        >
          <div className={`p-3 rounded-full ${action.color} text-white mb-3`}>
            <action.icon className="w-5 h-5" />
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {action.label}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default QuickActions;