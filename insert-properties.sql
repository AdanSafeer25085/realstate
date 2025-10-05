-- First create the tables (run this in Supabase SQL Editor)
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS properties (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    price VARCHAR(100) NOT NULL,
    image TEXT,
    location_image TEXT,
    type VARCHAR(50) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    area VARCHAR(100),
    description TEXT,
    specifications TEXT,
    bedrooms INTEGER,
    bathrooms INTEGER,
    featured BOOLEAN DEFAULT FALSE,
    special_offer TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    created_by UUID REFERENCES admin_users(id)
);

CREATE TABLE IF NOT EXISTS property_gallery (
    id SERIAL PRIMARY KEY,
    property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    image_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Insert admin user
INSERT INTO admin_users (email, password_hash, name, role)
VALUES (
    'admin@example.com',
    '$2a$10$rBV2JDeWW3.vKyeQcM8fFO4777l.KgQ1S6HiVMQb5PEZgEW0FpbJu',
    'Admin User',
    'super_admin'
) ON CONFLICT (email) DO NOTHING;

-- Insert Commercial Properties
INSERT INTO properties (id, title, location, price, image, location_image, type, slug, area, description, specifications, featured) VALUES
(1, 'BESTECH SCO-88A', 'Sector 88A, Gurgaon', '₹5,25,00,000', 'https://birlanewlaunch-gurgaon.com/sector-71/img/gallery/5.webp', 'https://www.scoplots.co.in/m3m-114-market/images/location-map.webp', 'commercial', 'bestech-sco-88a', '70-127 SQYD', 'Premium SCO plots in Sector 88A with excellent connectivity and high ROI potential.', 'Size Range: 70-127 SQYD, B+G+4+Terrace', false),
(2, 'M3M MARKET-84', 'Sector 84, Gurgaon', '₹2,25,00,000', 'https://www.scoplots.co.in/m3m-market-84/images/banner.jpg', 'https://www.scoplots.co.in/m3m-114-market/images/location-map.webp', 'commercial', 'm3m-market-84', '70-127 SQYD', 'Strategic location in Sector 84 with Dwarka Expressway connectivity.', 'Size Range: 70-127 SQYD, B+G+4+Terrace', false),
(3, 'MICROTECH-81', 'Sector 81, Gurgaon', '₹3,50,00,000', 'https://www.scoplots.co.in/m3m-114-market/images/banner.webp', 'https://www.scoplots.co.in/m3m-114-market/images/location-map.webp', 'commercial', 'microtech-81', '70-127 SQYD', 'Modern SCO development in Sector 81 with world-class amenities.', 'Size Range: 70-127 SQYD, B+G+4+Terrace', false),
(4, 'VATIKA INDIA NEXT-82A', 'Sector 82A, Gurgaon', '₹4,50,00,000', 'https://www.scoplots.co.in/m3m-market-84/images/banner.jpg', 'https://www.scoplots.co.in/m3m-114-market/images/location-map.webp', 'commercial', 'vatika-india-next-82a', '70-127 SQYD', 'Premium SCO plots by Vatika in Sector 82A with excellent infrastructure.', 'Size Range: 70-127 SQYD, B+G+4+Terrace', false),
(5, 'DLF SECTOR-84', 'Sector 84, Gurgaon', '₹6,75,00,000', 'https://www.scoplots.co.in/m3m-114-market/images/banner.webp', 'https://www.scoplots.co.in/m3m-114-market/images/location-map.webp', 'commercial', 'dlf-sector-84', '70-127 SQYD', 'DLF''s premium SCO development in Sector 84 with luxury amenities.', 'Size Range: 70-127 SQYD, B+G+4+Terrace', false),
(6, 'EBD SECTOR-99', 'Sector 99, Gurgaon', '₹3,85,00,000', 'https://www.ssgroup-india.com/_next/image?url=https%3A%2F%2Ftriverseadvertising.com%2Fss-group%2Fimages%2F16783740771%20gallery.webp&w=3840&q=75', 'https://www.scoplots.co.in/m3m-114-market/images/location-map.webp', 'commercial', 'ebd-sector-99', '70-127 SQYD', 'Emaar''s SCO development in Sector 99 with modern infrastructure.', 'Size Range: 70-127 SQYD, B+G+4+Terrace', false);

-- Insert Residential Properties
INSERT INTO properties (id, title, location, price, image, location_image, type, slug, bedrooms, bathrooms, area, description, specifications, featured) VALUES
(7, 'WHITELAND WESTIN RESIDENCES-103', 'Sector 103, Gurgaon', '₹1,85,00,000', 'https://www.ssgroup-india.com/_next/image?url=https%3A%2F%2Ftriverseadvertising.com%2Fss-group%2Fimages%2F39092442337962154403.webp&w=3840&q=75', 'https://www.scoplots.co.in/m3m-114-market/images/location-map.webp', 'residential', 'whiteland-westin-residences-103', 4, 4, '3,500 sq ft', 'Luxury residential project by Whiteland in Sector 103 with premium amenities and modern design.', '4 BHK apartments with modern amenities and world-class facilities.', false),
(8, 'KRISUMI WATERFALL-36', 'Sector 36, Gurgaon', '₹1,45,00,000', 'https://www.scoplots.co.in/m3m-market-84/images/highlights.jpg', 'https://www.scoplots.co.in/m3m-114-market/images/location-map.webp', 'residential', 'krisumi-waterfall-36', 3, 3, '2,800 sq ft', 'Premium residential project by Krisumi in Sector 36 with waterfall-themed design.', '3 BHK apartments with contemporary design and luxury amenities.', false),
(9, 'KRISUMI WATERSIDE-36', 'Sector 36, Gurgaon', '₹1,65,00,000', 'https://www.scoplots.co.in/m3m-market-84/images/highlights.jpg', 'https://www.scoplots.co.in/m3m-114-market/images/location-map.webp', 'residential', 'krisumi-waterside-36', 3, 3, '3,200 sq ft', 'Luxury waterside living by Krisumi in Sector 36 with premium waterfront amenities.', '3 BHK apartments with waterside views and modern facilities.', false),
(10, 'BIRLA ESTATES-71', 'Sector 71, Gurgaon', '₹2,15,00,000', 'https://birlanewlaunch-gurgaon.com/sector-71/img/gallery/5.webp', 'https://www.scoplots.co.in/m3m-114-market/images/location-map.webp', 'residential', 'birla-estates-71', 4, 4, '4,000 sq ft', 'Premium residential development by Birla in Sector 71 with luxury amenities.', '4 BHK apartments with spacious layouts and premium finishes.', false),
(11, 'VATIKA SOVEREIGN NEXT', 'Sector 83, Gurgaon', '₹1,95,00,000', 'https://www.ssgroup-india.com/_next/image?url=https%3A%2F%2Ftriverseadvertising.com%2Fss-group%2Fimages%2F16783740771%20gallery.webp&w=3840&q=75', 'https://www.scoplots.co.in/m3m-114-market/images/location-map.webp', 'residential', 'vatika-sovereign-next', 3, 3, '3,400 sq ft', 'Future-ready residential project by Vatika in Sector 83 with smart home features.', '3 BHK apartments with smart home automation and modern amenities.', false);

-- Insert Featured Projects (SCO)
INSERT INTO properties (id, title, location, price, image, location_image, type, slug, area, description, specifications, featured, special_offer) VALUES
(12, 'BIRLA ESTATE SEC-71', 'Sector 71, Gurugram', '₹2,70,00,000', 'https://birlanewlaunch-gurgaon.com/sector-71/img/gallery/2.webp', 'https://www.scoplots.co.in/m3m-114-market/images/location-map.webp', 'sco', 'birla-estate-sec-71', '70-127 SQYD', '🏢 Standalone Iconic Tower (1.5 Acre) ✨ Stilt + 42 Floors', 'Size Range: 70-127 SQYD, B+G+4+Terrace', true, null),
(13, 'SS CAMASA', 'Sector 95, Gurgaon', '₹1,85,00,000', 'https://www.ssgroup-india.com/_next/image?url=https%3A%2F%2Ftriverseadvertising.com%2Fss-group%2Fimages%2F16783740771%20gallery.webp&w=3840&q=75', 'https://www.scoplots.co.in/m3m-114-market/images/location-map.webp', 'sco', 'ss-camasa', '70-127 SQYD', 'Premium SCO development by SS Group in Sector 95 with modern amenities.', 'Size Range: 70-127 SQYD, B+G+4+Terrace', true, null),
(14, 'SS GROUP 83 ICONIC PROJECT', 'Sector 83, Gurgaon', '₹2,70,00,000', 'https://www.ssgroup-india.com/_next/image?url=https%3A%2F%2Ftriverseadvertising.com%2Fss-group%2Fimages%2F39092442337962154403.webp&w=3840&q=75', 'https://www.scoplots.co.in/m3m-114-market/images/location-map.webp', 'sco', 'ss-group-83-iconic', null, 'Iconic SCO project by SS Group in Sector 83 with premium features.', 'Size Range: 70-127 SQYD, B+G+4+Terrace', true, 'EOI PRICE: ₹2.70 Cr (All Inclusive) + GST'),
(15, 'WHITELAND RESIDENCES SEC-103', 'Sector 103, Gurgaon', '₹1,95,00,000', 'https://whitelandwestinresidencessector103.info/wp-content/uploads/2025/09/1.jpg', 'https://www.scoplots.co.in/m3m-114-market/images/location-map.webp', 'sco', 'whiteland-residences-sec-103', null, 'Premium SCO development by Whiteland in Sector 103 with luxury amenities.', 'Size Range: 70-127 SQYD, B+G+4+Terrace', true, null),
(16, 'M3M MARKET-84 SCO', 'Sector 84, Gurgaon', '₹2,25,00,000', 'https://www.scoplots.co.in/m3m-market-84/images/highlights.jpg', 'https://www.scoplots.co.in/m3m-114-market/images/location-map.webp', 'sco', 'm3m-market-84-sco', '70-127 SQYD', 'Strategic SCO development by M3M in Sector 84 with excellent connectivity.', 'Size Range: 70-127 SQYD, B+G+4+Terrace', true, null);

-- Insert Gallery Images for Commercial Properties
INSERT INTO property_gallery (property_id, image_url, image_order) VALUES
-- BESTECH SCO-88A gallery
(1, 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop', 0),
(1, 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop', 1),
(1, 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop', 2),
(1, 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop', 3),
(1, 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&h=600&fit=crop', 4),

-- M3M MARKET-84 gallery
(2, 'https://images.unsplash.com/photo-1560472355-536de3962603?w=800&h=600&fit=crop', 0),
(2, 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=800&h=600&fit=crop', 1),
(2, 'https://images.unsplash.com/photo-1565402170291-8491f14678db?w=800&h=600&fit=crop', 2),
(2, 'https://images.unsplash.com/photo-1555636222-cae831e670b3?w=800&h=600&fit=crop', 3),
(2, 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop', 4),

-- MICROTECH-81 gallery
(3, 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop', 0),
(3, 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop', 1),
(3, 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop', 2),
(3, 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop', 3),
(3, 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&h=600&fit=crop', 4),

-- VATIKA INDIA NEXT-82A gallery
(4, 'https://images.unsplash.com/photo-1560472355-536de3962603?w=800&h=600&fit=crop', 0),
(4, 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=800&h=600&fit=crop', 1),
(4, 'https://images.unsplash.com/photo-1565402170291-8491f14678db?w=800&h=600&fit=crop', 2),
(4, 'https://images.unsplash.com/photo-1555636222-cae831e670b3?w=800&h=600&fit=crop', 3),
(4, 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop', 4),

-- DLF SECTOR-84 gallery
(5, 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop', 0),
(5, 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop', 1),
(5, 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop', 2),
(5, 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop', 3),
(5, 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&h=600&fit=crop', 4),

-- EBD SECTOR-99 gallery
(6, 'https://images.unsplash.com/photo-1560472355-536de3962603?w=800&h=600&fit=crop', 0),
(6, 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=800&h=600&fit=crop', 1),
(6, 'https://images.unsplash.com/photo-1565402170291-8491f14678db?w=800&h=600&fit=crop', 2),
(6, 'https://images.unsplash.com/photo-1555636222-cae831e670b3?w=800&h=600&fit=crop', 3),
(6, 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop', 4);

-- Insert Gallery Images for Residential Properties
INSERT INTO property_gallery (property_id, image_url, image_order) VALUES
-- WHITELAND WESTIN RESIDENCES-103 gallery
(7, 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=800&h=600&fit=crop', 0),
(7, 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop', 1),
(7, 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop', 2),
(7, 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop', 3),
(7, 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop', 4),

-- KRISUMI WATERFALL-36 gallery
(8, 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop', 0),
(8, 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop', 1),
(8, 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop', 2),
(8, 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop', 3),
(8, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop', 4),

-- KRISUMI WATERSIDE-36 gallery
(9, 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop', 0),
(9, 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop', 1),
(9, 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop', 2),
(9, 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop', 3),
(9, 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=800&h=600&fit=crop', 4),

-- BIRLA ESTATES-71 gallery
(10, 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop', 0),
(10, 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop', 1),
(10, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop', 2),
(10, 'https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?w=800&h=600&fit=crop', 3),
(10, 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&h=600&fit=crop', 4),

-- VATIKA SOVEREIGN NEXT gallery
(11, 'https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=800&h=600&fit=crop', 0),
(11, 'https://images.unsplash.com/photo-1606744888344-493238951221?w=800&h=600&fit=crop', 1),
(11, 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&h=600&fit=crop', 2),
(11, 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&h=600&fit=crop', 3),
(11, 'https://images.unsplash.com/photo-1598228723793-52759bba239c?w=800&h=600&fit=crop', 4);

-- Insert Gallery Images for Featured Projects (SCO)
INSERT INTO property_gallery (property_id, image_url, image_order) VALUES
-- BIRLA ESTATE SEC-71 gallery
(12, 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop', 0),
(12, 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop', 1),
(12, 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop', 2),
(12, 'https://images.unsplash.com/photo-1555636222-cae831e670b3?w=800&h=600&fit=crop', 3),
(12, 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop', 4),

-- SS CAMASA gallery
(13, 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&h=600&fit=crop', 0),
(13, 'https://images.unsplash.com/photo-1560472355-536de3962603?w=800&h=600&fit=crop', 1),
(13, 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop', 2),
(13, 'https://images.unsplash.com/photo-1565402170291-8491f14678db?w=800&h=600&fit=crop', 3),
(13, 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=800&h=600&fit=crop', 4),

-- SS GROUP 83 ICONIC PROJECT gallery
(14, 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop', 0),
(14, 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop', 1),
(14, 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop', 2),
(14, 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop', 3),
(14, 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop', 4),

-- WHITELAND RESIDENCES SEC-103 gallery
(15, 'https://images.unsplash.com/photo-1560472355-536de3962603?w=800&h=600&fit=crop', 0),
(15, 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&h=600&fit=crop', 1),
(15, 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=800&h=600&fit=crop', 2),
(15, 'https://images.unsplash.com/photo-1565402170291-8491f14678db?w=800&h=600&fit=crop', 3),
(15, 'https://images.unsplash.com/photo-1555636222-cae831e670b3?w=800&h=600&fit=crop', 4),

-- M3M MARKET-84 SCO gallery
(16, 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop', 0),
(16, 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop', 1),
(16, 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop', 2),
(16, 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop', 3),
(16, 'https://images.unsplash.com/photo-1560472355-536de3962603?w=800&h=600&fit=crop', 4);

-- Update the sequence to avoid conflicts with future inserts
SELECT setval('properties_id_seq', (SELECT MAX(id) FROM properties));
SELECT setval('property_gallery_id_seq', (SELECT MAX(id) FROM property_gallery));