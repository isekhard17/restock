import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface Config {
  nombre_empresa: string;
  logo_url?: string;
  tema_claro: any;
  tema_oscuro: any;
}

interface ConfigState {
  config: Config | null;
  loading: boolean;
  error: string | null;
  loadConfig: () => Promise<void>;
}

export const useConfigStore = create<ConfigState>((set) => ({
  config: null,
  loading: false,
  error: null,

  loadConfig: async () => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase
        .from('configuracion')
        .select('*')
        .single();

      if (error) throw error;
      set({ config: data });
    } catch (error) {
      console.error('Error loading config:', error);
      set({ error: 'Error al cargar la configuración' });
    } finally {
      set({ loading: false });
    }
  }
}));