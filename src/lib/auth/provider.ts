import { supabase } from '../supabase';
import { storage } from './storage';
import { Usuario } from '../../types/database.types';

export const authProvider = {
  /**
   * Initialize auth state from storage or session
   */
  initialize: async (): Promise<Usuario | null> => {
    try {
      // Check storage first
      if (storage.getAuth() && storage.getUser()) {
        return storage.getUser();
      }

      // Check Supabase session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        storage.clear();
        return null;
      }

      // Get user data
      const { data: user } = await supabase
        .from('usuarios')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (user) {
        storage.setAuth({
          access_token: session.access_token,
          refresh_token: session.refresh_token,
          expires_at: new Date(session.expires_at!).getTime()
        });
        storage.setUser(user);
        return user;
      }

      return null;
    } catch (error) {
      console.error('Auth initialization error:', error);
      storage.clear();
      return null;
    }
  },

  /**
   * Sign in user
   */
  signIn: async (email: string, password: string): Promise<Usuario> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    if (!data.session) throw new Error('No session data');

    const { data: user } = await supabase
      .from('usuarios')
      .select('*')
      .eq('id', data.session.user.id)
      .single();

    if (!user) throw new Error('User not found');

    storage.setAuth({
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      expires_at: new Date(data.session.expires_at!).getTime()
    });
    storage.setUser(user);

    return user;
  },

  /**
   * Sign out user
   */
  signOut: async (): Promise<void> => {
    await supabase.auth.signOut();
    storage.clear();
  }
};