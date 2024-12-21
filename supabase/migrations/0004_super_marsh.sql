/*
  # Create Products Storage Bucket

  1. New Storage
    - Create 'products' bucket for product images
      - Public access enabled
      - 5MB file size limit
      - Only images allowed
  
  2. Security
    - Enable public access for reading
    - Only admin and supervisor can upload/modify images
*/

-- Create the products bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'products',
  'products',
  true,
  5242880, -- 5MB in bytes
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']::text[]
);

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Admin and supervisor can upload product images" ON storage.objects;
DROP POLICY IF EXISTS "Admin and supervisor can update product images" ON storage.objects;
DROP POLICY IF EXISTS "Admin and supervisor can delete product images" ON storage.objects;

-- Re-create policies with unique names
CREATE POLICY "Allow public read access to products" 
  ON storage.objects FOR SELECT
  USING (bucket_id = 'products');

CREATE POLICY "Allow admin and supervisor to upload products" 
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'products' AND
    EXISTS (
      SELECT 1 FROM usuarios 
      WHERE id = auth.uid() 
      AND rol IN ('admin', 'supervisor')
    )
  );

CREATE POLICY "Allow admin and supervisor to update products" 
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'products' AND
    EXISTS (
      SELECT 1 FROM usuarios 
      WHERE id = auth.uid() 
      AND rol IN ('admin', 'supervisor')
    )
  )
  WITH CHECK (bucket_id = 'products');

CREATE POLICY "Allow admin and supervisor to delete products" 
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'products' AND
    EXISTS (
      SELECT 1 FROM usuarios 
      WHERE id = auth.uid() 
      AND rol IN ('admin', 'supervisor')
    )
  );