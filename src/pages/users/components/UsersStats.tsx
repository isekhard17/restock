import React from 'react';
import { motion } from 'framer-motion';
import { Users, UserCheck, UserX, History } from 'lucide-react';
import { useUsersStore } from '../../../store/usersStore';

const UsersStats: React.FC = () => {
  const { stats } = useUsersStore();

  const cards = [
    {
      title: 'Total Usuarios',
      value: stats.total,
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      title: 'Usuarios Activos',
      value: stats.active,
      icon: UserCheck,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      title: 'Usuarios Inactivos',
      value: stats.inactive,
      icon: UserX,
      color: 'text-red-500',
      bgColor: 'bg-red-50 dark:bg-red-900/20'
    },
    {
      title: 'Último Acceso',
      value: '5 min',
      icon: History,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg ${card.bgColor}`}>
              <card.icon className={`w-6 h-6 ${card.color}`} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {card.title}
              </h3>
              <p className={`text-2xl font-semibold mt-1 ${card.color}`}>
                {card.value}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default UsersStats;