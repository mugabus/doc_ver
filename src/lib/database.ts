import { supabase, Certificate } from './supabase';

// Generate a unique certificate number
export function generateCertificateNumber(): string {
  const prefix = 'COD';
  const number = Math.floor(Math.random() * 900000) + 100000;
  return `${prefix}${number}`;
}

// Save a new certificate to the database
export async function saveCertificate(data: Omit<Certificate, 'id' | 'created_at'>): Promise<Certificate | null> {
  try {
    const { data: certificate, error } = await supabase
      .from('certificates')
      .insert([data])
      .select()
      .single();

    if (error) {
      console.error('Error saving certificate:', error);
      return null;
    }

    return certificate;
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