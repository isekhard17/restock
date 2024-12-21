import React from 'react';
import { useAuthStore } from '../../../store/authStore';
import { Bell, Coffee, Calendar, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { getTimeContext } from '../../../utils/timeGreetings';

const WelcomeHeader: React.FC = () => {
  const { user } = useAuthStore();
  const timeContext = getTimeContext();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden bg-gradient-to-br from-lime-500/10 via-lime-400/5 to-transparent dark:from-pink-500/10 dark:via-pink-400/5 dark:to-transparent rounded-2xl p-8"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-lime-200/20 to-transparent dark:from-pink-500/20 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-lime-200/20 to-transparent dark:from-pink-500/20 rounded-full blur-2xl -z-10 transform -translate-x-1/2 translate-y-1/2" />

      <div className="flex justify-between items-start relative">
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              {timeContext.greeting}, {user?.nombre} {timeContext.icon}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-xl">
              {timeContext.context}. Aquí tienes un resumen de la actividad reciente y las tareas pendientes para hoy.
            </p>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>{new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.02, x: 3 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-1 text-lime-600 dark:text-pink-400 font-medium hover:opacity-80 transition-opacity"
            >
              Ver agenda del día
              <ArrowUpRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2.5 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all"
          >
            <Coffee className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2.5 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all relative"
          >
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-lime-500 dark:bg-pink-500 rounded-full border-2 border-white dark:border-gray-800" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default WelcomeHeader;