-- Add missing fields to properties table
-- Run this in your Supabase SQL Editor

-- Add missing fields that are in the form but not in the database
ALTER TABLE properties ADD COLUMN IF NOT EXISTS nearest_landmark TEXT;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS developer_name TEXT;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS developer_description TEXT;

-- Also ensure all other required fields exist
ALTER TABLE properties ADD COLUMN IF NOT EXISTS property_subtitle TEXT;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS detailed_description TEXT;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS hero_image TEXT;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS highlights_image TEXT;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS features_image TEXT;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS location_map_image TEXT;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS display_in_slider BOOLEAN DEFAULT true;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS developer TEXT;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS property_type TEXT;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS summary_type TEXT;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS land_area TEXT;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS current_status TEXT;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS ownership TEXT;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS completion_year TEXT;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS tower_floors TEXT;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS units_per_floor TEXT;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS total_units TEXT;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS rera_number TEXT;

-- Verify the fields were added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'properties' 
AND column_name IN (
    'nearest_landmark', 'developer_name', 'developer_description',
    'property_subtitle', 'detailed_description', 'hero_image',
    'highlights_image', 'features_image', 'location_map_image',
    'display_in_slider', 'developer', 'property_type', 'summary_type',
    'land_area', 'current_status', 'ownership', 'completion_year',
    'tower_floors', 'units_per_floor', 'total_units', 'rera_number'
)
ORDER BY column_name;
