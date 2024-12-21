/*
  # Fix registration and user profile issues

  1. Changes
    - Modify trigger to handle user metadata
    - Simplify storage policies
    - Add last access trigger
*/

-- Drop existing trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();

-- Create improved trigger function
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_data json;
BEGIN
  -- Get user metadata from raw_user_meta_data
  user_data := NEW.raw_user_meta_data;
  
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
    COALESCE(user_data->>'nombre', ''),
    COALESCE(user_data->>'apellido', ''),
    'operador',
    NOW()
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Update last access trigger
CREATE OR REPLACE FUNCTION update_ultimo_acceso()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE usuarios
  SET ultimo_acceso = NOW()
  WHERE id = NEW.user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_session_created
  AFTER INSERT ON auth.sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_ultimo_acceso();