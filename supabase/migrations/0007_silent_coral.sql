/*
  # Fix Storage Policies

  1. Changes
    - Drop existing storage policies
    - Create simpler, more permissive policies for registration flow
    
  2. Security
    - Allow public read access to all storage objects
    - Allow authenticated users to upload during registration
    - Simplify avatar upload process
*/

-- Drop existing storage policies
DROP POLICY IF EXISTS "Allow public read access" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload products" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update products" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete products" ON storage.objects;

-- Create new simplified policies
-- Public read access
CREATE POLICY "storage_public_read"
  ON storage.objects FOR SELECT
  USING (true);

-- Allow authenticated users to upload to any bucket
CREATE POLICY "storage_authenticated_insert"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update their uploads
CREATE POLICY "storage_authenticated_update"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (auth.uid() = owner)
  WITH CHECK (true);

-- Allow authenticated users to delete their uploads
CREATE POLICY "storage_authenticated_delete"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (auth.uid() = owner);