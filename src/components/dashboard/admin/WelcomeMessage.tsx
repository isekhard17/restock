import React from 'react';
import { useAuthStore } from '../../../store/authStore';
import { Bell, Calendar, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { getTimeContext } from '../../../utils/timeGreetings';

const WelcomeMessage: React.FC = () => {
  const { user } = useAuthStore();
  const timeContext = getTimeContext();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden bg-gradient-to-br from-lime-500/5 via-lime-400/10 to-transparent dark:from-pink-500/5 dark:via-pink-400/10 dark:to-transparent rounded-2xl p-8"
    >
      {/* Elementos decorativos */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-lime-200/20 to-transparent dark:from-pink-500/20 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-lime-200/20 to-transparent dark:from-pink-500/20 rounded-full blur-2xl -z-10 transform -translate-x-1/2 translate-y-1/2" />

      <div className="flex justify-between items-start">
        <div className="space-y-4">
          <div className="space-y-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-lime-50 dark:bg-pink-500/10 rounded-full px-3 py-1"
            >
              <span className="text-lime-600 dark:text-pink-400 text-sm font-medium">
                Dashboard
              </span>
              <span className="w-1 h-1 rounded-full bg-lime-600 dark:bg-pink-400" />
              <span className="text-gray-600 dark:text-gray-300 text-sm">
                {new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
              </span>
            </motion.div>
            
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              {timeContext.greeting}, {user?.nombre} {timeContext.icon}
            </h1>
            
            <p className="text-gray-600 dark:text-gray-300 max-w-xl">
              {timeContext.context}. Aquí tienes un resumen de la actividad reciente y las tareas pendientes para hoy.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
              <Calendar className="w-4 h-4" />
              <span>Semana {new Date().getWeek()} del {new Date().getFullYear()}</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.02, x: 3 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-1 text-lime-600 dark:text-pink-400 text-sm font-medium hover:opacity-80 transition-opacity"
            >
              Ver agenda del día
              <ArrowUpRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2.5 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all relative"
        >
          <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-lime-500 dark:bg-pink-500 rounded-full border-2 border-white dark:border-gray-800" />
        </motion.button>
      </div>
    </motion.div>
  );
};

// Extensión de Date para obtener el número de semana
declare global {
  interface Date {
    getWeek(): number;
  }
}

Date.prototype.getWeek = function(): number {
  const date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  const week1 = new Date(date.getFullYear(), 0, 4);
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
};

export default WelcomeMessage;