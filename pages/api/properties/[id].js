import supabase from '../../../lib/supabase';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    // Get single property from database
    try {
      // // console.log('Fetching property with ID:', id);

      // First, get just the basic property data
      const { data: property, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Database error:', error);
        return res.status(404).json({ error: 'Property not found', details: error.message });
      }

      if (!property) {
        console.error('No property found with ID:', id);
        return res.status(404).json({ error: 'Property not found' });
      }

      // // console.log('Basic property data loaded:', property);

      // Get related data separately to avoid join issues
      let gallery = [];
      let highlights = [];
      let features = [];
      let commitments = [];

      try {
        // Get gallery images
        const { data: galleryData } = await supabase
          .from('property_gallery')
          .select('image_url, image_order')
          .eq('property_id', id)
          .order('image_order');

        gallery = galleryData ? galleryData.map(img => img.image_url) : [];
        // console.log('Gallery loaded:', gallery.length, 'images');
      } catch (galleryError) {
        console.error('Error loading gallery:', galleryError);
      }

      try {
        // Get highlights
        const { data: highlightsData } = await supabase
          .from('property_highlights')
          .select('*')
          .eq('property_id', id)
          .order('display_order');

        highlights = highlightsData ? highlightsData.map(item => item.text || item.content || item.highlight) : [];
        // console.log('Highlights loaded:', highlights.length, 'items');
      } catch (highlightsError) {
        console.error('Error loading highlights:', highlightsError);
      }

      try {
        // Get features
        const { data: featuresData } = await supabase
          .from('property_features')
          .select('*')
          .eq('property_id', id)
          .order('display_order');

        features = featuresData ? featuresData.map(item => item.text || item.content || item.feature) : [];
        // console.log('Features loaded:', features.length, 'items');
      } catch (featuresError) {
        console.error('Error loading features:', featuresError);
      }

      try {
        // Get commitments
        const { data: commitmentsData } = await supabase
          .from('property_commitments')
          .select('*')
          .eq('property_id', id)
          .order('display_order');

        commitments = commitmentsData ? commitmentsData.map(item => item.text || item.content || item.commitment) : [];
        // console.log('Commitments loaded:', commitments.length, 'items');
      } catch (commitmentsError) {
        console.error('Error loading commitments:', commitmentsError);
      }

      const result = {
        ...property,
        gallery,
        highlights,
        features,
        commitments,
        priceList: [], // Will implement if needed
        locationDetails: [] // Will implement if needed
      };

      // console.log('Final result structure:', Object.keys(result));
      return res.status(200).json(result);

    } catch (error) {
      console.error('Error fetching property:', error);
      return res.status(500).json({ error: 'Failed to fetch property', details: error.message });
    }
  }

  if (req.method === 'PUT') {
    // Update property - no auth check
    try {
      // console.log('PUT request received for property ID:', id);
      // console.log('Request body:', JSON.stringify(req.body, null, 2));

      const {
        gallery,
        highlights,
        features,
        commitments,
        priceList,
        locationDetails,
        ...propertyData
      } = req.body;

      // console.log('Property data to update:', JSON.stringify(propertyData, null, 2));

      // Define allowed fields that exist in the properties table (exact match from database)
      const allowedFields = [
        'title', 'location', 'price', 'image', 'location_image', 'type', 'slug', 'area',
        'description', 'specifications', 'bedrooms', 'bathrooms', 'featured', 'special_offer',
        'created_by', 'hero_image', 'highlights_image', 'features_image', 'location_map_image',
        'property_subtitle', 'detailed_description', 'display_in_slider', 'developer',
        'property_type', 'summary_type', 'land_area', 'current_status', 'ownership',
        'completion_year', 'tower_floors', 'units_per_floor', 'total_units', 'rera_number'
      ];

      // Filter propertyData to only include allowed fields and handle UUID fields
      const filteredPropertyData = {};
      Object.keys(propertyData).forEach(key => {
        if (allowedFields.includes(key)) {
          // Don't include empty strings for UUID fields (they should be null)
          if (key === 'created_by' && propertyData[key] === '') {
            // Skip empty UUID fields - don't update them
            return;
          }
          filteredPropertyData[key] = propertyData[key];
        } else {
          // console.log(`Skipping unknown field: ${key}`);
        }
      });

      // console.log('Filtered property data:', JSON.stringify(filteredPropertyData, null, 2));

      // Update property (excluding the fields that go in separate tables)
      const { data: property, error: propError } = await supabase
        .from('properties')
        .update({
          ...filteredPropertyData,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (propError) {
        console.error('Database error updating property:', propError);
        console.error('Error details:', {
          message: propError.message,
          details: propError.details,
          hint: propError.hint,
          code: propError.code
        });
        throw propError;
      }

      // console.log('Property updated successfully:', property);

      // Update gallery images if provided
      if (gallery !== undefined) {
        // console.log('Updating gallery with:', gallery);

        // Delete existing gallery images
        const { error: deleteError } = await supabase
          .from('property_gallery')
          .delete()
          .eq('property_id', id);

        if (deleteError) {
          console.error('Error deleting existing gallery:', deleteError);
        }

        // Insert new gallery images
        if (gallery && gallery.length > 0) {
          const galleryImages = gallery.map((url, index) => ({
            property_id: property.id,
            image_url: url,
            image_order: index
          }));

          // console.log('Inserting gallery images:', galleryImages);

          const { error: galleryError } = await supabase
            .from('property_gallery')
            .insert(galleryImages);

          if (galleryError) {
            console.error('Error updating gallery:', galleryError);
            // Don't throw here, just log the error
          }
        }
      }

      // Update highlights if provided
      if (highlights !== undefined) {
        // console.log('Updating highlights:', highlights);

        // Delete existing highlights
        await supabase
          .from('property_highlights')
          .delete()
          .eq('property_id', id);

        // Insert new highlights
        if (highlights && highlights.length > 0) {
          const highlightData = highlights.map((text, index) => ({
            property_id: property.id,
            text: text,
            display_order: index
          }));

          const { error: highlightsError } = await supabase
            .from('property_highlights')
            .insert(highlightData);

          if (highlightsError) {
            console.error('Error updating highlights:', highlightsError);
          }
        }
      }

      // Update features if provided
      if (features !== undefined) {
        // console.log('Updating features:', features);

        // Delete existing features
        await supabase
          .from('property_features')
          .delete()
          .eq('property_id', id);

        // Insert new features
        if (features && features.length > 0) {
          const featureData = features.map((text, index) => ({
            property_id: property.id,
            text: text,
            display_order: index
          }));

          const { error: featuresError } = await supabase
            .from('property_features')
            .insert(featureData);

          if (featuresError) {
            console.error('Error updating features:', featuresError);
          }
        }
      }

      // Update commitments if provided
      if (commitments !== undefined) {
        // console.log('Updating commitments:', commitments);

        // Delete existing commitments
        await supabase
          .from('property_commitments')
          .delete()
          .eq('property_id', id);

        // Insert new commitments
        if (commitments && commitments.length > 0) {
          const commitmentData = commitments.map((text, index) => ({
            property_id: property.id,
            text: text,
            display_order: index
          }));

          const { error: commitmentsError } = await supabase
            .from('property_commitments')
            .insert(commitmentData);

          if (commitmentsError) {
            console.error('Error updating commitments:', commitmentsError);
          }
        }
      }

      return res.status(200).json({
        ...property,
        gallery: gallery || [],
        highlights: highlights || [],
        features: features || [],
        commitments: commitments || [],
        priceList: priceList || [],
        locationDetails: locationDetails || []
      });

    } catch (error) {
      console.error('Error updating property:', error);
      console.error('Error stack:', error.stack);

      // Return more specific error information
      return res.status(500).json({
        error: 'Failed to update property',
        details: error.message,
        code: error.code || 'UNKNOWN_ERROR'
      });
    }
  }

  if (req.method === 'PATCH') {
    // Update specific property fields (like display_in_slider)
    try {
      const { display_in_slider } = req.body;

      const updateData = {};
      if (display_in_slider !== undefined) {
        updateData.display_in_slider = display_in_slider;
      }

      const { data: property, error } = await supabase
        .from('properties')
        .update({
          ...updateData,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return res.status(200).json(property);

    } catch (error) {
      console.error('Error updating property:', error);
      return res.status(500).json({ error: 'Failed to update property' });
    }
  }

  if (req.method === 'DELETE') {
    // Delete property - no auth check
    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      return res.status(200).json({ success: true, message: 'Property deleted successfully' });

    } catch (error) {
      console.error('Error deleting property:', error);
      return res.status(500).json({ error: 'Failed to delete property' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}