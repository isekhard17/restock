import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Edit, Ban, CheckCircle, XCircle } from 'lucide-react';
import { useUsersStore } from '../../../store/usersStore';
import { getRoleName } from '../../../utils/roleManager';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import UserModal from './UserModal';
import UserStatusModal from './UserStatusModal';

const UsersList: React.FC = () => {
  const { users, loading } = useUsersStore();
  const [selectedUser, setSelectedUser] = React.useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = React.useState(false);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full" />
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

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm divide-y divide-gray-100 dark:divide-gray-700">
        <div className="grid grid-cols-12 gap-4 p-4 text-sm font-medium text-gray-500 dark:text-gray-400">
          <div className="col-span-4">Usuario</div>
          <div className="col-span-2">Rol</div>
          <div className="col-span-2">Estado</div>
          <div className="col-span-2">Último acceso</div>
          <div className="col-span-2 text-right">Acciones</div>
        </div>

        <AnimatePresence>
          {users.map((user) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <div className="col-span-4 flex items-center gap-3">
                <div className="relative">
                  {user.foto_url ? (
                    <img
                      src={user.foto_url}
                      alt={user.nombre}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-lime-100 dark:bg-pink-900/30 flex items-center justify-center">
                      <User className="w-5 h-5 text-lime-600 dark:text-pink-400" />
                    </div>
                  )}
                  <span className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${
                    user.activo ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                </div>
                
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {user.nombre} {user.apellido}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {user.email}
                  </div>
                </div>
              </div>

              <div className="col-span-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-lime-100 dark:bg-pink-900/30 text-lime-800 dark:text-pink-200">
                  {getRoleName(user.rol)}
                </span>
              </div>

              <div className="col-span-2">
                <span className={`inline-flex items-center gap-1 text-sm ${
                  user.activo 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {user.activo ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <XCircle className="w-4 h-4" />
                  )}
                  {user.activo ? 'Activo' : 'Inactivo'}
                </span>
              </div>

              <div className="col-span-2 text-sm text-gray-500 dark:text-gray-400">
                {user.ultimo_acceso ? (
                  formatDistanceToNow(new Date(user.ultimo_acceso), {
                    addSuffix: true,
                    locale: es
                  })
                ) : (
                  'Nunca'
                )}
              </div>

              <div className="col-span-2 flex justify-end gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setSelectedUser(user);
                    setIsEditModalOpen(true);
                  }}
                  className="p-1 text-gray-500 hover:text-lime-500 dark:text-gray-400 dark:hover:text-pink-400"
                >
                  <Edit className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setSelectedUser(user);
                    setIsStatusModalOpen(true);
                  }}
                  className="p-1 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                >
                  <Ban className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <UserModal 
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
      />

      <UserStatusModal
        isOpen={isStatusModalOpen}
        onClose={() => {
          setIsStatusModalOpen(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
      />
    </>
  );
};

export default UsersList;