import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface AuthLinkProps {
  to: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

const AuthLink: React.FC<AuthLinkProps> = ({ to, children, variant = 'secondary', className = '' }) => {
  const baseStyles = "relative inline-block px-2 py-1 rounded-lg transition-colors duration-200";
  const variants = {
    primary: "text-lime-500 dark:text-pink-400 hover:text-lime-600 dark:hover:text-pink-300",
    secondary: "text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
  };

  return (
    <Link to={to} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-current"
        initial={{ width: 0 }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.2 }}
      />
    </Link>
  );
};

export default AuthLink;