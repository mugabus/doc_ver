import { supabase, Certificate } from './supabase';

// Allowed origin countries and their certificate number prefixes
export const ORIGIN_COUNTRIES = [
  { value: 'RÉPUBLIQUE DÉMOCRATIQUE DU CONGO', label: 'RDC (Congo)', prefix: 'COD' },
  { value: 'UGANDA', label: 'Uganda', prefix: 'UGA' },
  { value: 'BURUNDI', label: 'Burundi', prefix: 'BDI' },
  { value: 'KENYA', label: 'Kenya', prefix: 'KEN' },
] as const;

// Get the certificate number prefix for a given origin country (default: COD)
export function getCountryPrefix(originCountry: string): string {
  const match = ORIGIN_COUNTRIES.find(c => c.value === originCountry);
  return match ? match.prefix : 'COD';
}

// Generate a unique certificate number: <PREFIX> + YYMMDD + 4 random digits
export function generateCertificateNumber(prefix: string = 'COD'): string {
  const now = new Date();
  const datePart = [
    now.getFullYear().toString().slice(-2),
    (now.getMonth() + 1).toString().padStart(2, '0'),
    now.getDate().toString().padStart(2, '0'),
  ].join('');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${prefix}${datePart}${random}`;
}

// Save a new certificate to the database
export async function saveCertificate(data: Omit<Certificate, 'id' | 'created_at'>): Promise<Certificate | null> {
  try {
    let lastError: unknown = null;
    // Retry a few times on unique-constraint violations (duplicate certificate number)
    for (let attempt = 0; attempt < 3; attempt++) {
      const payload = attempt === 0
        ? data
        : { ...data, certificate_number: generateCertificateNumber(getCountryPrefix(data.origin_country)) };

      const { data: certificate, error } = await supabase
        .from('certificates')
        .insert([payload])
        .select()
        .single();

      if (!error) {
        return certificate;
      }

      lastError = error;
      // 23505 = unique violation in Postgres
      if ((error as { code?: string }).code !== '23505') {
        break;
      }
    }

    console.error('Error saving certificate:', lastError);
    return null;
  } catch (error) {
    console.error('Error saving certificate:', error);
    return null;
  }
}

// Get a certificate by certificate number
export async function getCertificateByNumber(certificateNumber: string): Promise<Certificate | null> {
  try {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .eq('certificate_number', certificateNumber.toUpperCase())
      .single();

    if (error) {
      console.error('Error fetching certificate:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching certificate:', error);
    return null;
  }
}

// Get all certificates (for dashboard)
export async function getAllCertificates(): Promise<Certificate[]> {
  try {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching certificates:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching certificates:', error);
    return [];
  }
}

// Delete a certificate
export async function deleteCertificate(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('certificates')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting certificate:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error deleting certificate:', error);
    return false;
  }
}

// Update a certificate
export async function updateCertificate(id: string, data: Partial<Omit<Certificate, 'id' | 'created_at'>>): Promise<Certificate | null> {
  try {
    const { data: certificate, error } = await supabase
      .from('certificates')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating certificate:', error);
      return null;
    }

    return certificate;
  } catch (error) {
    console.error('Error updating certificate:', error);
    return null;
  }
}

// Get certificate statistics
export async function getCertificateStats(): Promise<{
  total: number;
  active: number;
  expired: number;
  exporters: number;
}> {
  try {
    const { data, error } = await supabase
      .from('certificates')
      .select('expiration_date, exporter_name');

    if (error || !data) {
      return { total: 0, active: 0, expired: 0, exporters: 0 };
    }

    const now = new Date();
    const uniqueExporters = new Set(data.map(c => c.exporter_name));

    return {
      total: data.length,
      active: data.filter(c => new Date(c.expiration_date) > now).length,
      expired: data.filter(c => new Date(c.expiration_date) <= now).length,
      exporters: uniqueExporters.size,
    };
  } catch (error) {
    console.error('Error fetching stats:', error);
    return { total: 0, active: 0, expired: 0, exporters: 0 };
  }
}