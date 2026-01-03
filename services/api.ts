
import { supabase } from './supabase';
import { User, Account, TimelineEvent, PaymentMethod } from '../types';
import { MOCK_REPS, MOCK_ACCOUNTS, MOCK_TIMELINE, MOCK_TRANSACTIONS } from '../constants';

const RECORDINGS_BUCKET = 'call-recordings';

export const db = {
  system: {
    async checkConnectivity() {
      const results = {
        database: { status: 'checking', message: 'Initiating probe...' },
        auth: { status: 'checking', message: 'Initiating probe...' },
        storage: { status: 'checking', message: 'Initiating probe...' }
      };

      try {
        // 1. Check Auth
        const { data: authData, error: authError } = await supabase.auth.getSession();
        if (authError) {
          results.auth = { status: 'error', message: authError.message };
        } else {
          results.auth = { status: 'ok', message: 'Auth service reachable via REST API' };
        }

        // 2. Check Database (profiles table is the root of our logic)
        const { count, error: dbError } = await supabase
          .from('profiles')
          .select('id', { count: 'exact', head: true });
        
        if (dbError) {
          results.database = { 
            status: 'error', 
            message: dbError.code === 'PGRST116' || dbError.code === '42P01' 
              ? 'Table "profiles" missing. Run schema.sql in Supabase SQL Editor.' 
              : dbError.message 
          };
        } else {
          results.database = { status: 'ok', message: `Database reachable (${count ?? 0} profiles found)` };
        }

        // 3. Check Storage
        const { data: buckets, error: storageError } = await supabase.storage.listBuckets();
        if (storageError) {
          results.storage = { status: 'error', message: storageError.message };
        } else {
          const hasBucket = buckets?.some(b => b.name === RECORDINGS_BUCKET);
          results.storage = hasBucket 
            ? { status: 'ok', message: `Bucket "${RECORDINGS_BUCKET}" verified` }
            : { status: 'warning', message: `Bucket "${RECORDINGS_BUCKET}" not found. Create it in Storage tab.` };
        }

      } catch (err: any) {
        console.error('Connectivity probe failed:', err);
        return { error: true, message: err.message, details: results };
      }

      return { error: false, details: results };
    },

    async seedInitialData() {
      try {
        // Warning: This is a simple seed for testing.
        // It assumes some profiles might already exist if users registered.
        
        // 1. Upsert Accounts
        const { error: accError } = await supabase.from('accounts').upsert(
          MOCK_ACCOUNTS.map(({ onboardingSteps, ...rest }) => ({
            ...rest,
            // onboardingSteps: JSON.stringify(onboardingSteps) // if using JSONB
          }))
        );
        if (accError) throw accError;

        return { success: true, message: 'Seeded initial accounts successfully.' };
      } catch (err: any) {
        console.error('Seed error:', err);
        return { success: false, message: err.message };
      }
    }
  },

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
    async create(profile: Partial<User>) {
      const payload: any = {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        role: profile.role,
        avatar: profile.avatar,
        territory: profile.territory
      };
      const { data, error } = await supabase.from('profiles').insert(payload).select().single();
      if (error) throw error;
      return { ...payload, ...data } as User;
    }
  },
  
  accounts: {
    async getAll(repId?: string) {
      let query = supabase.from('accounts').select('*');
      if (repId) query = query.eq('rep_id', repId);
      const { data, error } = await query;
      if (error) throw error;
      return data as Account[];
    }
  },

  timeline: {
    async getAll() {
       const { data, error } = await supabase.from('timeline_events').select('*').order('created_at', { ascending: false });
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
      const path = `${Date.now()}-${fileName.replace(/\s+/g, '_')}.wav`;
      const { data, error } = await supabase.storage.from(RECORDINGS_BUCKET).upload(path, blob);
      if (error) throw error;
      const { data: urlData } = supabase.storage.from(RECORDINGS_BUCKET).getPublicUrl(data.path);
      return urlData.publicUrl;
    }
  }
};

export default db;
