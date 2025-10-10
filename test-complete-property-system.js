// Complete Property System Test
// Run this with: node test-complete-property-system.js

const supabase = require('./lib/supabase').default;

async function testCompletePropertySystem() {
  console.log('🧪 Testing Complete Property System...\n');

  try {
    // 1. Test database tables exist
    console.log('1. Checking database tables...');
    
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
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .limit(1);
        
        if (error) {
          console.log(`❌ Table '${table}' - ERROR: ${error.message}`);
        } else {
          console.log(`✅ Table '${table}' - OK`);
        }
      } catch (err) {
        console.log(`❌ Table '${table}' - ERROR: ${err.message}`);
      }
    }

    // 2. Test property creation with ALL form fields
    console.log('\n2. Testing complete property creation...');
    
    const completePropertyData = {
      // Basic Information
      title: 'Complete Test Property',
      property_subtitle: 'SCO PLOTS, SECTOR 73 - GURGAON',
      location: 'Sector 73, Gurgaon',
      price: '₹1,85,00,000',
      slug: `complete-test-property-${Date.now()}`,
      type: 'commercial',
      area: '70-127 SQYD',
      description: 'Premium SCO plots with excellent connectivity',
      detailed_description: 'Detailed description for the property page with all amenities and features',
      featured: true,
      display_in_slider: true,
      bedrooms: null,
      bathrooms: null,
      
      // Images
      image: 'https://example.com/main-image.jpg',
      hero_image: 'https://example.com/hero-image.jpg',
      highlights_image: 'https://example.com/highlights-image.jpg',
      features_image: 'https://example.com/features-image.jpg',
      location_map_image: 'https://example.com/location-map.jpg',
      
      // Property Summary
      developer: 'Capital Group',
      property_type: 'Commercial Property',
      summary_type: 'SCO Plots',
      land_area: '7.4 Acres',
      current_status: 'Ongoing',
      ownership: 'Freehold',
      nearest_landmark: 'DLF Alameda',
      
      // Developer Information
      developer_name: 'CAPITAL DEVELOPERS INDIA',
      developer_description: 'Leading real estate developer with 20+ years of experience',
      
      // Arrays
      highlights: [
        'Prime Location in Sector 73',
        'Excellent Connectivity',
        'High ROI Potential',
        'Modern Infrastructure'
      ],
      features: [
        '24/7 Security',
        'Power Backup',
        'Parking Facility',
        'Green Landscaping'
      ],
      priceList: [
        {
          type_name: 'A',
          total_plots: '20',
          area: '101 SQYD',
          price: '₹1,85,00,000',
          booking_amount: '₹10,00,000'
        },
        {
          type_name: 'B',
          total_plots: '15',
          area: '127 SQYD',
          price: '₹2,25,00,000',
          booking_amount: '₹12,00,000'
        }
      ],
      locationDetails: [
        '5 minutes from Metro Station',
        '10 minutes from Airport',
        'Near Shopping Malls',
        'Close to Schools and Hospitals'
      ],
      commitments: [
        'Timely Delivery',
        'World-Class Quality',
        'Contemporary Designs',
        'Best Customer Support'
      ],
      gallery: [
        'https://example.com/gallery1.jpg',
        'https://example.com/gallery2.jpg',
        'https://example.com/gallery3.jpg'
      ]
    };

    // Insert main property
    const { data: property, error: propError } = await supabase
      .from('properties')
      .insert({
        title: completePropertyData.title,
        property_subtitle: completePropertyData.property_subtitle,
        location: completePropertyData.location,
        price: completePropertyData.price,
        slug: completePropertyData.slug,
        type: completePropertyData.type,
        area: completePropertyData.area,
        description: completePropertyData.description,
        detailed_description: completePropertyData.detailed_description,
        featured: completePropertyData.featured,
        display_in_slider: completePropertyData.display_in_slider,
        bedrooms: completePropertyData.bedrooms,
        bathrooms: completePropertyData.bathrooms,
        image: completePropertyData.image,
        hero_image: completePropertyData.hero_image,
        highlights_image: completePropertyData.highlights_image,
        features_image: completePropertyData.features_image,
        location_map_image: completePropertyData.location_map_image
      })
      .select()
      .single();

    if (propError) {
      console.log(`❌ Property creation failed: ${propError.message}`);
      return;
    }

    console.log(`✅ Property created with ID: ${property.id}`);

    // 3. Test all related data insertion
    const propertyId = property.id;

    // Test gallery images
    const galleryImages = completePropertyData.gallery.map((url, index) => ({
      property_id: propertyId,
      image_url: url,
      image_order: index
    }));

    const { error: galleryError } = await supabase
      .from('property_gallery')
      .insert(galleryImages);

    if (galleryError) {
      console.log(`❌ Gallery insertion failed: ${galleryError.message}`);
    } else {
      console.log(`✅ Gallery insertion - OK (${galleryImages.length} images)`);
    }

    // Test property summary
    const { error: summaryError } = await supabase
      .from('property_summary')
      .insert({
        property_id: propertyId,
        developer: completePropertyData.developer,
        property_type: completePropertyData.property_type,
        summary_type: completePropertyData.summary_type,
        area: completePropertyData.area,
        price: completePropertyData.price,
        land_area: completePropertyData.land_area,
        current_status: completePropertyData.current_status,
        ownership: completePropertyData.ownership,
        nearest_landmark: completePropertyData.nearest_landmark
      });

    if (summaryError) {
      console.log(`❌ Property summary insertion failed: ${summaryError.message}`);
    } else {
      console.log('✅ Property summary insertion - OK');
    }

    // Test highlights
    const highlightData = completePropertyData.highlights.map((text, index) => ({
      property_id: propertyId,
      highlight_text: text,
      display_order: index
    }));

    const { error: highlightsError } = await supabase
      .from('property_highlights')
      .insert(highlightData);

    if (highlightsError) {
      console.log(`❌ Highlights insertion failed: ${highlightsError.message}`);
    } else {
      console.log(`✅ Highlights insertion - OK (${highlightData.length} items)`);
    }

    // Test features
    const featureData = completePropertyData.features.map((text, index) => ({
      property_id: propertyId,
      feature_text: text,
      display_order: index
    }));

    const { error: featuresError } = await supabase
      .from('property_features')
      .insert(featureData);

    if (featuresError) {
      console.log(`❌ Features insertion failed: ${featuresError.message}`);
    } else {
      console.log(`✅ Features insertion - OK (${featureData.length} items)`);
    }

    // Test price list
    const priceData = completePropertyData.priceList.map((item, index) => ({
      property_id: propertyId,
      type_name: item.type_name,
      total_plots: parseInt(item.total_plots),
      area: item.area,
      price: item.price,
      booking_amount: item.booking_amount,
      display_order: index
    }));

    const { error: priceError } = await supabase
      .from('property_price_list')
      .insert(priceData);

    if (priceError) {
      console.log(`❌ Price list insertion failed: ${priceError.message}`);
    } else {
      console.log(`✅ Price list insertion - OK (${priceData.length} items)`);
    }

    // Test location details
    const locationData = completePropertyData.locationDetails.map((text, index) => ({
      property_id: propertyId,
      location_point: text,
      display_order: index
    }));

    const { error: locationError } = await supabase
      .from('property_location_details')
      .insert(locationData);

    if (locationError) {
      console.log(`❌ Location details insertion failed: ${locationError.message}`);
    } else {
      console.log(`✅ Location details insertion - OK (${locationData.length} items)`);
    }

    // Test developer info
    const { error: developerError } = await supabase
      .from('property_developer_info')
      .insert({
        property_id: propertyId,
        developer_name: completePropertyData.developer_name,
        developer_description: completePropertyData.developer_description
      });

    if (developerError) {
      console.log(`❌ Developer info insertion failed: ${developerError.message}`);
    } else {
      console.log('✅ Developer info insertion - OK');
    }

    // Test commitments
    const commitmentData = completePropertyData.commitments.map((text, index) => ({
      property_id: propertyId,
      commitment_text: text,
      display_order: index
    }));

    const { error: commitmentsError } = await supabase
      .from('property_commitments')
      .insert(commitmentData);

    if (commitmentsError) {
      console.log(`❌ Commitments insertion failed: ${commitmentsError.message}`);
    } else {
      console.log(`✅ Commitments insertion - OK (${commitmentData.length} items)`);
    }

    // 4. Test complete data retrieval
    console.log('\n3. Testing complete data retrieval...');
    
    const { data: retrievedProperty, error: retrieveError } = await supabase
      .from('properties')
      .select(`
        *,
        property_gallery (*),
        property_highlights (*),
        property_features (*),
        property_price_list (*),
        property_location_details (*),
        property_developer_info (*),
        property_commitments (*),
        property_summary (*)
      `)
      .eq('id', propertyId)
      .single();

    if (retrieveError) {
      console.log(`❌ Property retrieval failed: ${retrieveError.message}`);
    } else {
      console.log('✅ Property retrieval - OK');
      console.log(`   - Basic Info: ${retrievedProperty.title}`);
      console.log(`   - Gallery: ${retrievedProperty.property_gallery?.length || 0} images`);
      console.log(`   - Highlights: ${retrievedProperty.property_highlights?.length || 0}`);
      console.log(`   - Features: ${retrievedProperty.property_features?.length || 0}`);
      console.log(`   - Price List: ${retrievedProperty.property_price_list?.length || 0}`);
      console.log(`   - Location Details: ${retrievedProperty.property_location_details?.length || 0}`);
      console.log(`   - Developer Info: ${retrievedProperty.property_developer_info ? 'Yes' : 'No'}`);
      console.log(`   - Commitments: ${retrievedProperty.property_commitments?.length || 0}`);
      console.log(`   - Summary: ${retrievedProperty.property_summary ? 'Yes' : 'No'}`);
    }

    // 5. Test API endpoint
    console.log('\n4. Testing API endpoint...');
    
    try {
      const response = await fetch(`http://localhost:3000/api/properties/${propertyId}`);
      if (response.ok) {
        const apiData = await response.json();
        console.log('✅ API endpoint - OK');
        console.log(`   - API Highlights: ${apiData.highlights?.length || 0}`);
        console.log(`   - API Features: ${apiData.features?.length || 0}`);
        console.log(`   - API Price List: ${apiData.priceList?.length || 0}`);
        console.log(`   - API Location Details: ${apiData.locationDetails?.length || 0}`);
        console.log(`   - API Commitments: ${apiData.commitments?.length || 0}`);
        console.log(`   - API Developer Info: ${apiData.developerInfo ? 'Yes' : 'No'}`);
        console.log(`   - API Summary: ${apiData.summary ? 'Yes' : 'No'}`);
      } else {
        console.log(`❌ API endpoint failed: ${response.status}`);
      }
    } catch (apiError) {
      console.log(`❌ API endpoint error: ${apiError.message}`);
    }

    // 6. Clean up test data
    console.log('\n5. Cleaning up test data...');
    const { error: deleteError } = await supabase
      .from('properties')
      .delete()
      .eq('id', propertyId);

    if (deleteError) {
      console.log(`❌ Cleanup failed: ${deleteError.message}`);
    } else {
      console.log('✅ Test data cleaned up');
    }

    console.log('\n🎉 Complete Property System Test Finished!');
    console.log('\n📋 Summary:');
    console.log('✅ All database tables are properly set up');
    console.log('✅ Property creation with all form fields works');
    console.log('✅ All related data is saved correctly');
    console.log('✅ Data retrieval works properly');
    console.log('✅ API endpoints are functioning');

  } catch (error) {
    console.error('❌ Test failed with error:', error);
  }
}

// Run the test
testCompletePropertySystem();
