import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

interface Location {
  id: string;
  estante: string;
  seccion: string;
  nivel: string;
  descripcion?: string;
}

interface LocationsState {
  locations: Location[];
  loading: boolean;
  error: string | null;
  totalLocations: number;
  addLocation: (location: Omit<Location, 'id'>) => Promise<void>;
  loadLocations: () => Promise<void>;
}

export const useLocationsStore = create<LocationsState>((set, get) => ({
  locations: [],
  loading: false,
  error: null,
  totalLocations: 0,

  addLocation: async (locationData) => {
    try {
      set({ loading: true });

      const { data, error } = await supabase
        .from('ubicaciones')
        .insert([locationData])
        .select()
        .single();

      if (error) throw error;

      set(state => ({
        locations: [...state.locations, data],
        totalLocations: state.totalLocations + 1
      }));

    } catch (error: any) {
      console.error('Error adding location:', error);
      if (error.code === '23505') {
        toast.error('Esta ubicación ya existe');
      } else {
        toast.error('Error al agregar la ubicación');
      }
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  loadLocations: async () => {
    try {
      set({ loading: true });
      
      const { data, error, count } = await supabase
        .from('ubicaciones')
        .select('*', { count: 'exact' });

      if (error) throw error;

      set({ 
        locations: data || [], 
        totalLocations: count || 0 
      });
    } catch (error) {
      console.error('Error loading locations:', error);
      set({ error: 'Error al cargar las ubicaciones' });
    } finally {
      set({ loading: false });
    }
  }
}));