import React from 'react';
import { motion } from 'framer-motion';
import ProductsList from './components/ProductsList';
import ProductsHeader from './components/ProductsHeader';
import { useProductsStore } from '../../store/productsStore';

const ProductsPage: React.FC = () => {
  const { loading } = useProductsStore();

  return (
    <div className="space-y-6">
      <ProductsHeader />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm"
      >
        <ProductsList />
      </motion.div>
    </div>
  );
};

export default ProductsPage;