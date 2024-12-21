import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

interface Product {
  id: string;
  nombre: string;
  codigo_barra: string;
  descripcion: string;
  categoria: string;
  minimo_stock: number;
  img_url?: string;
}

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  totalProducts: number;
  addProduct: (product: any) => Promise<void>;
  loadProducts: () => Promise<void>;
}

export const useProductsStore = create<ProductsState>((set, get) => ({
  products: [],
  loading: false,
  error: null,
  totalProducts: 0,

  addProduct: async (productData) => {
    try {
      set({ loading: true });

      let img_url;
      if (productData.imagen) {
        const fileExt = productData.imagen.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('products')
          .upload(fileName, productData.imagen);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('products')
          .getPublicUrl(fileName);

        img_url = publicUrl;
      }

      const { data, error } = await supabase
        .from('productos')
        .insert([{
          nombre: productData.nombre,
          codigo_barra: productData.codigo_barra,
          descripcion: productData.descripcion,
          categoria: productData.categoria,
          minimo_stock: productData.minimo_stock,
          img_url
        }])
        .select()
        .single();

      if (error) throw error;

      set(state => ({
        products: [...state.products, data],
        totalProducts: state.totalProducts + 1
      }));

    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Error al agregar el producto');
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  loadProducts: async () => {
    try {
      set({ loading: true });
      
      const { data, error, count } = await supabase
        .from('productos')
        .select('*', { count: 'exact' });

      if (error) throw error;

      set({ 
        products: data || [], 
        totalProducts: count || 0 
      });
    } catch (error) {
      console.error('Error loading products:', error);
      set({ error: 'Error al cargar los productos' });
    } finally {
      set({ loading: false });
    }
  }
}));