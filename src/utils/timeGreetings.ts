import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const getTimeBasedGreeting = () => {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 12) {
    return 'Buenos días';
  } else if (hour >= 12 && hour < 19) {
    return 'Buenas tardes';
  } else {
    return 'Buenas noches';
  }
};

export const formatTimeForGreeting = () => {
  return format(new Date(), 'HH:mm', { locale: es });
};

export const getTimeContext = () => {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 12) {
    return {
      greeting: 'Buenos días',
      context: 'Comienza tu día con energía',
      icon: '☀️'
    };
  } else if (hour >= 12 && hour < 19) {
    return {
      greeting: 'Buenas tardes',
      context: 'Continúa con tu productividad',
      icon: '🌤️'
    };
  } else if (hour >= 19 && hour < 23) {
    return {
      greeting: 'Buenas noches',
      context: 'Revisa el resumen del día',
      icon: '🌙'
    };
  } else {
    return {
      greeting: 'Buenas noches',
      context: 'Trabajando hasta tarde',
      icon: '🌑'
    };
  }
};