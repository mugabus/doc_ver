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
  quantity: string;
  // Congo/RDC template detail fields (nullable — see migration 20260213182500)
  minerals?: string | null;
  chemical_symbol?: string | null;
  net_weight_kg?: string | number | null;
  content_percent?: string | number | null;
  metal_contained?: string | null;
  value_usd?: string | number | null;
  containers?: string | null;
  packing_type?: string | null;
  transiting?: string | null;
  carrier_name?: string | null;
  issued_in?: string | null;
  created_at: string;
}
