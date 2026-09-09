import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { supabase } from '@/lib/supabase';

export type ConsultationStatus = 'pending' | 'approved' | 'declined';

export interface Consultation {
  id: string;
  student_name: string;
  student_index: string;
  lecturer: string;
  appointment_at: string;
  reason: string;
  status: ConsultationStatus;
  created_at: string;
}

interface ConsultationContextValue {
  consultations: Consultation[];
  loading: boolean;
  addConsultation: (c: Consultation) => void;
  updateStatus: (id: string, status: ConsultationStatus) => void;
}

const ConsultationContext = createContext<ConsultationContextValue | null>(null);

export function ConsultationProvider({ children }: { children: ReactNode }) {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from('consultations')
        .select('*')
        .order('created_at', { ascending: false });
      if (cancelled) return;
      if (!error && data) {
        setConsultations(data as Consultation[]);
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const addConsultation = useCallback((c: Consultation) => {
    setConsultations((prev) => [c, ...prev]);
  }, []);

  const updateStatus = useCallback((id: string, status: ConsultationStatus) => {
    setConsultations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c)),
    );
    supabase.from('consultations').update({ status }).eq('id', id).then();
  }, []);

  return (
    <ConsultationContext.Provider
      value={{ consultations, loading, addConsultation, updateStatus }}
    >
      {children}
    </ConsultationContext.Provider>
  );
}

export function useConsultations() {
  const ctx = useContext(ConsultationContext);
  if (!ctx) {
    throw new Error('useConsultations must be used within ConsultationProvider');
  }
  return ctx;
}
