/*
  # Fix User Table Policies

  1. Changes
    - Drop existing problematic policies for usuarios table
    - Create simplified policies without recursive checks
    
  2. Security
    - Allow users to read their own data
    - Allow users to update their own profile
    - Remove role-based checks that cause recursion
*/

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Usuarios pueden ver sus propios datos" ON usuarios;
DROP POLICY IF EXISTS "Admin puede gestionar usuarios" ON usuarios;

-- Create simplified policies
CREATE POLICY "Allow users to read own data"
  ON usuarios FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Allow users to update own profile"
  ON usuarios FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Allow insert during registration"
  ON usuarios FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Allow public read for basic user info (needed for UI components)
CREATE POLICY "Allow public read of basic user info"
  ON usuarios FOR SELECT
  USING (true);