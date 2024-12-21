import { toast } from 'sonner';

interface ErrorMessages {
  [key: string]: string;
}

const AUTH_ERRORS: ErrorMessages = {
  'user_already_exists': 'Este correo electrónico ya está registrado',
  'invalid_credentials': 'Correo electrónico o contraseña incorrectos',
  'email_not_confirmed': 'Por favor, confirma tu correo electrónico',
  'invalid_email': 'El correo electrónico no es válido',
  'weak_password': 'La contraseña es demasiado débil',
};

const STORAGE_ERRORS: ErrorMessages = {
  'bucket_not_found': 'Error al subir la imagen, intenta de nuevo',
  'storage_quota_exceeded': 'No se puede subir la imagen, espacio excedido',
  'invalid_file_type': 'Tipo de archivo no permitido',
};

export const handleAuthError = (error: any) => {
  console.error('Auth Error:', error);
  
  const errorCode = error?.code || error?.message;
  const customMessage = AUTH_ERRORS[errorCode] || 'Error al procesar la solicitud';
  
  toast.error(customMessage, {
    description: 'Por favor, intenta de nuevo',
    duration: 5000,
  });
  
  return customMessage;
};

export const handleStorageError = (error: any) => {
  console.error('Storage Error:', error);
  
  const errorCode = error?.code || error?.message;
  const customMessage = STORAGE_ERRORS[errorCode] || 'Error al procesar el archivo';
  
  toast.error(customMessage, {
    description: 'Por favor, intenta con otro archivo',
    duration: 5000,
  });
  
  return customMessage;
};