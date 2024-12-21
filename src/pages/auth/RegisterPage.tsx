import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useTheme } from '../../hooks/useTheme';
import { useFormValidation, useInputFormat } from '../../hooks/useFormValidation';
import RestockLogo from '../../components/icons/RestockLogo';
import { FormInput, ImageUpload, AuthLink } from '../../components/ui';
import { Moon, Sun, Mail, Lock, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  nombre: string;
  apellido: string;
  foto?: File | null;
}

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    nombre: '',
    apellido: '',
    foto: null,
  });

  const { register, loading } = useAuthStore();
  const { theme, toggleTheme } = useTheme();
  const { validateEmail, validatePassword, validateName } = useFormValidation();
  const { formatName } = useInputFormat();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (file: File | null) => {
    setFormData(prev => ({ ...prev, foto: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validaciones
    const emailValidation = validateEmail(formData.email);
    const passwordValidation = validatePassword(formData.password);
    const nombreValidation = validateName(formData.nombre);
    const apellidoValidation = validateName(formData.apellido);

    if (emailValidation.hasError || passwordValidation.hasError || 
        nombreValidation.hasError || apellidoValidation.hasError) {
      toast.error('Por favor, verifica los campos del formulario');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    try {
      await register(formData);
      toast.success('¡Cuenta creada exitosamente!');
      navigate('/login');
    } catch (err) {
      toast.error('Error al crear la cuenta');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm w-full max-w-md rounded-2xl shadow-xl p-8"
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <RestockLogo className="w-10 h-10" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Crear cuenta
            </h1>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            )}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center mb-6">
            <ImageUpload
              onChange={handleImageChange}
              value={formData.foto}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormInput
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Nombre"
              icon={User}
              validate={validateName}
              formatValue={formatName}
            />

            <FormInput
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              placeholder="Apellido"
              icon={User}
              validate={validateName}
              formatValue={formatName}
            />
          </div>

          <FormInput
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Correo electrónico"
            icon={Mail}
            validate={validateEmail}
          />

          <FormInput
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Contraseña"
            icon={Lock}
            validate={validatePassword}
          />

          <FormInput
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirmar contraseña"
            icon={Lock}
            validate={(value) => ({
              hasError: value !== formData.password,
              message: 'Las contraseñas no coinciden'
            })}
          />

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={`
              w-full py-3 px-4 rounded-xl font-medium
              bg-gradient-to-r from-lime-500 to-lime-600 dark:from-pink-500 dark:to-pink-600
              text-white shadow-lg hover:shadow-xl
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200
            `}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Creando cuenta...
              </div>
            ) : (
              'Crear cuenta'
            )}
          </motion.button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-gray-500 dark:text-gray-400">
            ¿Ya tienes una cuenta?
          </span>
          <AuthLink to="/login" variant="primary" className="ml-2">
            Inicia sesión
          </AuthLink>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;