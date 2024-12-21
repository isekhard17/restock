import React, { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { Usuario } from '../../../types/database.types';
import { getRoleName } from '../../../utils/roleManager';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { useRealtimeSubscription } from '../../../hooks/useRealtimeSubscription';

const RecentUsers: React.FC = () => {
  const [users, setUsers] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);

  // Suscripción a cambios en usuarios
  useRealtimeSubscription<Usuario>('recent_users', '*', 'usuarios', users);

  // Cargar datos iniciales
  useEffect(() => {
    const loadInitialUsers = async () => {
      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (!error && data) {
        setUsers(data);
      }
      setLoading(false);
    };

    loadInitialUsers();
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div key={user.id} className="flex items-center space-x-4">
          <div className="relative">
            {user.foto_url ? (
              <img
                src={user.foto_url}
                alt={`${user.nombre} ${user.apellido}`}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-lime-100 dark:bg-pink-900/30 flex items-center justify-center">
                <span className="text-lime-600 dark:text-pink-400 font-medium">
                  {user.nombre.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <span className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${
              user.activo ? 'bg-green-500' : 'bg-gray-400'
            }`} />
          </div>
          
          <div className="flex-1">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
              {user.nombre} {user.apellido}
            </h4>
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-gray-500 dark:text-gray-400">
                {user.email}
              </span>
              <span className="text-gray-300 dark:text-gray-600">•</span>
              <span className="text-lime-500 dark:text-pink-400">
                {getRoleName(user.rol)}
              </span>
            </div>
          </div>

          <div className="text-xs text-gray-500 dark:text-gray-400">
            {user.ultimo_acceso ? (
              formatDistanceToNow(new Date(user.ultimo_acceso), {
                addSuffix: true,
                locale: es
              })
            ) : (
              'Nunca'
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentUsers;