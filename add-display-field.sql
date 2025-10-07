-- Add display_in_slider field to properties table
-- Run this in Supabase SQL editor

ALTER TABLE properties ADD COLUMN IF NOT EXISTS display_in_slider BOOLEAN DEFAULT true;

-- Update existing properties to show in slider by default
UPDATE properties SET display_in_slider = true WHERE display_in_slider IS NULL;