/**
 * Tipos para las tablas de la base de datos
 */

export interface Usuario {
  id: string;
  email: string;
  nombre: string;
  apellido: string;
  rol: 'admin' | 'supervisor' | 'operador';
  activo: boolean;
  foto_url?: string;
  ultimo_acceso?: string;
  created_at: string;
  updated_at: string;
}

export interface Producto {
  id: string;
  codigo_barra: string;
  nombre: string;
  descripcion?: string;
  categoria: string;
  minimo_stock: number;
  img_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Ubicacion {
  id: string;
  estante: string;
  seccion: string;
  nivel: string;
  descripcion?: string;
  created_at: string;
  updated_at: string;
}

export interface Inventario {
  id: string;
  producto_id: string;
  ubicacion_id: string;
  cantidad: number;
  lote?: string;
  fecha_vencimiento?: string;
  created_at: string;
  updated_at: string;
}