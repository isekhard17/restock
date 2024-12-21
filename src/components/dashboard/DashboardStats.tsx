import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatItem {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  trending?: 'up' | 'down';
}

interface DashboardStatsProps {
  stats: StatItem[];
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
              <p className="text-2xl font-semibold text-gray-800 dark:text-white mt-1">
                {stat.value}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${
              stat.trending === 'down' 
                ? 'bg-red-50 dark:bg-red-900/20' 
                : 'bg-lime-50 dark:bg-pink-900/20'
            }`}>
              <stat.icon className={`w-6 h-6 ${
                stat.trending === 'down'
                  ? 'text-red-500 dark:text-red-400'
                  : 'text-lime-500 dark:text-pink-400'
              }`} />
            </div>
          </div>
          
          {stat.trend && (
            <div className="mt-2">
              <span className={`text-sm ${
                stat.trending === 'down'
                  ? 'text-red-500 dark:text-red-400'
                  : 'text-lime-500 dark:text-pink-400'
              }`}>
                {stat.trend}
              </span>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardStats;