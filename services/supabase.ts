
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';

// Using window.process to safely access injected variables in the environment
const supabaseUrl = (window as any).process?.env?.SUPABASE_URL || 'https://vfqiizosfioojggtlvys.supabase.co';
const supabaseAnonKey = (window as any).process?.env?.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmcWlpem9zZmlvb2pnZ3RsdnlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczOTM5MTcsImV4cCI6MjA4Mjk2OTkxN30.2K2dTnlDtdqGzhiSBbQU8q-QQMCYXJ2aDldz16N2oqM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
