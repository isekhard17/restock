import React from 'react';
import { motion } from 'framer-motion';
import { useConfigStore } from '../../../store/configStore';
import RestockLogo from '../../icons/RestockLogo';

const CompanyLogo: React.FC = () => {
  const { config } = useConfigStore();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center space-x-3"
    >
      {config?.logo_url ? (
        <img 
          src={config.logo_url} 
          alt={config.nombre_empresa}
          className="w-8 h-8 rounded object-contain"
        />
      ) : (
        <RestockLogo className="w-8 h-8" />
      )}
      <span className="text-xl font-semibold text-gray-800 dark:text-white">
        {config?.nombre_empresa || 'Restock'}
      </span>
    </motion.div>
  );
};

export default CompanyLogo;