import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Tag, Archive, Trash2, Edit, Eye } from 'lucide-react';
import { useProductsStore } from '../../../store/productsStore';
import { formatCurrency } from '../../../utils/formatters';

const ProductsList: React.FC = () => {
  const { products, loadProducts, loading } = useProductsStore();

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  if (loading) {
    return (
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="p-12 text-center">
        <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No hay productos
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Comienza agregando tu primer producto
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-video relative overflow-hidden bg-gray-100 dark:bg-gray-900">
                {product.img_url ? (
                  <img
                    src={product.img_url}
                    alt={product.nombre}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                <div className="absolute top-2 right-2 flex gap-1">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-1.5 bg-white/90 dark:bg-gray-800/90 rounded-lg text-gray-600 dark:text-gray-300 hover:text-lime-500 dark:hover:text-pink-400"
                  >
                    <Eye className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-1.5 bg-white/90 dark:bg-gray-800/90 rounded-lg text-gray-600 dark:text-gray-300 hover:text-lime-500 dark:hover:text-pink-400"
                  >
                    <Edit className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-1.5 bg-white/90 dark:bg-gray-800/90 rounded-lg text-gray-600 dark:text-gray-300 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                  {product.nombre}
                </h3>
                
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Tag className="w-4 h-4 mr-2" />
                    {product.categoria}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Archive className="w-4 h-4 mr-2" />
                    Stock mínimo: {product.minimo_stock}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    Código de barras
                  </div>
                  <div className="text-sm font-mono text-gray-900 dark:text-white">
                    {product.codigo_barra}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductsList;