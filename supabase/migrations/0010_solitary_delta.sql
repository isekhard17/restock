/*
  # Remove all policies and simplify configuration

  1. Changes
    - Drop all existing policies
    - Enable RLS but allow all operations temporarily
    - Keep only essential triggers
*/

-- Drop all existing policies
DROP POLICY IF EXISTS "usuarios_read_own" ON usuarios;
DROP POLICY IF EXISTS "usuarios_insert_on_signup" ON usuarios;
DROP POLICY IF EXISTS "usuarios_update_own" ON usuarios;
DROP POLICY IF EXISTS "avatars_public_read" ON storage.objects;
DROP POLICY IF EXISTS "avatars_insert" ON storage.objects;

-- Create simple permissive policies
CREATE POLICY "allow_all_usuarios"
  ON usuarios FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "allow_all_storage"
  ON storage.objects FOR ALL
  USING (true)
  WITH CHECK (true);

-- Keep the user creation trigger
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO usuarios (id, email, nombre, apellido, rol)
  VALUES (
    NEW.id,
    NEW.email,
    '', -- Will be updated during registration
    '', -- Will be updated during registration
    'operador'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();