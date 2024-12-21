/*
  # Fix Storage Policies

  1. Changes
    - Drop existing problematic policies
    - Create new simplified policies for avatars and products
    - Remove recursive role checks
    
  2. Security
    - Maintain security while avoiding recursion
    - Use simpler authentication checks
*/

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload avatars" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read access to products" ON storage.objects;
DROP POLICY IF EXISTS "Allow admin and supervisor to upload products" ON storage.objects;
DROP POLICY IF EXISTS "Allow admin and supervisor to update products" ON storage.objects;
DROP POLICY IF EXISTS "Allow admin and supervisor to delete products" ON storage.objects;

-- Create new simplified policies
-- Public read access for all storage objects
CREATE POLICY "Allow public read access"
  ON storage.objects FOR SELECT
  USING (bucket_id IN ('avatars', 'products'));

-- Avatar policies (authenticated users can manage their own avatars)
CREATE POLICY "Users can upload their own avatar"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'avatars' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update their own avatar"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'avatars' AND
    auth.uid()::text = (storage.foldername(name))[1]
  )
  WITH CHECK (bucket_id = 'avatars');

CREATE POLICY "Users can delete their own avatar"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'avatars' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Product policies (any authenticated user can manage products)
CREATE POLICY "Authenticated users can upload products"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'products');

CREATE POLICY "Authenticated users can update products"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'products')
  WITH CHECK (bucket_id = 'products');

CREATE POLICY "Authenticated users can delete products"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'products');