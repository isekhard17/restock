import React, { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { subDays, format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useRealtimeSubscription } from '../../../hooks/useRealtimeSubscription';

interface MovementData {
  date: string;
  entradas: number;
  salidas: number;
}

const InventoryChart: React.FC = () => {
  const [data, setData] = useState<MovementData[]>([]);
  const [loading, setLoading] = useState(true);

  // Suscripción a nuevos movimientos
  useRealtimeSubscription('inventory_movements', 'INSERT', 'movimientos');

  useEffect(() => {
    const loadMovements = async () => {
      const startDate = subDays(new Date(), 7).toISOString();
      
      const { data: movements, error } = await supabase
        .from('movimientos')
        .select('created_at, tipo, cantidad')
        .gte('created_at', startDate)
        .order('created_at', { ascending: true });

      if (!error && movements) {
        // Agrupar por día
        const groupedData = movements.reduce((acc: Record<string, any>, mov) => {
          const date = format(new Date(mov.created_at), 'yyyy-MM-dd');
          if (!acc[date]) {
            acc[date] = { entradas: 0, salidas: 0 };
          }
          if (mov.tipo === 'entrada') {
            acc[date].entradas += mov.cantidad;
          } else if (mov.tipo === 'salida') {
            acc[date].salidas += mov.cantidad;
          }
          return acc;
        }, {});

        const chartData = Object.entries(groupedData).map(([date, values]: [string, any]) => ({
          date: format(new Date(date), 'dd MMM', { locale: es }),
          entradas: values.entradas,
          salidas: values.salidas
        }));

        setData(chartData);
      }
      setLoading(false);
    };

    loadMovements();
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse w-full h-[300px] bg-gray-100 dark:bg-gray-800 rounded-lg" />
    );
  }

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date"
            stroke="#9CA3AF"
            fontSize={12}
          />
          <YAxis
            stroke="#9CA3AF"
            fontSize={12}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Line
            type="monotone"
            dataKey="entradas"
            stroke="#84CC16"
            strokeWidth={2}
            dot={false}
            name="Entradas"
          />
          <Line
            type="monotone"
            dataKey="salidas"
            stroke="#EC4899"
            strokeWidth={2}
            dot={false}
            name="Salidas"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InventoryChart;