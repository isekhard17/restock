import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Lock, Info } from 'lucide-react';
import { useUsersStore } from '../../../store/usersStore';
import { ImageUpload } from '../../../components/ui';
import { toast } from 'sonner';
import { ROLES } from '../../../utils/roleManager';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: any;
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, user }) => {
  const { addUser, updateUser, loading } = useUsersStore();
  const [formData, setFormData] = useState({
    email: '',
    nombre: '',
    apellido: '',
    rol: 'operador',
    password: '',
    foto: null as File | null
  });

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email,
        nombre: user.nombre,
        apellido: user.apellido,
        rol: user.rol,
        password: '',
        foto: null
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (user) {
        await updateUser(user.id, formData);
        toast.success('Usuario actualizado exitosamente');
      } else {
        await addUser(formData);
        toast.success('Usuario creado exitosamente');
      }
      onClose();
    } catch (error) {
      toast.error('Error al procesar el usuario');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
                <User className="w-5 h-5 text-lime-500 dark:text-pink-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {user ? 'Editar' : 'Nuevo'} Usuario
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
            <div className="flex justify-center">
              <ImageUpload
                onChange={(file) => setFormData(prev => ({ ...prev, foto: file }))}
                value={formData.foto}
                previewUrl={user?.foto_url}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nombre
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-lime-500/20 dark:focus:ring-pink-500/20"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Apellido
                </label>
                <input
                  type="text"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-lime-500/20 dark:focus:ring-pink-500/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-lime-500/20 dark:focus:ring-pink-500/20"
                />
              </div>
            </div>

            {!user && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required={!user}
                    className="w-full pl-11 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-lime-500/20 dark:focus:ring-pink-500/20"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Rol
              </label>
              <select
                name="rol"
                value={formData.rol}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-lime-500/20 dark:focus:ring-pink-500/20"
              >
                {Object.entries(ROLES).map(([key, { name }]) => (
                  <option key={key} value={key}>{name}</option>
                ))}
              </select>
            </div>

            <div className="flex items-start gap-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg">
              <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p>
                Los usuarios creados recibirán un correo electrónico con sus credenciales 
                de acceso al sistema.
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
                {loading ? 'Guardando...' : 'Guardar Usuario'}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default UserModal;