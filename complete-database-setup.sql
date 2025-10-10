-- Complete Database Setup for Property Management System
-- Run this in your Supabase SQL Editor to set up all required tables and columns

-- 1. First, let's ensure the main properties table has all required columns
ALTER TABLE properties ADD COLUMN IF NOT EXISTS property_subtitle TEXT;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS detailed_description TEXT;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS hero_image TEXT;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS highlights_image TEXT;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS features_image TEXT;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS location_map_image TEXT;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS display_in_slider BOOLEAN DEFAULT true;

-- 2. Create property_gallery table (if not exists)
CREATE TABLE IF NOT EXISTS property_gallery (
    id BIGSERIAL PRIMARY KEY,
    property_id BIGINT REFERENCES properties(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    image_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create property_summary table
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

-- 4. Create property_highlights table
CREATE TABLE IF NOT EXISTS property_highlights (
    id BIGSERIAL PRIMARY KEY,
    property_id BIGINT REFERENCES properties(id) ON DELETE CASCADE,
    highlight_text TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create property_features table
CREATE TABLE IF NOT EXISTS property_features (
    id BIGSERIAL PRIMARY KEY,
    property_id BIGINT REFERENCES properties(id) ON DELETE CASCADE,
    feature_text TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Create property_price_list table
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

-- 7. Create property_location_details table
CREATE TABLE IF NOT EXISTS property_location_details (
    id BIGSERIAL PRIMARY KEY,
    property_id BIGINT REFERENCES properties(id) ON DELETE CASCADE,
    location_point TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Create property_developer_info table
CREATE TABLE IF NOT EXISTS property_developer_info (
    id BIGSERIAL PRIMARY KEY,
    property_id BIGINT REFERENCES properties(id) ON DELETE CASCADE,
    developer_name TEXT NOT NULL,
    developer_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Create property_commitments table
CREATE TABLE IF NOT EXISTS property_commitments (
    id BIGSERIAL PRIMARY KEY,
    property_id BIGINT REFERENCES properties(id) ON DELETE CASCADE,
    commitment_text TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. Enable Row Level Security (RLS) for all tables
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_summary ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_highlights ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_price_list ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_location_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_developer_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_commitments ENABLE ROW LEVEL SECURITY;

-- 11. Create policies for read access (public can read all property data)
DO $$
BEGIN
    -- Properties table
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'properties' AND policyname = 'Enable read access for all users') THEN
        CREATE POLICY "Enable read access for all users" ON properties FOR SELECT USING (true);
    END IF;
    
    -- Property Gallery
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'property_gallery' AND policyname = 'Enable read access for all users') THEN
        CREATE POLICY "Enable read access for all users" ON property_gallery FOR SELECT USING (true);
    END IF;
    
    -- Property Summary
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'property_summary' AND policyname = 'Enable read access for all users') THEN
        CREATE POLICY "Enable read access for all users" ON property_summary FOR SELECT USING (true);
    END IF;
    
    -- Property Highlights
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'property_highlights' AND policyname = 'Enable read access for all users') THEN
        CREATE POLICY "Enable read access for all users" ON property_highlights FOR SELECT USING (true);
    END IF;
    
    -- Property Features
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'property_features' AND policyname = 'Enable read access for all users') THEN
        CREATE POLICY "Enable read access for all users" ON property_features FOR SELECT USING (true);
    END IF;
    
    -- Property Price List
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'property_price_list' AND policyname = 'Enable read access for all users') THEN
        CREATE POLICY "Enable read access for all users" ON property_price_list FOR SELECT USING (true);
    END IF;
    
    -- Property Location Details
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'property_location_details' AND policyname = 'Enable read access for all users') THEN
        CREATE POLICY "Enable read access for all users" ON property_location_details FOR SELECT USING (true);
    END IF;
    
    -- Property Developer Info
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'property_developer_info' AND policyname = 'Enable read access for all users') THEN
        CREATE POLICY "Enable read access for all users" ON property_developer_info FOR SELECT USING (true);
    END IF;
    
    -- Property Commitments
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'property_commitments' AND policyname = 'Enable read access for all users') THEN
        CREATE POLICY "Enable read access for all users" ON property_commitments FOR SELECT USING (true);
    END IF;
END $$;

-- 12. Create policies for insert/update/delete access (authenticated users)
DO $$
BEGIN
    -- Properties table
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'properties' AND policyname = 'Enable insert for authenticated users') THEN
        CREATE POLICY "Enable insert for authenticated users" ON properties FOR INSERT WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'properties' AND policyname = 'Enable update for authenticated users') THEN
        CREATE POLICY "Enable update for authenticated users" ON properties FOR UPDATE USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'properties' AND policyname = 'Enable delete for authenticated users') THEN
        CREATE POLICY "Enable delete for authenticated users" ON properties FOR DELETE USING (true);
    END IF;
    
    -- Property Gallery
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'property_gallery' AND policyname = 'Enable insert for authenticated users') THEN
        CREATE POLICY "Enable insert for authenticated users" ON property_gallery FOR INSERT WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'property_gallery' AND policyname = 'Enable update for authenticated users') THEN
        CREATE POLICY "Enable update for authenticated users" ON property_gallery FOR UPDATE USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'property_gallery' AND policyname = 'Enable delete for authenticated users') THEN
        CREATE POLICY "Enable delete for authenticated users" ON property_gallery FOR DELETE USING (true);
    END IF;
    
    -- Property Summary
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'property_summary' AND policyname = 'Enable insert for authenticated users') THEN
        CREATE POLICY "Enable insert for authenticated users" ON property_summary FOR INSERT WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'property_summary' AND policyname = 'Enable update for authenticated users') THEN
        CREATE POLICY "Enable update for authenticated users" ON property_summary FOR UPDATE USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'property_summary' AND policyname = 'Enable delete for authenticated users') THEN
        CREATE POLICY "Enable delete for authenticated users" ON property_summary FOR DELETE USING (true);
    END IF;
    
    -- Property Highlights
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'property_highlights' AND policyname = 'Enable insert for authenticated users') THEN
        CREATE POLICY "Enable insert for authenticated users" ON property_highlights FOR INSERT WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'property_highlights' AND policyname = 'Enable update for authenticated users') THEN
        CREATE POLICY "Enable update for authenticated users" ON property_highlights FOR UPDATE USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'property_highlights' AND policyname = 'Enable delete for authenticated users') THEN
        CREATE POLICY "Enable delete for authenticated users" ON property_highlights FOR DELETE USING (true);
    END IF;
    
    -- Property Features
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'property_features' AND policyname = 'Enable insert for authenticated users') THEN
        CREATE POLICY "Enable insert for authenticated users" ON property_features FOR INSERT WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'property_features' AND policyname = 'Enable update for authenticated users') THEN
        CREATE POLICY "Enable update for authenticated users" ON property_features FOR UPDATE USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'property_features' AND policyname = 'Enable delete for authenticated users') THEN
        CREATE POLICY "Enable delete for authenticated users" ON property_features FOR DELETE USING (true);
    END IF;
    
    -- Property Price List
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'property_price_list' AND policyname = 'Enable insert for authenticated users') THEN
        CREATE POLICY "Enable insert for authenticated users" ON property_price_list FOR INSERT WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'property_price_list' AND policyname = 'Enable update for authenticated users') THEN
        CREATE POLICY "Enable update for authenticated users" ON property_price_list FOR UPDATE USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'property_price_list' AND policyname = 'Enable delete for authenticated users') THEN
        CREATE POLICY "Enable delete for authenticated users" ON property_price_list FOR DELETE USING (true);
    END IF;
    
    -- Property Location Details
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'property_location_details' AND policyname = 'Enable insert for authenticated users') THEN
        CREATE POLICY "Enable insert for authenticated users" ON property_location_details FOR INSERT WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'property_location_details' AND policyname = 'Enable update for authenticated users') THEN
        CREATE POLICY "Enable update for authenticated users" ON property_location_details FOR UPDATE USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'property_location_details' AND policyname = 'Enable delete for authenticated users') THEN
        CREATE POLICY "Enable delete for authenticated users" ON property_location_details FOR DELETE USING (true);
    END IF;
    
    -- Property Developer Info
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'property_developer_info' AND policyname = 'Enable insert for authenticated users') THEN
        CREATE POLICY "Enable insert for authenticated users" ON property_developer_info FOR INSERT WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'property_developer_info' AND policyname = 'Enable update for authenticated users') THEN
        CREATE POLICY "Enable update for authenticated users" ON property_developer_info FOR UPDATE USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'property_developer_info' AND policyname = 'Enable delete for authenticated users') THEN
        CREATE POLICY "Enable delete for authenticated users" ON property_developer_info FOR DELETE USING (true);
    END IF;
    
    -- Property Commitments
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'property_commitments' AND policyname = 'Enable insert for authenticated users') THEN
        CREATE POLICY "Enable insert for authenticated users" ON property_commitments FOR INSERT WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'property_commitments' AND policyname = 'Enable update for authenticated users') THEN
        CREATE POLICY "Enable update for authenticated users" ON property_commitments FOR UPDATE USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'property_commitments' AND policyname = 'Enable delete for authenticated users') THEN
        CREATE POLICY "Enable delete for authenticated users" ON property_commitments FOR DELETE USING (true);
    END IF;
END $$;

-- 13. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_property_gallery_property_id ON property_gallery(property_id);
CREATE INDEX IF NOT EXISTS idx_property_summary_property_id ON property_summary(property_id);
CREATE INDEX IF NOT EXISTS idx_property_highlights_property_id ON property_highlights(property_id);
CREATE INDEX IF NOT EXISTS idx_property_features_property_id ON property_features(property_id);
CREATE INDEX IF NOT EXISTS idx_property_price_list_property_id ON property_price_list(property_id);
CREATE INDEX IF NOT EXISTS idx_property_location_details_property_id ON property_location_details(property_id);
CREATE INDEX IF NOT EXISTS idx_property_developer_info_property_id ON property_developer_info(property_id);
CREATE INDEX IF NOT EXISTS idx_property_commitments_property_id ON property_commitments(property_id);

-- 14. Verify all tables exist
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
