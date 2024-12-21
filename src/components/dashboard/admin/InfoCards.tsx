import React from 'react';
import { Lightbulb, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const infoCards = [
  {
    title: 'Optimiza tu inventario',
    description: 'Mantén un balance adecuado de stock configurando alertas de nivel bajo.',
    link: '/configuracion/alertas'
  },
  {
    title: 'Reportes automáticos',
    description: 'Programa reportes semanales para mantener un seguimiento constante.',
    link: '/reportes/programados'
  },
  {
    title: 'Gestión de usuarios',
    description: 'Asigna roles específicos para mejor control y seguridad.',
    link: '/usuarios/roles'
  }
];

const InfoCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {infoCards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex gap-3">
            <div className="p-2 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
              <Lightbulb className="w-5 h-5 text-pink-500" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {card.title}
              </h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                {card.description}
              </p>
              <motion.a
                href={card.link}
                className="mt-2 inline-flex items-center text-sm text-pink-500 hover:text-pink-600"
                whileHover={{ x: 5 }}
              >
                Saber más <ArrowRight className="w-4 h-4 ml-1" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default InfoCards;