import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Certificate {
  id: string;
  certificate_number: string;
  loading_number: string;
  origin_country: string;
  province: string;
  exporter_name: string;
  exporter_address: string;
  importer_name: string;
  importer_address: string;
  export_license: string;
  shipment_date: string;
  expiration_date: string;
  created_at: string;
}
