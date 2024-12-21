import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Stats {
  users: number;
  products: number;
  lowStock: number;
  movements: number;
}

export const useStats = () => {
  const [stats, setStats] = useState<Stats>({
    users: 0,
    products: 0,
    lowStock: 0,
    movements: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        setError(null);

        // Run queries in parallel
        const [
          { count: usersCount, error: usersError },
          { count: productsCount, error: productsError },
          { count: movementsCount, error: movementsError },
          { count: lowStockCount, error: lowStockError }
        ] = await Promise.all([
          // Total usuarios
          supabase
            .from('usuarios')
            .select('*', { count: 'exact', head: true }),
          
          // Total productos
          supabase
            .from('productos')
            .select('*', { count: 'exact', head: true }),
          
          // Movimientos últimas 24h
          supabase
            .from('movimientos')
            .select('*', { count: 'exact', head: true })
            .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()),
          
          // Productos con stock bajo
          supabase
            .from('inventario')
            .select('*', { count: 'exact', head: true })
            .lt('cantidad', 10) // Using a fixed threshold for now
        ]);

        // Check for errors
        if (usersError) throw usersError;
        if (productsError) throw productsError;
        if (movementsError) throw movementsError;
        if (lowStockError) throw lowStockError;

        setStats({
          users: usersCount || 0,
          products: productsCount || 0,
          lowStock: lowStockCount || 0,
          movements: movementsCount || 0
        });
      } catch (error) {
        console.error('Error loading stats:', error);
        setError('Error al cargar las estadísticas');
        // Set default values on error
        setStats({
          users: 0,
          products: 0,
          lowStock: 0,
          movements: 0
        });
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  return { stats, loading, error };
};