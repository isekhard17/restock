import { useState, useCallback } from 'react';

export interface ValidationError {
  hasError: boolean;
  message: string;
}

export const useFormValidation = () => {
  const validateEmail = (email: string): ValidationError => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return {
      hasError: !emailRegex.test(email),
      message: 'Ingresa un correo electrónico válido'
    };
  };

  const validatePassword = (password: string): ValidationError => {
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);

    if (!hasMinLength) {
      return {
        hasError: true,
        message: 'La contraseña debe tener al menos 8 caracteres'
      };
    }

    if (!hasUpperCase || !hasLowerCase || !hasNumber) {
      return {
        hasError: true,
        message: 'La contraseña debe incluir mayúsculas, minúsculas y números'
      };
    }

    return { hasError: false, message: '' };
  };

  const validateName = (name: string): ValidationError => {
    return {
      hasError: !name.trim(),
      message: 'Este campo es requerido'
    };
  };

  return {
    validateEmail,
    validatePassword,
    validateName
  };
};

export const useInputFormat = () => {
  const formatName = (value: string): string => {
    if (!value) return value;
    return value
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return { formatName };
};