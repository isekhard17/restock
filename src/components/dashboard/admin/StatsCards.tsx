import React from 'react';
import { Users, Package, AlertTriangle, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStats } from '../../../hooks/useStats';

const StatsCards: React.FC = () => {
  const { stats, loading } = useStats();

  const cards = [
    {
      title: 'Total Usuarios',
      value: stats.users,
      emptyMessage: 'No hay usuarios registrados',
      icon: Users,
      trend: '+12%',
      color: 'text-indigo-500',
      bgGlow: 'before:bg-indigo-500/10'
    },
    {
      title: 'Total Productos',
      value: stats.products,
      emptyMessage: 'No hay productos registrados',
      icon: Package,
      trend: '+5%',
      color: 'text-emerald-500',
      bgGlow: 'before:bg-emerald-500/10'
    },
    {
      title: 'Stock Bajo',
      value: stats.lowStock,
      emptyMessage: 'Sin alertas de stock',
      icon: AlertTriangle,
      trend: '-2%',
      trending: 'down',
      color: 'text-rose-500',
      bgGlow: 'before:bg-rose-500/10'
    },
    {
      title: 'Movimientos 24h',
      value: stats.movements,
      emptyMessage: 'Sin movimientos recientes',
      icon: TrendingUp,
      trend: '+15%',
      color: 'text-sky-500',
      bgGlow: 'before:bg-sky-500/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`
            relative overflow-hidden rounded-xl bg-white dark:bg-gray-800
            before:absolute before:inset-0 before:opacity-50 before:blur-xl before:-z-10 ${card.bgGlow}
            p-4 border border-gray-100 dark:border-gray-700/50
            hover:shadow-lg hover:border-gray-200 dark:hover:border-gray-600/50
            transition-all duration-300
          `}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                <card.icon className={`w-4 h-4 ${card.color}`} />
              </div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {card.title}
              </span>
            </div>
            
            {!loading && card.value > 0 && (
              <span className={`text-xs font-medium ${
                card.trending === 'down' ? 'text-rose-500' : 'text-emerald-500'
              }`}>
                {card.trend}
              </span>
            )}
          </div>
          
          {loading ? (
            <div className="h-8 w-24 bg-gray-100 dark:bg-gray-700 rounded animate-pulse" />
          ) : (
            <div className="flex items-baseline gap-2">
              <span className={`text-2xl font-bold ${card.color}`}>
                {card.value}
              </span>
              {card.value === 0 && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {card.emptyMessage}
                </span>
              )}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCards;