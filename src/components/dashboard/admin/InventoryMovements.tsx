import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Package, Calendar, User, Clock } from 'lucide-react';
import { useInventoryMovements } from '../../../hooks/useInventoryMovements';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const InventoryMovements: React.FC = () => {
  const { movements, loading, error } = useInventoryMovements();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
    >
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Movimientos de Inventario
            </h3>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Últimos 7 días
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <div className="p-8 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lime-500 dark:border-pink-500" />
          </div>
        ) : error ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            Error al cargar los movimientos
          </div>
        ) : movements.length === 0 ? (
          <div className="p-8 text-center">
            <Package className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400">
              No hay movimientos registrados en los últimos 7 días
            </p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900/50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Producto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Cantidad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Usuario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Fecha
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {movements.map((movement, index) => (
                <motion.tr
                  key={movement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {movement.tipo === 'entrada' ? (
                        <div className="p-1.5 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg">
                          <ArrowDownRight className="w-4 h-4 text-emerald-500" />
                        </div>
                      ) : (
                        <div className="p-1.5 bg-rose-50 dark:bg-rose-900/30 rounded-lg">
                          <ArrowUpRight className="w-4 h-4 text-rose-500" />
                        </div>
                      )}
                      <span className={`text-sm font-medium ${
                        movement.tipo === 'entrada'
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-rose-600 dark:text-rose-400'
                      }`}>
                        {movement.tipo === 'entrada' ? 'Entrada' : 'Salida'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-900 dark:text-white">
                        {movement.producto.nombre}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900 dark:text-white">
                      {movement.cantidad} unidades
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900 dark:text-white">
                        {movement.usuario.nombre}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {format(new Date(movement.created_at), "d 'de' MMMM", { locale: es })}
                      </span>
                      <Clock className="w-4 h-4 text-gray-400 ml-2" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {format(new Date(movement.created_at), "HH:mm", { locale: es })}
                      </span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </motion.div>
  );
};

export default InventoryMovements;