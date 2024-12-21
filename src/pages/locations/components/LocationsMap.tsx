import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Package } from 'lucide-react';
import { useLocationsStore } from '../../../store/locationsStore';

const LocationsMap: React.FC = () => {
  const { locations } = useLocationsStore();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <MapPin className="w-5 h-5" />
        Mapa de Ubicaciones
      </h3>

      <div className="relative aspect-square bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
        {/* Grid de ubicaciones */}
        <div className="grid grid-cols-4 gap-2 h-full">
          {[...Array(16)].map((_, index) => {
            const location = locations[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.02 }}
                className={`
                  relative rounded-lg border-2 transition-colors cursor-pointer
                  ${location 
                    ? 'border-lime-500 dark:border-pink-500 bg-lime-50 dark:bg-pink-900/20' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }
                `}
              >
                {location && (
                  <div className="absolute inset-0 p-2">
                    <div className="text-xs font-medium text-gray-900 dark:text-white">
                      {location.estante}-{location.seccion}
                    </div>
                    <div className="absolute bottom-2 right-2">
                      <Package className="w-3 h-3 text-lime-500 dark:text-pink-400" />
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Leyenda */}
        <div className="absolute -bottom-16 left-0 right-0 flex justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded border-2 border-lime-500 dark:border-pink-500 bg-lime-50 dark:bg-pink-900/20" />
            <span>Ocupado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded border-2 border-gray-200 dark:border-gray-700" />
            <span>Disponible</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationsMap;