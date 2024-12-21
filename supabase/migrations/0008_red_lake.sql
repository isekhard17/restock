/*
  # Fix storage policies and last access trigger

  1. Changes
    - Simplify storage policies for avatars
    - Add trigger for updating last access
*/

-- Simplify storage policies
DROP POLICY IF EXISTS "storage_public_read" ON storage.objects;
DROP POLICY IF EXISTS "storage_authenticated_insert" ON storage.objects;
DROP POLICY IF EXISTS "storage_authenticated_update" ON storage.objects;
DROP POLICY IF EXISTS "storage_authenticated_delete" ON storage.objects;

-- Create simple policies for avatars
CREATE POLICY "avatars_public_read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "avatars_insert"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'avatars');

-- Create function and trigger for last access
CREATE OR REPLACE FUNCTION update_ultimo_acceso()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE usuarios
  SET ultimo_acceso = NOW()
  WHERE id = auth.uid();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_sign_in ON auth.users;

CREATE TRIGGER on_auth_sign_in
  AFTER INSERT ON auth.sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_ultimo_acceso();