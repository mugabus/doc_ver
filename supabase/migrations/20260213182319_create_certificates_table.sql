/*
  # Create certificates table

  1. New Tables
    - `certificates`
      - `id` (uuid, primary key) - Unique identifier for each certificate
      - `certificate_number` (text, unique) - CIRGL certificate number (e.g., COD175870)
      - `loading_number` (text) - MSI loading number
      - `origin_country` (text) - Country of origin
      - `province` (text) - Province of origin
      - `exporter_name` (text) - Name of exporting company
      - `exporter_address` (text) - Address of exporter
      - `importer_name` (text) - Name of importing company
      - `importer_address` (text) - Address of importer
      - `export_license` (text) - Export license number
      - `shipment_date` (date) - Date of shipment
      - `expiration_date` (date) - Certificate expiration date
      - `created_at` (timestamptz) - Record creation timestamp
  
  2. Security
    - Enable RLS on `certificates` table
    - Add policy for public read access (certificates are meant to be publicly viewable via QR codes)
    - Add policy for authenticated users to create certificates
*/

CREATE TABLE IF NOT EXISTS certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  certificate_number text UNIQUE NOT NULL,
  loading_number text NOT NULL,
  origin_country text NOT NULL,
  province text NOT NULL,
  exporter_name text NOT NULL,
  exporter_address text NOT NULL,
  importer_name text NOT NULL,
  importer_address text NOT NULL,
  export_license text NOT NULL,
  shipment_date date NOT NULL,
  expiration_date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view certificates"
  ON certificates FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can create certificates"
  ON certificates FOR INSERT
  TO authenticated
  WITH CHECK (true);