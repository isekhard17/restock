import React from 'react';
import { motion } from 'framer-motion';
import LocationsHeader from './components/LocationsHeader';
import LocationsList from './components/LocationsList';
import LocationsMap from './components/LocationsMap';

const LocationsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <LocationsHeader />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2"
        >
          <LocationsList />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <LocationsMap />
        </motion.div>
      </div>
    </div>
  );
};

export default LocationsPage;