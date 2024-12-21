import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Package, Edit, Trash2, Archive } from 'lucide-react';
import { useLocationsStore } from '../../../store/locationsStore';

const LocationsList: React.FC = () => {
  const { locations, loading } = useLocationsStore();

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (locations.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-12 text-center">
        <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No hay ubicaciones
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Comienza agregando tu primera ubicación
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm divide-y divide-gray-100 dark:divide-gray-700">
      <AnimatePresence>
        {locations.map((location) => (
          <motion.div
            key={location.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="p-2 bg-lime-50 dark:bg-pink-900/20 rounded-lg">
                <MapPin className="w-6 h-6 text-lime-500 dark:text-pink-400" />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Estante {location.estante} - Sección {location.seccion}
                  </h3>
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-1 text-gray-500 hover:text-lime-500 dark:text-gray-400 dark:hover:text-pink-400"
                    >
                      <Edit className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-1 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Nivel {location.nivel}
                </p>

                {location.descripcion && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                    {location.descripcion}
                  </p>
                )}

                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <Package className="w-4 h-4" />
                    <span>12 productos</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <Archive className="w-4 h-4" />
                    <span>80% ocupado</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default LocationsList;