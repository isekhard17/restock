import { supabase } from './supabase';
import { Usuario } from '../types/database.types';

const AUTH_KEY = 'restock_auth';
const USER_KEY = 'restock_user';

interface StoredAuth {
  access_token: string;
  refresh_token: string;
  expires_at: number;
}

export const auth = {
  getStoredAuth: (): StoredAuth | null => {
    const stored = localStorage.getItem(AUTH_KEY);
    return stored ? JSON.parse(stored) : null;
  },

  getStoredUser: (): Usuario | null => {
    const stored = localStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored) : null;
  },

  storeSession: async (session: any) => {
    const authData: StoredAuth = {
      access_token: session.access_token,
      refresh_token: session.refresh_token,
      expires_at: Date.now() + (session.expires_in || 3600) * 1000
    };
    
    localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
    
    // Fetch and store user data
    const { data: user } = await supabase
      .from('usuarios')
      .select('*')
      .eq('id', session.user.id)
      .single();
      
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
    
    return user;
  },

  clearSession: () => {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(USER_KEY);
  },

  isSessionValid: (): boolean => {
    const storedAuth = auth.getStoredAuth();
    if (!storedAuth) return false;
    return Date.now() < storedAuth.expires_at;
  }
};