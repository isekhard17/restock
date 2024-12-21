import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, ArrowRight } from 'lucide-react';

const tips = [
  {
    title: 'Optimiza tu inventario',
    description: 'Mantén un balance adecuado de stock configurando alertas de nivel bajo.',
  },
  {
    title: 'Reportes automáticos',
    description: 'Programa reportes semanales para mantener un seguimiento constante.',
  },
  {
    title: 'Gestión de usuarios',
    description: 'Asigna roles específicos para mejor control y seguridad.',
  }
];

const InfoTips: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {tips.map((tip, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-lime-100 dark:bg-pink-900/30 rounded-lg">
              <Lightbulb className="w-5 h-5 text-lime-600 dark:text-pink-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-1">
                {tip.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {tip.description}
              </p>
              <button className="mt-2 text-sm text-lime-600 dark:text-pink-400 flex items-center hover:underline">
                Saber más <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default InfoTips;