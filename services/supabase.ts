
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';

// Using window.process to safely access injected variables in the environment
const supabaseUrl = (window as any).process?.env?.SUPABASE_URL || 'https://vfqiizosfioojggtlvys.supabase.co';
const supabaseAnonKey = (window as any).process?.env?.SUPABASE_ANON_KEY || 'sb_publishable_default_key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
