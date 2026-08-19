-- Add technologies column to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS technologies TEXT[] DEFAULT '{}';
