/*
  # Simplificar sistema de autenticación

  1. Cambios
    - Eliminar triggers y funciones en orden correcto
    - Deshabilitar RLS
    - Crear nuevo trigger simplificado para registro
*/

-- Primero eliminar los triggers que dependen de las funciones
DROP TRIGGER IF EXISTS on_auth_sign_in ON auth.sessions;
DROP TRIGGER IF EXISTS on_session_created ON auth.sessions;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Ahora podemos eliminar las funciones de manera segura
DROP FUNCTION IF EXISTS update_ultimo_acceso();
DROP FUNCTION IF EXISTS handle_new_user();

-- Deshabilitar RLS en todas las tablas necesarias
ALTER TABLE usuarios DISABLE ROW LEVEL SECURITY;
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;

-- Limpiar políticas existentes
DROP POLICY IF EXISTS "allow_all_usuarios" ON usuarios;
DROP POLICY IF EXISTS "allow_all_storage" ON storage.objects;

-- Crear nuevo trigger simplificado
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO usuarios (
    id,
    email,
    nombre,
    apellido,
    rol,
    ultimo_acceso
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE((NEW.raw_user_meta_data->>'nombre')::text, ''),
    COALESCE((NEW.raw_user_meta_data->>'apellido')::text, ''),
    'operador',
    CURRENT_TIMESTAMP
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recrear trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();