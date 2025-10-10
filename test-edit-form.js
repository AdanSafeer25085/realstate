// Test script to verify edit form functionality
// Run this after setting up environment variables

const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  console.log('Please create .env.local file with your Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testDatabaseConnection() {
  console.log('🔍 Testing database connection...');
  
  try {
    // Test basic connection
    const { data, error } = await supabase
      .from('properties')
      .select('id, title')
      .limit(1);
    
    if (error) {
      console.error('❌ Database connection failed:', error.message);
      return false;
    }
    
    console.log('✅ Database connection successful');
    console.log('📊 Found', data.length, 'properties in database');
    return true;
  } catch (err) {
    console.error('❌ Connection error:', err.message);
    return false;
  }
}

async function testTableStructure() {
  console.log('\n🔍 Testing table structure...');
  
  const tables = [
    'properties',
    'property_gallery', 
    'property_highlights',
    'property_features',
    'property_commitments',
    'property_price_list',
    'property_location_details'
  ];
  
  for (const table of tables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(1);
      
      if (error) {
        console.log(`❌ Table ${table}: ${error.message}`);
      } else {
        console.log(`✅ Table ${table}: OK`);
      }
    } catch (err) {
      console.log(`❌ Table ${table}: ${err.message}`);
    }
  }
}

async function testFormSubmission() {
  console.log('\n🔍 Testing form submission...');
  
  try {
    // Get first property for testing
    const { data: properties, error: fetchError } = await supabase
      .from('properties')
      .select('id, title')
      .limit(1);
    
    if (fetchError || !properties.length) {
      console.log('❌ No properties found for testing');
      return;
    }
    
    const testProperty = properties[0];
    console.log(`📝 Testing with property: ${testProperty.title} (ID: ${testProperty.id})`);
    
    // Test data that matches the form structure
    const testData = {
      title: testProperty.title + ' (Updated)',
      location: 'Test Location',
      price: '₹1,00,00,000',
      type: 'residential',
      area: '1000 sq ft',
      description: 'Test description',
      featured: true,
      display_in_slider: true,
      gallery: ['https://example.com/image1.jpg'],
      highlights: ['Test highlight 1', 'Test highlight 2'],
      features: ['Test feature 1', 'Test feature 2'],
      commitments: ['Test commitment 1'],
      priceList: [{
        type_name: 'A',
        total_plots: '10',
        area: '100 SQYD',
        price: '₹50,00,000',
        booking_amount: '₹5,00,000'
      }],
      locationDetails: ['Near metro station', 'Close to shopping mall']
    };
    
    // Test API endpoint
    const response = await fetch(`http://localhost:3000/api/properties/${testProperty.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ Form submission test successful');
      console.log('📊 Updated property:', result.title);
    } else {
      const error = await response.json();
      console.log('❌ Form submission test failed:', error.error);
    }
    
  } catch (err) {
    console.log('❌ Form submission test error:', err.message);
  }
}

async function runTests() {
  console.log('🚀 Starting Edit Form Tests\n');
  
  const connectionOk = await testDatabaseConnection();
  if (!connectionOk) {
    console.log('\n❌ Cannot proceed with tests - database connection failed');
    return;
  }
  
  await testTableStructure();
  
  // Only test form submission if server is running
  console.log('\n💡 To test form submission, make sure your Next.js server is running:');
  console.log('   npm run dev');
  console.log('   Then run this script again');
}

runTests().catch(console.error);
