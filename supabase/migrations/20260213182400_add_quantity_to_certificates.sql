/*
  # Add quantity column to certificates table

  1. Changes
    - Add `quantity` (numeric) column to store the quantity/weight of the certificate
    - Default value of 0 for existing records
*/

ALTER TABLE certificates ADD COLUMN IF NOT EXISTS quantity numeric DEFAULT 0;