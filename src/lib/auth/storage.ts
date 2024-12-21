import { StoredAuth } from './types';
import { Usuario } from '../../types/database.types';

const AUTH_KEY = 'restock_auth';
const USER_KEY = 'restock_user';

export const storage = {
  getAuth: (): StoredAuth | null => {
    const stored = localStorage.getItem(AUTH_KEY);
    return stored ? JSON.parse(stored) : null;
  },

  getUser: (): Usuario | null => {
    const stored = localStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored) : null;
  },

  setAuth: (auth: StoredAuth) => {
    localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
  },

  setUser: (user: Usuario) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  clear: () => {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(USER_KEY);
  }
};