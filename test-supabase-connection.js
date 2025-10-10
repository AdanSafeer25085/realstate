// Test Supabase Connection
// Run this with: node test-supabase-connection.js

const supabase = require('./lib/supabase').default;

async function testSupabaseConnection() {
  console.log('🔍 Testing Supabase Connection...\n');

  try {
    // Test 1: Check environment variables
    console.log('1. Checking environment variables...');
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      console.log('❌ Environment variables missing!');
      console.log('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
      console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseKey ? '✅ Set' : '❌ Missing');
      return;
    }
    
    console.log('✅ Environment variables are set');
    console.log('URL:', supabaseUrl);
    console.log('Key:', supabaseKey.substring(0, 20) + '...');

    // Test 2: Test basic connection
    console.log('\n2. Testing basic connection...');
    const { data, error } = await supabase
      .from('properties')
      .select('id, title')
      .limit(1);

    if (error) {
      console.log('❌ Supabase connection failed:');
      console.log('Error:', error.message);
      console.log('Details:', error.details);
      console.log('Hint:', error.hint);
      return;
    }

    console.log('✅ Supabase connection successful!');
    console.log('Sample data:', data);

    // Test 3: Test all required tables
    console.log('\n3. Testing all required tables...');
    
    const tables = [
      'properties',
      'property_gallery', 
      'property_summary',
      'property_highlights',
      'property_features',
      'property_price_list',
      'property_location_details',
      'property_developer_info',
      'property_commitments'
    ];

    for (const table of tables) {
      try {
        const { data: tableData, error: tableError } = await supabase
          .from(table)
          .select('*')
          .limit(1);
        
        if (tableError) {
          console.log(`❌ Table '${table}' - ERROR: ${tableError.message}`);
        } else {
          console.log(`✅ Table '${table}' - OK`);
        }
      } catch (err) {
        console.log(`❌ Table '${table}' - ERROR: ${err.message}`);
      }
    }

    console.log('\n🎉 Supabase connection test completed!');

  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
  }
}

// Run the test
testSupabaseConnection();
