import React, { useState } from 'react';
import { ValidationError } from '../../hooks/useFormValidation';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FormInputProps {
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  icon: LucideIcon;
  required?: boolean;
  validate?: (value: string) => ValidationError;
  formatValue?: (value: string) => string;
}

const FormInput: React.FC<FormInputProps> = ({
  type,
  name,
  value,
  onChange,
  placeholder,
  icon: Icon,
  required = false,
  validate,
  formatValue
}) => {
  const [error, setError] = useState<ValidationError>({ hasError: false, message: '' });
  const [touched, setTouched] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    
    // Solo aplicar el formateo si existe la función y hay un valor
    if (formatValue && newValue) {
      newValue = formatValue(newValue);
    }
    
    // Crear un nuevo evento con el valor formateado
    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        value: newValue,
        name: name
      }
    };
    
    onChange(syntheticEvent);

    if (validate && touched) {
      setError(validate(newValue));
    }
  };

  const handleBlur = () => {
    setTouched(true);
    if (validate && value) {
      setError(validate(value));
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <Icon className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
          error.hasError && touched ? 'text-red-400' : 'text-gray-400'
        }`} />
        
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          required={required}
          className={`
            w-full pl-11 pr-4 py-2.5 rounded-lg
            bg-white dark:bg-gray-700
            border ${error.hasError && touched 
              ? 'border-red-300 dark:border-red-500' 
              : 'border-gray-200 dark:border-gray-600'
            }
            text-gray-900 dark:text-white
            placeholder-gray-400 dark:placeholder-gray-500
            focus:outline-none focus:ring-2
            ${error.hasError && touched
              ? 'focus:ring-red-100 dark:focus:ring-red-900/30 focus:border-red-400'
              : 'focus:ring-lime-100 dark:focus:ring-pink-900/30 focus:border-lime-400 dark:focus:border-pink-500'
            }
            transition-all duration-200
          `}
        />
      </div>

      <AnimatePresence>
        {error.hasError && touched && (
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-0 top-full mt-1 text-xs text-red-500 dark:text-red-400"
          >
            {error.message}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FormInput;