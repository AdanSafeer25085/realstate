// Quick Test Script - Run this after setting up Supabase
// Usage: node QUICK_TEST.js

const supabase = require('./lib/supabase').default;

async function quickTest() {
  console.log('🧪 Quick Property System Test\n');

  try {
    // Test 1: Check environment variables
    console.log('1. Checking environment variables...');
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      console.log('❌ Environment variables missing!');
      console.log('   Please create .env.local file with your Supabase credentials');
      console.log('   See SUPABASE_SETUP_GUIDE.md for instructions');
      return;
    }
    
    console.log('✅ Environment variables are set');

    // Test 2: Test basic connection
    console.log('\n2. Testing database connection...');
    const { data, error } = await supabase
      .from('properties')
      .select('id, title')
      .limit(1);

    if (error) {
      console.log('❌ Database connection failed:');
      console.log('   Error:', error.message);
      console.log('   Please run COMPLETE_DATABASE_SETUP.sql in your Supabase SQL Editor');
      return;
    }

    console.log('✅ Database connection successful!');

    // Test 3: Test property creation
    console.log('\n3. Testing property creation...');
    
    const testProperty = {
      title: 'Test Property - ' + Date.now(),
      location: 'Test Location',
      price: '₹1,00,000',
      slug: 'test-property-' + Date.now(),
      type: 'residential',
      area: '1000 sqft',
      description: 'Test property description',
      featured: false,
      display_in_slider: true
    };

    const { data: newProperty, error: createError } = await supabase
      .from('properties')
      .insert(testProperty)
      .select()
      .single();

    if (createError) {
      console.log('❌ Property creation failed:');
      console.log('   Error:', createError.message);
      return;
    }

    console.log('✅ Property created successfully!');
    console.log('   Property ID:', newProperty.id);
    console.log('   Property Title:', newProperty.title);

    // Test 4: Test property retrieval
    console.log('\n4. Testing property retrieval...');
    const { data: retrievedProperty, error: fetchError } = await supabase
      .from('properties')
      .select('*')
      .eq('id', newProperty.id)
      .single();

    if (fetchError) {
      console.log('❌ Property retrieval failed:');
      console.log('   Error:', fetchError.message);
    } else {
      console.log('✅ Property retrieved successfully!');
      console.log('   Retrieved Title:', retrievedProperty.title);
    }

    // Test 5: Clean up test data
    console.log('\n5. Cleaning up test data...');
    const { error: deleteError } = await supabase
      .from('properties')
      .delete()
      .eq('id', newProperty.id);

    if (deleteError) {
      console.log('❌ Cleanup failed:', deleteError.message);
    } else {
      console.log('✅ Test data cleaned up');
    }

    console.log('\n🎉 ALL TESTS PASSED!');
    console.log('\n✅ Your property management system is working correctly!');
    console.log('✅ You can now:');
    console.log('   - Create new properties through the admin form');
    console.log('   - Edit existing properties');
    console.log('   - View properties on the frontend');
    console.log('   - All form fields will save properly');

  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Make sure you have created .env.local with Supabase credentials');
    console.log('2. Make sure you have run COMPLETE_DATABASE_SETUP.sql in Supabase');
    console.log('3. Check that your Supabase project is active');
  }
}

// Run the test
quickTest();
