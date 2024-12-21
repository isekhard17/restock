import { create } from 'zustand';
import { toast } from 'sonner';
import { authProvider } from '../lib/auth/provider';
import { handleAuthError } from '../utils/errorHandler';
import { Usuario } from '../types/database.types';
import { supabase } from '../lib/supabase';

interface AuthState {
  user: Usuario | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,
  initialized: false,

  initialize: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        const { data: userData, error: userError } = await supabase
          .from('usuarios')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (userError) throw userError;

        // Check if user is active
        if (!userData.activo) {
          await supabase.auth.signOut();
          set({ user: null, initialized: true });
          return;
        }

        set({ user: userData });
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
    } finally {
      set({ initialized: true });
    }
  },

  login: async (email: string, password: string) => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      // Get user data and check status
      const { data: userData, error: userError } = await supabase
        .from('usuarios')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (userError) throw userError;

      // Check if user is active
      if (!userData.activo) {
        await supabase.auth.signOut();
        throw new Error('inactive_user');
      }

      set({ user: userData });
      toast.success('¡Bienvenido de vuelta!');
    } catch (error: any) {
      const errorMessage = error.message === 'inactive_user' 
        ? 'Tu cuenta ha sido desactivada'
        : handleAuthError(error);
      
      set({ error: errorMessage });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      set({ loading: true, error: null });
      await supabase.auth.signOut();
      set({ user: null });
      toast.success('¡Hasta pronto!');
    } catch (error) {
      const errorMessage = handleAuthError(error);
      set({ error: errorMessage });
      throw error;
    } finally {
      set({ loading: false });
    }
  }
}));