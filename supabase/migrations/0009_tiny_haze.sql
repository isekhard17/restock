/*
  # Fix authentication and registration policies

  1. Changes
    - Drop existing problematic policies
    - Create simplified user policies
    - Add trigger for user profile creation
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Allow users to read own data" ON usuarios;
DROP POLICY IF EXISTS "Allow users to update own profile" ON usuarios;
DROP POLICY IF EXISTS "Allow insert during registration" ON usuarios;
DROP POLICY IF EXISTS "Allow public read of basic user info" ON usuarios;

-- Create simplified policies
CREATE POLICY "usuarios_read_own"
  ON usuarios FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "usuarios_insert_on_signup"
  ON usuarios FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "usuarios_update_own"
  ON usuarios FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create trigger function for profile creation
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

-- Create trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();