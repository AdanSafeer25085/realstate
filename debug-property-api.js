// Debug script to test property creation API
// Run this with: node debug-property-api.js

const testPropertyData = {
  title: 'Test Property Debug',
  location: 'Test Location',
  price: '₹1,00,00,000',
  type: 'commercial',
  slug: `test-property-debug-${Date.now()}`,
  area: '100 SQYD',
  description: 'Test description for debugging',
  featured: false,
  display_in_slider: false,
  property_subtitle: 'Test Subtitle',
  detailed_description: 'Detailed test description',
  
  // Property Summary
  developer: 'Test Developer',
  property_type: 'Commercial Property',
  summary_type: 'SCO Plots',
  land_area: '5 Acres',
  current_status: 'Ongoing',
  ownership: 'Freehold',
  nearest_landmark: 'Test Landmark',
  
  // Developer Info
  developer_name: 'Test Developer Name',
  developer_description: 'Test developer description',
  
  // Arrays
  highlights: ['Test highlight 1', 'Test highlight 2'],
  features: ['Test feature 1', 'Test feature 2'],
  priceList: [
    {
      type_name: 'A',
      total_plots: '10',
      area: '100 SQYD',
      price: '₹1,00,00,000',
      booking_amount: '₹10,00,000'
    }
  ],
  locationDetails: ['Test location point 1', 'Test location point 2'],
  commitments: ['Timely Delivery', 'World-Class Quality'],
  gallery: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg']
};

async function testPropertyCreation() {
  console.log('🧪 Testing Property Creation API...\n');
  
  try {
    const response = await fetch('http://localhost:3000/api/properties', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testPropertyData),
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Property created successfully!');
      console.log('Property ID:', result.id);
      console.log('Property Slug:', result.slug);
      console.log('Property Title:', result.title);
      
      // Test fetching the property
      console.log('\n🔍 Testing property retrieval...');
      const fetchResponse = await fetch(`http://localhost:3000/api/properties/${result.id}`);
      
      if (fetchResponse.ok) {
        const propertyData = await fetchResponse.json();
        console.log('✅ Property retrieved successfully!');
        console.log('Highlights:', propertyData.highlights?.length || 0);
        console.log('Features:', propertyData.features?.length || 0);
        console.log('Price List:', propertyData.priceList?.length || 0);
        console.log('Location Details:', propertyData.locationDetails?.length || 0);
        console.log('Commitments:', propertyData.commitments?.length || 0);
        console.log('Developer Info:', propertyData.developerInfo ? 'Yes' : 'No');
        console.log('Summary:', propertyData.summary ? 'Yes' : 'No');
      } else {
        console.log('❌ Failed to retrieve property:', await fetchResponse.text());
      }
      
    } else {
      const error = await response.text();
      console.log('❌ Property creation failed:');
      console.log('Status:', response.status);
      console.log('Error:', error);
    }
    
  } catch (error) {
    console.log('❌ Test failed with error:', error.message);
  }
}

// Run the test
testPropertyCreation();
