-- SQL Schema for Property Details Enhancement
-- Run these commands in Supabase SQL editor

-- 1. Add new columns to properties table
ALTER TABLE properties ADD COLUMN IF NOT EXISTS hero_image TEXT;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS highlights_image TEXT;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS features_image TEXT;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS location_map_image TEXT;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS property_subtitle TEXT;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS detailed_description TEXT;

-- 2. Create property_summary table for SCO plot summary data
CREATE TABLE IF NOT EXISTS property_summary (
    id BIGSERIAL PRIMARY KEY,
    property_id BIGINT REFERENCES properties(id) ON DELETE CASCADE,
    developer TEXT,
    property_type TEXT,
    type TEXT,
    area TEXT,
    price TEXT,
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
    commitment_title TEXT NOT NULL,
    commitment_icon TEXT, -- Store icon name or URL
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS) for all new tables
ALTER TABLE property_summary ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_highlights ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_price_list ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_location_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_developer_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_commitments ENABLE ROW LEVEL SECURITY;

-- Create policies for read access (public can read)
CREATE POLICY "Allow public read access" ON property_summary FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON property_highlights FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON property_features FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON property_price_list FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON property_location_details FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON property_developer_info FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON property_commitments FOR SELECT USING (true);

-- Create policies for authenticated users (admin can do everything)
CREATE POLICY "Allow authenticated users full access" ON property_summary FOR ALL USING (true);
CREATE POLICY "Allow authenticated users full access" ON property_highlights FOR ALL USING (true);
CREATE POLICY "Allow authenticated users full access" ON property_features FOR ALL USING (true);
CREATE POLICY "Allow authenticated users full access" ON property_price_list FOR ALL USING (true);
CREATE POLICY "Allow authenticated users full access" ON property_location_details FOR ALL USING (true);
CREATE POLICY "Allow authenticated users full access" ON property_developer_info FOR ALL USING (true);
CREATE POLICY "Allow authenticated users full access" ON property_commitments FOR ALL USING (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_property_summary_updated_at BEFORE UPDATE ON property_summary FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_property_developer_info_updated_at BEFORE UPDATE ON property_developer_info FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();