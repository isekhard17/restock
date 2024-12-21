/*
  # Corregir sistema de autenticación

  1. Cambios
    - Simplificar el sistema de autenticación
    - Eliminar triggers problemáticos
    - Establecer políticas RLS correctas
    - Asegurar que la creación de usuarios funcione correctamente
*/

-- Primero, eliminar todos los triggers y funciones existentes
DROP TRIGGER IF EXISTS on_auth_sign_in ON auth.sessions;
DROP TRIGGER IF EXISTS on_session_created ON auth.sessions;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS update_ultimo_acceso() CASCADE;
DROP FUNCTION IF EXISTS handle_new_user() CASCADE;

-- Limpiar todas las políticas existentes
DROP POLICY IF EXISTS "allow_all_usuarios" ON usuarios;
DROP POLICY IF EXISTS "allow_all_storage" ON storage.objects;

-- Habilitar RLS en las tablas principales
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Crear nueva función para manejar la creación de usuarios
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.usuarios (
    id,
    email,
    nombre,
    apellido,
    rol,
    activo,
    ultimo_acceso
  ) VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'nombre', ''),
    COALESCE(NEW.raw_user_meta_data->>'apellido', ''),
    'operador',
    true,
    CURRENT_TIMESTAMP
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Crear nuevo trigger para la creación de usuarios
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Establecer políticas RLS básicas
-- Política para usuarios: permitir lectura a usuarios autenticados
CREATE POLICY "usuarios_read"
  ON public.usuarios
  FOR SELECT
  TO authenticated
  USING (true);

-- Política para usuarios: permitir actualización de datos propios
CREATE POLICY "usuarios_update_own"
  ON public.usuarios
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Políticas para storage
-- Permitir lectura pública de avatares
CREATE POLICY "storage_read"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'avatars');

-- Permitir a usuarios autenticados subir avatares
CREATE POLICY "storage_insert"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'avatars');

-- Permitir a usuarios autenticados actualizar sus propios avatares
CREATE POLICY "storage_update"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = (storage.foldername(name))[1])
  WITH CHECK (bucket_id = 'avatars');