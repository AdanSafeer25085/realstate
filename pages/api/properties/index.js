import supabase from '../../../lib/supabase';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Get all properties from database
    try {
      const { type, featured } = req.query;

      let query = supabase
        .from('properties')
        .select(`
          *,
          property_gallery (
            id,
            image_url,
            image_order
          )
        `)
        .order('created_at', { ascending: false });

      if (type) {
        query = query.eq('type', type);
      }

      if (featured === 'true') {
        query = query.eq('featured', true);
      }

      const { data: properties, error } = await query;

      if (error) {
        throw error;
      }

      // Transform gallery data
      const transformedProperties = properties.map(prop => {
        const gallery = prop.property_gallery
          .sort((a, b) => a.image_order - b.image_order)
          .map(img => img.image_url);

        const { property_gallery, ...propertyData } = prop;
        return {
          ...propertyData,
          gallery
        };
      });

      return res.status(200).json(transformedProperties);

    } catch (error) {
      console.error('Error fetching properties:', error);
      return res.status(500).json({ error: 'Failed to fetch properties' });
    }
  }

  if (req.method === 'POST') {
    // Create new property - no auth check
    try {
      const {
        gallery,
        highlights,
        features,
        priceList,
        locationDetails,
        commitments,
        developer,
        property_type,
        summary_type,
        land_area,
        current_status,
        ownership,
        nearest_landmark,
        developer_name,
        developer_description,
        ...propertyData
      } = req.body;

      // Generate unique slug if one isn't provided or if it conflicts
      let uniqueSlug = propertyData.slug;
      if (!uniqueSlug || uniqueSlug.trim() === '') {
        // Generate slug from title if none provided
        uniqueSlug = propertyData.title
          ?.toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .substring(0, 50) || 'property';
      }

      // Check if slug exists and make it unique
      let slugAttempt = uniqueSlug;
      let slugCounter = 1;
      let slugExists = true;

      while (slugExists) {
        const { data: existingProperty } = await supabase
          .from('properties')
          .select('id')
          .eq('slug', slugAttempt)
          .single();

        if (!existingProperty) {
          slugExists = false;
          uniqueSlug = slugAttempt;
        } else {
          slugAttempt = `${uniqueSlug}-${slugCounter}`;
          slugCounter++;
        }
      }

      console.log('Generated unique slug:', uniqueSlug);

      // Insert main property with unique slug
      const { data: property, error: propError } = await supabase
        .from('properties')
        .insert({
          ...propertyData,
          slug: uniqueSlug
        })
        .select()
        .single();

      if (propError) {
        console.error('Error creating property:', propError);
        throw propError;
      }

      const propertyId = property.id;

      // Insert gallery images if provided
      if (gallery && gallery.length > 0) {
        const galleryImages = gallery.map((url, index) => ({
          property_id: propertyId,
          image_url: url,
          image_order: index
        }));

        const { error: galleryError } = await supabase
          .from('property_gallery')
          .insert(galleryImages);

        if (galleryError) {
          console.error('Error inserting gallery:', galleryError);
        }
      }

      // Insert property summary
      if (developer || property_type || summary_type || land_area || current_status || ownership || nearest_landmark) {
        const { error: summaryError } = await supabase
          .from('property_summary')
          .insert({
            property_id: propertyId,
            developer,
            property_type,
            type: summary_type,
            area: propertyData.area,
            price: propertyData.price,
            land_area,
            current_status,
            ownership,
            nearest_landmark
          });

        if (summaryError) {
          console.error('Error inserting summary:', summaryError);
        }
      }

      // Insert highlights
      if (highlights && highlights.length > 0) {
        const highlightData = highlights.map((text, index) => ({
          property_id: propertyId,
          highlight_text: text,
          display_order: index
        }));

        const { error: highlightsError } = await supabase
          .from('property_highlights')
          .insert(highlightData);

        if (highlightsError) {
          console.error('Error inserting highlights:', highlightsError);
        }
      }

      // Insert features
      if (features && features.length > 0) {
        const featureData = features.map((text, index) => ({
          property_id: propertyId,
          feature_text: text,
          display_order: index
        }));

        const { error: featuresError } = await supabase
          .from('property_features')
          .insert(featureData);

        if (featuresError) {
          console.error('Error inserting features:', featuresError);
        }
      }

      // Insert price list
      if (priceList && priceList.length > 0) {
        const priceData = priceList.map((item, index) => ({
          property_id: propertyId,
          type_name: item.type_name,
          total_plots: item.total_plots ? parseInt(item.total_plots) : null,
          area: item.area,
          price: item.price,
          booking_amount: item.booking_amount,
          display_order: index
        }));

        const { error: priceError } = await supabase
          .from('property_price_list')
          .insert(priceData);

        if (priceError) {
          console.error('Error inserting price list:', priceError);
        }
      }

      // Insert location details
      if (locationDetails && locationDetails.length > 0) {
        const locationData = locationDetails.map((text, index) => ({
          property_id: propertyId,
          location_point: text,
          display_order: index
        }));

        const { error: locationError } = await supabase
          .from('property_location_details')
          .insert(locationData);

        if (locationError) {
          console.error('Error inserting location details:', locationError);
        }
      }

      // Insert developer info
      if (developer_name || developer_description) {
        const { error: developerError } = await supabase
          .from('property_developer_info')
          .insert({
            property_id: propertyId,
            developer_name,
            developer_description
          });

        if (developerError) {
          console.error('Error inserting developer info:', developerError);
        }
      }

      // Insert commitments
      if (commitments && commitments.length > 0) {
        const commitmentData = commitments.map((text, index) => ({
          property_id: propertyId,
          commitment_title: text,
          display_order: index
        }));

        const { error: commitmentError } = await supabase
          .from('property_commitments')
          .insert(commitmentData);

        if (commitmentError) {
          console.error('Error inserting commitments:', commitmentError);
        }
      }

      return res.status(201).json({ ...property, gallery: gallery || [] });

    } catch (error) {
      console.error('Error creating property:', error);
      return res.status(500).json({ error: 'Failed to create property' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}