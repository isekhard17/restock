import { useState, useEffect } from 'react';
import { Usuario } from '../types/database.types';
import { storage } from '../lib/auth/storage';
import { session } from '../lib/auth/session';
import { supabase } from '../lib/supabase';

export function useAuth() {
  const [user, setUser] = useState<Usuario | null>(storage.getUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Check if we have a valid session in storage
        if (session.isValid()) {
          setUser(storage.getUser());
          setLoading(false);
          return;
        }

        // Try to get session from Supabase
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        
        if (currentSession) {
          const userData = await session.store(currentSession);
          setUser(userData);
        } else {
          session.clear();
          setUser(null);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        session.clear();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      if (event === 'SIGNED_IN' && newSession) {
        const userData = await session.store(newSession);
        setUser(userData);
      } else if (event === 'SIGNED_OUT') {
        session.clear();
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
}