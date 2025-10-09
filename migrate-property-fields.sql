-- Safe Migration Script for Property Fields Enhancement
-- This script adds all missing fields to support the enhanced property forms
-- Run this in Supabase SQL Editor

-- 1. Add new columns to properties table (using IF NOT EXISTS to prevent errors)
ALTER TABLE properties ADD COLUMN IF NOT EXISTS property_subtitle TEXT;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS detailed_description TEXT;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS hero_image TEXT;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS highlights_image TEXT;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS features_image TEXT;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS location_map_image TEXT;

-- 2. Create property_summary table for property summary data
CREATE TABLE IF NOT EXISTS property_summary (
    id BIGSERIAL PRIMARY KEY,
    property_id BIGINT REFERENCES properties(id) ON DELETE CASCADE,
    developer TEXT,
    property_type TEXT,
    summary_type TEXT,
    land_area TEXT,
    current_status TEXT,
    ownership TEXT,
    nearest_landmark TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create property_highlights table
CREATE TABLE IF NOT EXISTS property_highlights (
    id BIGSERIAL PRIMARY KEY,
    property_id BIGINT REFERENCES properties(id) ON DELETE CASCADE,
    highlight_text TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create property_features table
CREATE TABLE IF NOT EXISTS property_features (
    id BIGSERIAL PRIMARY KEY,
    property_id BIGINT REFERENCES properties(id) ON DELETE CASCADE,
    feature_text TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create property_price_list table for price and area details
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

-- 6. Create property_location_details table for location information
CREATE TABLE IF NOT EXISTS property_location_details (
    id BIGSERIAL PRIMARY KEY,
    property_id BIGINT REFERENCES properties(id) ON DELETE CASCADE,
    location_point TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Create property_developer_info table for developer information
CREATE TABLE IF NOT EXISTS property_developer_info (
    id BIGSERIAL PRIMARY KEY,
    property_id BIGINT REFERENCES properties(id) ON DELETE CASCADE,
    developer_name TEXT NOT NULL,
    developer_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Create property_commitments table for "Our Commitment" section
CREATE TABLE IF NOT EXISTS property_commitments (
    id BIGSERIAL PRIMARY KEY,
    property_id BIGINT REFERENCES properties(id) ON DELETE CASCADE,
    commitment_text TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Enable Row Level Security (RLS) for all new tables
ALTER TABLE property_summary ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_highlights ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_price_list ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_location_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_developer_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_commitments ENABLE ROW LEVEL SECURITY;

-- 10. Create policies for read access (public can read)
DO $$
BEGIN
    -- Create policies only if they don't exist
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'property_summary' AND policyname = 'Allow public read access') THEN
        CREATE POLICY "Allow public read access" ON property_summary FOR SELECT USING (true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'property_highlights' AND policyname = 'Allow public read access') THEN
        CREATE POLICY "Allow public read access" ON property_highlights FOR SELECT USING (true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'property_features' AND policyname = 'Allow public read access') THEN
        CREATE POLICY "Allow public read access" ON property_features FOR SELECT USING (true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'property_price_list' AND policyname = 'Allow public read access') THEN
        CREATE POLICY "Allow public read access" ON property_price_list FOR SELECT USING (true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'property_location_details' AND policyname = 'Allow public read access') THEN
        CREATE POLICY "Allow public read access" ON property_location_details FOR SELECT USING (true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'property_developer_info' AND policyname = 'Allow public read access') THEN
        CREATE POLICY "Allow public read access" ON property_developer_info FOR SELECT USING (true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'property_commitments' AND policyname = 'Allow public read access') THEN
        CREATE POLICY "Allow public read access" ON property_commitments FOR SELECT USING (true);
    END IF;
END $$;

-- 11. Create policies for authenticated users (admin can do everything)
DO $$
BEGIN
    -- Create policies only if they don't exist
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'property_summary' AND policyname = 'Allow authenticated users full access') THEN
        CREATE POLICY "Allow authenticated users full access" ON property_summary FOR ALL USING (true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'property_highlights' AND policyname = 'Allow authenticated users full access') THEN
        CREATE POLICY "Allow authenticated users full access" ON property_highlights FOR ALL USING (true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'property_features' AND policyname = 'Allow authenticated users full access') THEN
        CREATE POLICY "Allow authenticated users full access" ON property_features FOR ALL USING (true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'property_price_list' AND policyname = 'Allow authenticated users full access') THEN
        CREATE POLICY "Allow authenticated users full access" ON property_price_list FOR ALL USING (true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'property_location_details' AND policyname = 'Allow authenticated users full access') THEN
        CREATE POLICY "Allow authenticated users full access" ON property_location_details FOR ALL USING (true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'property_developer_info' AND policyname = 'Allow authenticated users full access') THEN
        CREATE POLICY "Allow authenticated users full access" ON property_developer_info FOR ALL USING (true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'property_commitments' AND policyname = 'Allow authenticated users full access') THEN
        CREATE POLICY "Allow authenticated users full access" ON property_commitments FOR ALL USING (true);
    END IF;
END $$;

-- 12. Create updated_at trigger function (only if it doesn't exist)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 13. Add updated_at triggers (only if they don't exist)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_property_summary_updated_at') THEN
        CREATE TRIGGER update_property_summary_updated_at 
            BEFORE UPDATE ON property_summary 
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_property_developer_info_updated_at') THEN
        CREATE TRIGGER update_property_developer_info_updated_at 
            BEFORE UPDATE ON property_developer_info 
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

-- 14. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_property_summary_property_id ON property_summary(property_id);
CREATE INDEX IF NOT EXISTS idx_property_highlights_property_id ON property_highlights(property_id);
CREATE INDEX IF NOT EXISTS idx_property_features_property_id ON property_features(property_id);
CREATE INDEX IF NOT EXISTS idx_property_price_list_property_id ON property_price_list(property_id);
CREATE INDEX IF NOT EXISTS idx_property_location_details_property_id ON property_location_details(property_id);
CREATE INDEX IF NOT EXISTS idx_property_developer_info_property_id ON property_developer_info(property_id);
CREATE INDEX IF NOT EXISTS idx_property_commitments_property_id ON property_commitments(property_id);

-- 15. Success message
SELECT 'Migration completed successfully! All new property fields and tables have been added.' as status;
