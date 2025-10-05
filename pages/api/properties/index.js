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
      const { gallery, ...propertyData } = req.body;

      // Insert property
      const { data: property, error: propError } = await supabase
        .from('properties')
        .insert({
          ...propertyData
        })
        .select()
        .single();

      if (propError) {
        throw propError;
      }

      // Insert gallery images if provided
      if (gallery && gallery.length > 0) {
        const galleryImages = gallery.map((url, index) => ({
          property_id: property.id,
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

      return res.status(201).json({ ...property, gallery: gallery || [] });

    } catch (error) {
      console.error('Error creating property:', error);
      return res.status(500).json({ error: 'Failed to create property' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}