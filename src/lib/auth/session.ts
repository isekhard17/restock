import { supabase } from '../supabase';
import { storage } from './storage';
import { Usuario } from '../../types/database.types';

export const session = {
  store: async (session: any): Promise<Usuario | null> => {
    const authData = {
      access_token: session.access_token,
      refresh_token: session.refresh_token,
      expires_at: Date.now() + (session.expires_in || 3600) * 1000
    };
    
    storage.setAuth(authData);
    
    const { data: user } = await supabase
      .from('usuarios')
      .select('*')
      .eq('id', session.user.id)
      .single();
      
    if (user) {
      storage.setUser(user);
      return user;
    }
    
    return null;
  },

  isValid: (): boolean => {
    const auth = storage.getAuth();
    if (!auth) return false;
    return Date.now() < auth.expires_at;
  },

  clear: () => {
    storage.clear();
  }
};