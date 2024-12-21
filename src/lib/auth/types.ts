import { Usuario } from '../../types/database.types';

export interface StoredAuth {
  access_token: string;
  refresh_token: string;
  expires_at: number;
}

export interface AuthState {
  user: Usuario | null;
  loading: boolean;
  initialized: boolean;
}