import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';
import { Usuario } from '../types/database.types';

interface UsersState {
  users: Usuario[];
  loading: boolean;
  error: string | null;
  totalUsers: number;
  stats: {
    total: number;
    active: number;
    inactive: number;
  };
  addUser: (user: any) => Promise<void>;
  updateUser: (id: string, user: any) => Promise<void>;
  updateUserStatus: (id: string, status: boolean) => Promise<void>;
  loadUsers: () => Promise<void>;
}

export const useUsersStore = create<UsersState>((set, get) => ({
  users: [],
  loading: false,
  error: null,
  totalUsers: 0,
  stats: {
    total: 0,
    active: 0,
    inactive: 0
  },

  addUser: async (userData) => {
    try {
      set({ loading: true });

      // Primero crear el usuario en auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            nombre: userData.nombre,
            apellido: userData.apellido
          }
        }
      });

      if (authError) throw authError;

      // Actualizar el rol y otros datos en la tabla usuarios
      const { error: updateError } = await supabase
        .from('usuarios')
        .update({
          rol: userData.rol,
          activo: true
        })
        .eq('id', authData.user!.id);

      if (updateError) throw updateError;

      // Si hay foto, subirla
      if (userData.foto) {
        const fileExt = userData.foto.name.split('.').pop();
        const fileName = `${authData.user!.id}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(fileName, userData.foto);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('avatars')
          .getPublicUrl(fileName);

        await supabase
          .from('usuarios')
          .update({ foto_url: publicUrl })
          .eq('id', authData.user!.id);
      }

      // Recargar usuarios
      await get().loadUsers();

    } catch (error: any) {
      console.error('Error adding user:', error);
      if (error.message.includes('already registered')) {
        toast.error('Este correo ya está registrado');
      } else {
        toast.error('Error al crear el usuario');
      }
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updateUser: async (id, userData) => {
    try {
      set({ loading: true });

      const updates: any = {
        nombre: userData.nombre,
        apellido: userData.apellido,
        rol: userData.rol
      };

      // Si hay foto nueva, subirla
      if (userData.foto) {
        const fileExt = userData.foto.name.split('.').pop();
        const fileName = `${id}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(fileName, userData.foto, { upsert: true });

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('avatars')
          .getPublicUrl(fileName);

        updates.foto_url = publicUrl;
      }

      const { error } = await supabase
        .from('usuarios')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      // Recargar usuarios
      await get().loadUsers();

    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Error al actualizar el usuario');
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updateUserStatus: async (id, status) => {
    try {
      set({ loading: true });

      const { error } = await supabase
        .from('usuarios')
        .update({ activo: status })
        .eq('id', id);

      if (error) throw error;

      // Actualizar el estado local
      set(state => ({
        users: state.users.map(user => 
          user.id === id ? { ...user, activo: status } : user
        ),
        stats: {
          ...state.stats,
          active: status 
            ? state.stats.active + 1 
            : state.stats.active - 1,
          inactive: status 
            ? state.stats.inactive - 1 
            : state.stats.inactive + 1
        }
      }));

    } catch (error) {
      console.error('Error updating user status:', error);
      toast.error('Error al actualizar el estado del usuario');
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  loadUsers: async () => {
    try {
      set({ loading: true });
      
      const { data, error, count } = await supabase
        .from('usuarios')
        .select('*', { count: 'exact' });

      if (error) throw error;

      const users = data || [];
      const activeUsers = users.filter(user => user.activo);

      set({ 
        users,
        totalUsers: count || 0,
        stats: {
          total: count || 0,
          active: activeUsers.length,
          inactive: (count || 0) - activeUsers.length
        }
      });
    } catch (error) {
      console.error('Error loading users:', error);
      set({ error: 'Error al cargar los usuarios' });
    } finally {
      set({ loading: false });
    }
  }
}));