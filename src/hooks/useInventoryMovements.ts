import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Movement {
  id: string;
  tipo: 'entrada' | 'salida';
  cantidad: number;
  created_at: string;
  producto: {
    nombre: string;
  };
  usuario: {
    nombre: string;
  };
}

export const useInventoryMovements = () => {
  const [movements, setMovements] = useState<Movement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMovements = async () => {
      try {
        setLoading(true);
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        
        const { data, error } = await supabase
          .from('movimientos')
          .select(`
            id,
            tipo,
            cantidad,
            created_at,
            producto:productos(nombre),
            usuario:usuarios(nombre)
          `)
          .gte('created_at', startDate.toISOString())
          .order('created_at', { ascending: false })
          .limit(10);

        if (error) throw error;

        setMovements(data || []);
      } catch (err) {
        console.error('Error loading movements:', err);
        setError('Error al cargar los movimientos');
      } finally {
        setLoading(false);
      }
    };

    loadMovements();
  }, []);

  return { movements, loading, error };
};