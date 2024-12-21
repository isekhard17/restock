import React, { useState } from 'react';
import { Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TipsModal from './TipsModal';

const TipsButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-3 bg-lime-500 dark:bg-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
      >
        <Lightbulb className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && <TipsModal onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
    </>
  );
};

export default TipsButton;