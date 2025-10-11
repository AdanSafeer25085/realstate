-- COMPLETE DATABASE SETUP FOR PROPERTY MANAGEMENT SYSTEM
-- Run this in your Supabase SQL Editor to fix all database issues

-- 1. Add ALL missing columns to properties table
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
ALTER TABLE properties ADD COLUMN IF NOT EXISTS nearest_landmark TEXT;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS developer_name TEXT;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS developer_description TEXT;

-- 2. Create all required tables
CREATE TABLE IF NOT EXISTS property_gallery (
    id BIGSERIAL PRIMARY KEY,
    property_id BIGINT REFERENCES properties(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    image_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS property_summary (
    id BIGSERIAL PRIMARY KEY,
    property_id BIGINT REFERENCES properties(id) ON DELETE CASCADE,
    developer TEXT,
    property_type TEXT,
    summary_type TEXT,
    area TEXT,
    price TEXT,
    land_area TEXT,
    current_status TEXT,
    ownership TEXT,
    nearest_landmark TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS property_highlights (
    id BIGSERIAL PRIMARY KEY,
    property_id BIGINT REFERENCES properties(id) ON DELETE CASCADE,
    highlight_text TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS property_features (
    id BIGSERIAL PRIMARY KEY,
    property_id BIGINT REFERENCES properties(id) ON DELETE CASCADE,
    feature_text TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS property_price_list (
    id BIGSERIAL PRIMARY KEY,
    property_id BIGINT REFERENCES properties(id) ON DELETE CASCADE,
    type_name TEXT NOT NULL,
    total_plots INTEGER,
    area TEXT,
    price TEXT,
    booking_amount TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS property_location_details (
    id BIGSERIAL PRIMARY KEY,
    property_id BIGINT REFERENCES properties(id) ON DELETE CASCADE,
    location_point TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS property_developer_info (
    id BIGSERIAL PRIMARY KEY,
    property_id BIGINT REFERENCES properties(id) ON DELETE CASCADE,
    developer_name TEXT NOT NULL,
    developer_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS property_commitments (
    id BIGSERIAL PRIMARY KEY,
    property_id BIGINT REFERENCES properties(id) ON DELETE CASCADE,
    commitment_text TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_summary ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_highlights ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_price_list ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_location_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_developer_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_commitments ENABLE ROW LEVEL SECURITY;

-- 4. Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Enable read access for all users" ON properties;
DROP POLICY IF EXISTS "Enable read access for all users" ON property_gallery;
DROP POLICY IF EXISTS "Enable read access for all users" ON property_summary;
DROP POLICY IF EXISTS "Enable read access for all users" ON property_highlights;
DROP POLICY IF EXISTS "Enable read access for all users" ON property_features;
DROP POLICY IF EXISTS "Enable read access for all users" ON property_price_list;
DROP POLICY IF EXISTS "Enable read access for all users" ON property_location_details;
DROP POLICY IF EXISTS "Enable read access for all users" ON property_developer_info;
DROP POLICY IF EXISTS "Enable read access for all users" ON property_commitments;

DROP POLICY IF EXISTS "Enable insert for authenticated users" ON properties;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON property_gallery;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON property_summary;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON property_highlights;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON property_features;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON property_price_list;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON property_location_details;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON property_developer_info;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON property_commitments;

DROP POLICY IF EXISTS "Enable update for authenticated users" ON properties;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON property_gallery;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON property_summary;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON property_highlights;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON property_features;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON property_price_list;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON property_location_details;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON property_developer_info;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON property_commitments;

DROP POLICY IF EXISTS "Enable delete for authenticated users" ON properties;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON property_gallery;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON property_summary;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON property_highlights;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON property_features;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON property_price_list;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON property_location_details;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON property_developer_info;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON property_commitments;

-- 5. Create new policies for public access (no authentication required)
CREATE POLICY "Enable read access for all users" ON properties FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON property_gallery FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON property_summary FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON property_highlights FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON property_features FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON property_price_list FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON property_location_details FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON property_developer_info FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON property_commitments FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON properties FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert for all users" ON property_gallery FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert for all users" ON property_summary FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert for all users" ON property_highlights FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert for all users" ON property_features FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert for all users" ON property_price_list FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert for all users" ON property_location_details FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert for all users" ON property_developer_info FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert for all users" ON property_commitments FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON properties FOR UPDATE USING (true);
CREATE POLICY "Enable update for all users" ON property_gallery FOR UPDATE USING (true);
CREATE POLICY "Enable update for all users" ON property_summary FOR UPDATE USING (true);
CREATE POLICY "Enable update for all users" ON property_highlights FOR UPDATE USING (true);
CREATE POLICY "Enable update for all users" ON property_features FOR UPDATE USING (true);
CREATE POLICY "Enable update for all users" ON property_price_list FOR UPDATE USING (true);
CREATE POLICY "Enable update for all users" ON property_location_details FOR UPDATE USING (true);
CREATE POLICY "Enable update for all users" ON property_developer_info FOR UPDATE USING (true);
CREATE POLICY "Enable update for all users" ON property_commitments FOR UPDATE USING (true);

CREATE POLICY "Enable delete for all users" ON properties FOR DELETE USING (true);
CREATE POLICY "Enable delete for all users" ON property_gallery FOR DELETE USING (true);
CREATE POLICY "Enable delete for all users" ON property_summary FOR DELETE USING (true);
CREATE POLICY "Enable delete for all users" ON property_highlights FOR DELETE USING (true);
CREATE POLICY "Enable delete for all users" ON property_features FOR DELETE USING (true);
CREATE POLICY "Enable delete for all users" ON property_price_list FOR DELETE USING (true);
CREATE POLICY "Enable delete for all users" ON property_location_details FOR DELETE USING (true);
CREATE POLICY "Enable delete for all users" ON property_developer_info FOR DELETE USING (true);
CREATE POLICY "Enable delete for all users" ON property_commitments FOR DELETE USING (true);

-- 6. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_property_gallery_property_id ON property_gallery(property_id);
CREATE INDEX IF NOT EXISTS idx_property_summary_property_id ON property_summary(property_id);
CREATE INDEX IF NOT EXISTS idx_property_highlights_property_id ON property_highlights(property_id);
CREATE INDEX IF NOT EXISTS idx_property_features_property_id ON property_features(property_id);
CREATE INDEX IF NOT EXISTS idx_property_price_list_property_id ON property_price_list(property_id);
CREATE INDEX IF NOT EXISTS idx_property_location_details_property_id ON property_location_details(property_id);
CREATE INDEX IF NOT EXISTS idx_property_developer_info_property_id ON property_developer_info(property_id);
CREATE INDEX IF NOT EXISTS idx_property_commitments_property_id ON property_commitments(property_id);

-- 7. Verify all tables and columns exist
SELECT 
    table_name,
    CASE 
        WHEN table_name IN (
            'properties', 'property_gallery', 'property_summary', 
            'property_highlights', 'property_features', 'property_price_list',
            'property_location_details', 'property_developer_info', 'property_commitments'
        ) THEN '✅ EXISTS'
        ELSE '❌ MISSING'
    END as status
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name LIKE 'property%'
ORDER BY table_name;

-- 8. Verify all required columns exist in properties table
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

-- 9. Success message
SELECT '🎉 Database setup completed successfully! All tables and columns are ready.' as message;
