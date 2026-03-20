import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is missing. Please check your environment variables in the AI Studio Secrets panel.');
}

// Ensure we have a valid URL to avoid "Failed to fetch" errors on empty strings
const isPlaceholder = !supabaseUrl || !supabaseUrl.startsWith('http');
const validUrl = !isPlaceholder ? supabaseUrl : 'https://placeholder.supabase.co';
const validKey = supabaseAnonKey || 'placeholder-key';

export const supabase = createClient(validUrl, validKey);

// Helper to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return !!supabaseUrl && supabaseUrl.startsWith('http') && !!supabaseAnonKey && supabaseAnonKey !== 'placeholder-key';
};
