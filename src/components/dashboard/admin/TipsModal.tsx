import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';

interface TipsModalProps {
  onClose: () => void;
}

const tips = [
  {
    title: 'Optimiza tu inventario',
    description: 'Mantén un balance adecuado de stock configurando alertas de nivel bajo. Esto te ayudará a prevenir roturas de stock y mejorar la eficiencia.',
    icon: '📦',
    color: 'bg-blue-500'
  },
  {
    title: 'Reportes automáticos',
    description: 'Programa reportes semanales para mantener un seguimiento constante. Analiza tendencias y toma decisiones basadas en datos.',
    icon: '📊',
    color: 'bg-green-500'
  },
  {
    title: 'Gestión de usuarios',
    description: 'Asigna roles específicos para mejor control y seguridad. Define permisos claros y mantén un registro de actividades.',
    icon: '👥',
    color: 'bg-purple-500'
  },
  {
    title: 'Alertas personalizadas',
    description: 'Configura notificaciones para eventos importantes como niveles bajos de stock o movimientos inusuales.',
    icon: '🔔',
    color: 'bg-yellow-500'
  }
];

const TipsModal: React.FC<TipsModalProps> = ({ onClose }) => {
  const [currentTip, setCurrentTip] = useState(0);

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % tips.length);
  };

  const prevTip = () => {
    setCurrentTip((prev) => (prev - 1 + tips.length) % tips.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-lg w-full shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Consejos y trucos
          </h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </motion.button>
        </div>

        <motion.div
          key={currentTip}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          className="mb-6"
        >
          <div className="flex items-start gap-4">
            <div className={`p-3 ${tips[currentTip].color} rounded-xl`}>
              <span className="text-2xl">{tips[currentTip].icon}</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {tips[currentTip].title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {tips[currentTip].description}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="flex justify-between items-center">
          <div className="flex gap-1">
            {tips.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentTip
                    ? 'bg-lime-500 dark:bg-pink-500'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
              />
            ))}
          </div>
          
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={prevTip}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextTip}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TipsModal;