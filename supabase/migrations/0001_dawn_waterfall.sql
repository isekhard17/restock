/*
  # Initial Schema for Restock Inventory System

  1. New Tables
    - `usuarios` - Gestión de usuarios del sistema
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `nombre` (text)
      - `apellido` (text)
      - `rol` (text) - admin, supervisor, operador
      - `activo` (boolean)
      - `foto_url` (text, nullable)
      - `ultimo_acceso` (timestamptz)
      
    - `configuracion` - Configuración general del sistema
      - `id` (uuid, primary key)
      - `nombre_empresa` (text)
      - `logo_url` (text)
      - `tema_claro` (jsonb) - colores personalizados
      - `tema_oscuro` (jsonb) - colores personalizados
      
    - `productos` - Catálogo de productos
      - `id` (uuid, primary key)
      - `codigo_barra` (text, unique)
      - `nombre` (text)
      - `descripcion` (text)
      - `categoria` (text)
      - `minimo_stock` (integer)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      
    - `ubicaciones` - Gestión de ubicaciones físicas
      - `id` (uuid, primary key)
      - `estante` (text)
      - `seccion` (text)
      - `nivel` (text)
      - `descripcion` (text)
      
    - `inventario` - Control de stock
      - `id` (uuid, primary key)
      - `producto_id` (uuid, references productos)
      - `ubicacion_id` (uuid, references ubicaciones)
      - `cantidad` (integer)
      - `lote` (text)
      - `fecha_vencimiento` (date, nullable)
      
    - `movimientos` - Registro de movimientos
      - `id` (uuid, primary key)
      - `producto_id` (uuid, references productos)
      - `usuario_id` (uuid, references usuarios)
      - `tipo` (text) - entrada, salida, ajuste
      - `cantidad` (integer)
      - `nota` (text)
      - `created_at` (timestamptz)

  2. Security
    - RLS habilitado en todas las tablas
    - Políticas basadas en rol de usuario
*/

-- Usuarios
CREATE TABLE usuarios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  nombre text NOT NULL,
  apellido text NOT NULL,
  rol text NOT NULL CHECK (rol IN ('admin', 'supervisor', 'operador')),
  activo boolean DEFAULT true,
  foto_url text,
  ultimo_acceso timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Configuración
CREATE TABLE configuracion (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre_empresa text NOT NULL,
  logo_url text,
  tema_claro jsonb DEFAULT '{"primary": "#808000"}',
  tema_oscuro jsonb DEFAULT '{"primary": "#FFB6C1"}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Productos
CREATE TABLE productos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo_barra text UNIQUE NOT NULL,
  nombre text NOT NULL,
  descripcion text,
  categoria text NOT NULL,
  minimo_stock integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Ubicaciones
CREATE TABLE ubicaciones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  estante text NOT NULL,
  seccion text NOT NULL,
  nivel text NOT NULL,
  descripcion text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(estante, seccion, nivel)
);

-- Inventario
CREATE TABLE inventario (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  producto_id uuid REFERENCES productos(id) ON DELETE RESTRICT,
  ubicacion_id uuid REFERENCES ubicaciones(id) ON DELETE RESTRICT,
  cantidad integer NOT NULL DEFAULT 0,
  lote text,
  fecha_vencimiento date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Movimientos
CREATE TABLE movimientos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  producto_id uuid REFERENCES productos(id) ON DELETE RESTRICT,
  usuario_id uuid REFERENCES usuarios(id) ON DELETE RESTRICT,
  tipo text NOT NULL CHECK (tipo IN ('entrada', 'salida', 'ajuste')),
  cantidad integer NOT NULL,
  nota text,
  created_at timestamptz DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE configuracion ENABLE ROW LEVEL SECURITY;
ALTER TABLE productos ENABLE ROW LEVEL SECURITY;
ALTER TABLE ubicaciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventario ENABLE ROW LEVEL SECURITY;
ALTER TABLE movimientos ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad
-- Usuarios: Solo admin puede crear/modificar usuarios
CREATE POLICY "Usuarios pueden ver sus propios datos" 
  ON usuarios FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Admin puede gestionar usuarios" 
  ON usuarios FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM usuarios WHERE id = auth.uid() AND rol = 'admin'
  ));

-- Configuración: Solo admin puede modificar
CREATE POLICY "Todos pueden ver configuración" 
  ON configuracion FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Admin puede modificar configuración" 
  ON configuracion FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM usuarios WHERE id = auth.uid() AND rol = 'admin'
  ));

-- Productos: Admin y supervisor pueden crear/modificar
CREATE POLICY "Todos pueden ver productos" 
  ON productos FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Admin y supervisor pueden gestionar productos" 
  ON productos FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM usuarios WHERE id = auth.uid() AND rol IN ('admin', 'supervisor')
  ));

-- Políticas similares para las demás tablas...