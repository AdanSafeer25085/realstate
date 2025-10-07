-- Update display_in_slider default and existing values
-- Run this in Supabase SQL editor

-- First, change the default value for new properties
ALTER TABLE properties ALTER COLUMN display_in_slider SET DEFAULT false;

-- Update all existing properties to false (unchecked by default)
UPDATE properties SET display_in_slider = false WHERE display_in_slider IS NULL OR display_in_slider = true;

-- Note: After running this, manually check the properties you want to show in sliders