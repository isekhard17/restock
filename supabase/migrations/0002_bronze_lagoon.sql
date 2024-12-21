/*
  # Add product image support

  1. Changes
    - Add `img_url` column to `productos` table for storing product images
*/

ALTER TABLE productos
ADD COLUMN img_url text;

-- Update existing policies to include the new column
DROP POLICY IF EXISTS "Todos pueden ver productos" ON productos;
DROP POLICY IF EXISTS "Admin y supervisor pueden gestionar productos" ON productos;

CREATE POLICY "Todos pueden ver productos" 
  ON productos FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Admin y supervisor pueden gestionar productos" 
  ON productos FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM usuarios WHERE id = auth.uid() AND rol IN ('admin', 'supervisor')
  ));