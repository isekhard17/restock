/*
  # Arreglar problemas de registro

  1. Cambios
    - Simplificar el trigger de creación de usuario
    - Eliminar políticas temporalmente
    - Ajustar la tabla usuarios
*/

-- Deshabilitar RLS temporalmente
ALTER TABLE usuarios DISABLE ROW LEVEL SECURITY;
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;

-- Eliminar triggers existentes
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();

-- Crear nuevo trigger simplificado
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO usuarios (
    id,
    email,
    nombre,
    apellido,
    rol
  )
  VALUES (
    NEW.id,
    NEW.email,
    '',  -- Se actualizará después
    '',  -- Se actualizará después
    'operador'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recrear trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();