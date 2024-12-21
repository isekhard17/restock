import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle } from 'lucide-react';
import { useUsersStore } from '../../../store/usersStore';
import { toast } from 'sonner';

interface UserStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: any;
}

const UserStatusModal: React.FC<UserStatusModalProps> = ({ 
  isOpen, 
  onClose, 
  user 
}) => {
  const { updateUserStatus, loading } = useUsersStore();

  const handleUpdateStatus = async () => {
    try {
      await updateUserStatus(user.id, !user.activo);
      toast.success(`Usuario ${user.activo ? 'desactivado' : 'activado'} exitosamente`);
      onClose();
    } catch (error) {
      toast.error('Error al actualizar el estado del usuario');
    }
  };

  if (!isOpen || !user) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full"
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Confirmar Acción
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            <p className="text-gray-600 dark:text-gray-300">
              ¿Estás seguro que deseas {user.activo ? 'desactivar' : 'activar'} al usuario{' '}
              <span className="font-medium text-gray-900 dark:text-white">
                {user.nombre} {user.apellido}
              </span>?
            </p>

            {user.activo && (
              <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-sm text-amber-600 dark:text-amber-400">
                El usuario no podrá acceder al sistema hasta que sea reactivado.
              </div>
            )}

            <div className="flex justify-end gap-3 mt-6">
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
                onClick={handleUpdateStatus}
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  px-4 py-2 text-white rounded-lg transition-colors disabled:opacity-50
                  ${user.activo
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-green-500 hover:bg-green-600'
                  }
                `}
              >
                {loading ? 'Procesando...' : user.activo ? 'Desactivar' : 'Activar'}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default UserStatusModal;