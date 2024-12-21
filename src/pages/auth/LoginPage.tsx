import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useTheme } from '../../hooks/useTheme';
import RestockLogo from '../../components/icons/RestockLogo';
import AuthLink from '../../components/ui/AuthLink';
import { Moon, Sun, Mail, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuthStore();
  const { theme, toggleTheme } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 transition-all duration-300">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm w-full max-w-md rounded-3xl shadow-2xl dark:shadow-2xl p-8 border border-gray-200 dark:border-gray-700"
      >
        <button
          onClick={toggleTheme}
          className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          ) : (
            <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          )}
        </button>

        <div className="flex flex-col items-center mb-8">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <RestockLogo className="w-24 h-24 mb-4" />
          </motion.div>
          <motion.h1 
            className="text-4xl font-bold bg-gradient-to-r from-lime-500 to-lime-600 dark:from-pink-500 dark:to-pink-600 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            RESTOCK
          </motion.h1>
          <motion.h2 
            className="text-xl text-gray-600 dark:text-gray-300 mt-2 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Sistema de Inventario
          </motion.h2>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 px-4 py-3 rounded-xl mb-6 text-sm"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 
                       bg-white dark:bg-gray-700/50 text-gray-900 dark:text-white
                       focus:border-lime-400 dark:focus:border-pink-500 
                       focus:ring-2 focus:ring-lime-100 dark:focus:ring-pink-200/20 
                       outline-none transition-all placeholder-gray-400 dark:placeholder-gray-500"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 
                       bg-white dark:bg-gray-700/50 text-gray-900 dark:text-white
                       focus:border-lime-400 dark:focus:border-pink-500 
                       focus:ring-2 focus:ring-lime-100 dark:focus:ring-pink-200/20 
                       outline-none transition-all placeholder-gray-400 dark:placeholder-gray-500"
              required
            />
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
              w-full bg-gradient-to-r from-lime-400 to-lime-500 dark:from-pink-500 dark:to-pink-600
              text-white py-3 px-4 rounded-xl font-medium
              hover:from-lime-500 hover:to-lime-600 dark:hover:from-pink-600 dark:hover:to-pink-700
              focus:outline-none focus:ring-2 focus:ring-lime-200 dark:focus:ring-pink-400/50
              transition-all duration-200 animate-gradient bg-[length:200%_auto]
              ${loading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <AuthLink to="/forgot-password">
            ¿Olvidaste tu contraseña?
          </AuthLink>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
          <span className="text-gray-500 dark:text-gray-400 text-sm">¿No tienes una cuenta?</span>
          <AuthLink to="/register" variant="primary" className="ml-2">
            Regístrate aquí
          </AuthLink>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;