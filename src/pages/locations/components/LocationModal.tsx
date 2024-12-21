import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Info } from 'lucide-react';
import { useLocationsStore } from '../../../store/locationsStore';
import { toast } from 'sonner';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  locationToEdit?: any;
}

const LocationModal: React.FC<LocationModalProps> = ({ 
  isOpen, 
  onClose,
  locationToEdit 
}) => {
  const { addLocation, loading } = useLocationsStore();
  const [formData, setFormData] = useState({
    estante: locationToEdit?.estante || '',
    seccion: locationToEdit?.seccion || '',
    nivel: locationToEdit?.nivel || '',
    descripcion: locationToEdit?.descripcion || ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addLocation(formData);
      toast.success('Ubicación agregada exitosamente');
      onClose();
    } catch (error) {
      toast.error('Error al agregar la ubicación');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-lg w-full"
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-lime-50 dark:bg-pink-900/20 rounded-lg">
                <MapPin className="w-5 h-5 text-lime-500 dark:text-pink-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {locationToEdit ? 'Editar' : 'Nueva'} Ubicación
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Estante
                </label>
                <input
                  type="text"
                  name="estante"
                  value={formData.estante}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-lime-500/20 dark:focus:ring-pink-500/20"
                  placeholder="A1"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Sección
                </label>
                <input
                  type="text"
                  name="seccion"
                  value={formData.seccion}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-lime-500/20 dark:focus:ring-pink-500/20"
                  placeholder="1"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nivel
                </label>
                <input
                  type="text"
                  name="nivel"
                  value={formData.nivel}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-lime-500/20 dark:focus:ring-pink-500/20"
                  placeholder="1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Descripción
              </label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-lime-500/20 dark:focus:ring-pink-500/20"
                placeholder="Descripción opcional de la ubicación..."
              />
            </div>

            <div className="flex items-start gap-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg">
              <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p>
                Asegúrate de que la combinación de estante, sección y nivel sea única 
                para poder identificar correctamente cada ubicación.
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <motion.button
                type="button"
                onClick={onClose}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancelar
              </motion.button>
              
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 bg-lime-500 dark:bg-pink-500 text-white rounded-lg hover:bg-lime-600 dark:hover:bg-pink-600 transition-colors disabled:opacity-50"
              >
                {loading ? 'Guardando...' : 'Guardar Ubicación'}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LocationModal;