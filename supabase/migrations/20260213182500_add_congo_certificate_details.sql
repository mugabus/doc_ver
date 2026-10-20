/*
  # Add Congo certificate detail fields

  The Congo/RDC CIRGL certificate template (fillable PDF) contains fields that
  have no corresponding column yet: minerals table, containers, packing type,
  transiting route, carrier name, and the place of issue ("Delivre a").
  All are nullable so existing rows (and non-Congo certificates) stay valid.
*/

ALTER TABLE certificates
  ADD COLUMN IF NOT EXISTS minerals text,
  ADD COLUMN IF NOT EXISTS chemical_symbol text,
  ADD COLUMN IF NOT EXISTS net_weight_kg numeric,
  ADD COLUMN IF NOT EXISTS content_percent numeric,
  ADD COLUMN IF NOT EXISTS metal_contained text,
  ADD COLUMN IF NOT EXISTS value_usd numeric,
  ADD COLUMN IF NOT EXISTS containers text,
  ADD COLUMN IF NOT EXISTS packing_type text,
  ADD COLUMN IF NOT EXISTS transiting text,
  ADD COLUMN IF NOT EXISTS carrier_name text,
  ADD COLUMN IF NOT EXISTS issued_in text;
