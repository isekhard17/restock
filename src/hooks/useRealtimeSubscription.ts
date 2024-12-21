import { useEffect, useState } from 'react';
import { RealtimeChannel } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export function useRealtimeSubscription<T = any>(
  channel: string,
  event: 'INSERT' | 'UPDATE' | 'DELETE' | '*',
  table: string,
  initialData: T[] = []
) {
  const [data, setData] = useState<T[]>(initialData);
  const [error, setError] = useState<Error | null>(null);
  const [subscription, setSubscription] = useState<RealtimeChannel | null>(null);

  useEffect(() => {
    const sub = supabase.channel(channel)
      .on('postgres_changes', {
        event,
        schema: 'public',
        table,
      }, (payload) => {
        setData((currentData) => {
          if (payload.eventType === 'INSERT') {
            return [...currentData, payload.new as T];
          }
          if (payload.eventType === 'DELETE') {
            return currentData.filter((item: any) => item.id !== payload.old.id);
          }
          if (payload.eventType === 'UPDATE') {
            return currentData.map((item: any) => 
              item.id === payload.new.id ? payload.new : item
            );
          }
          return currentData;
        });
      })
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log(`Subscribed to ${channel}`);
        }
        if (status === 'CLOSED') {
          console.log(`Unsubscribed from ${channel}`);
        }
        if (status === 'CHANNEL_ERROR') {
          setError(new Error(`Error subscribing to ${channel}`));
        }
      });

    setSubscription(sub);

    return () => {
      sub.unsubscribe();
    };
  }, [channel, event, table]);

  return { data, error, subscription };
}