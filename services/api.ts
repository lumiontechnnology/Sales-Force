
import { supabase } from './supabase';
import { User, Account, TimelineEvent, Transaction, PerformanceReport } from '../types';

export const db = {
  profiles: {
    async get(id: string) {
      const { data, error } = await supabase.from('profiles').select('*').eq('id', id).single();
      if (error) throw error;
      return data as User;
    },
    async getAll() {
      const { data, error } = await supabase.from('profiles').select('*');
      if (error) throw error;
      return data as User[];
    },
    async update(id: string, updates: Partial<User>) {
      const { error } = await supabase.from('profiles').update(updates).eq('id', id);
      if (error) throw error;
    }
  },
  
  accounts: {
    async getAll(repId?: string) {
      let query = supabase.from('accounts').select('*');
      if (repId) query = query.eq('rep_id', repId);
      const { data, error } = await query;
      if (error) throw error;
      return data as Account[];
    },
    async updateHealth(id: string, newScore: number) {
      const { error } = await supabase.from('accounts').update({ health_score: newScore }).eq('id', id);
      if (error) throw error;
    }
  },

  timeline: {
    async getByAccount(accountId: string) {
      const { data, error } = await supabase
        .from('timeline_events')
        .select('*')
        .eq('account_id', accountId)
        .order('date', { ascending: false });
      if (error) throw error;
      return data as TimelineEvent[];
    },
    async create(event: Partial<TimelineEvent> & { account_id: string }) {
      const { data, error } = await supabase.from('timeline_events').insert(event).select().single();
      if (error) throw error;
      return data as TimelineEvent;
    }
  },

  storage: {
    async uploadRecording(blob: Blob, fileName: string) {
      const { data, error } = await supabase.storage
        .from('call-recordings')
        .upload(`${Date.now()}-${fileName}.wav`, blob);
      if (error) throw error;
      
      const { data: urlData } = supabase.storage
        .from('call-recordings')
        .getPublicUrl(data.path);
      
      return urlData.publicUrl;
    }
  }
};
