/**
 * Supabase configuration for the static frontend (frontend/ folder).
 *
 * These are the same PUBLIC anon credentials that the React app
 * (src/lib/supabase.ts) ships in its browser bundle — data protection is
 * enforced by Row Level Security in supabase/migrations/, not by hiding
 * this key.
 */
window.ICGLR_CONFIG = {
  supabaseUrl: "https://hcxerfsaskehfuffqjfe.supabase.co",
  supabaseAnonKey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjeGVyZnNhc2tlaGZ1ZmZxamZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3NTA0NzMsImV4cCI6MjA4NzMyNjQ3M30.23yUtjfGlDn_GXJpqffj52XLn5yduB5uUAxGiJgrY20",
};
