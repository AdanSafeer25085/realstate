import supabase from '../../../lib/supabase';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    // Get single property from database
    try {
      const { data: property, error } = await supabase
        .from('properties')
        .select(`
          *,
          property_gallery (
            id,
            image_url,
            image_order
          )
        `)
        .eq('id', id)
        .single();

      if (error || !property) {
        return res.status(404).json({ error: 'Property not found' });
      }

      // Transform gallery data
      const gallery = property.property_gallery
        .sort((a, b) => a.image_order - b.image_order)
        .map(img => img.image_url);

      const { property_gallery, ...propertyData } = property;

      return res.status(200).json({
        ...propertyData,
        gallery
      });

    } catch (error) {
      console.error('Error fetching property:', error);
      return res.status(500).json({ error: 'Failed to fetch property' });
    }
  }

  if (req.method === 'PUT') {
    // Update property - no auth check
    try {
      const { gallery, ...propertyData } = req.body;

      // Update property
      const { data: property, error: propError } = await supabase
        .from('properties')
        .update({
          ...propertyData,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (propError) {
        throw propError;
      }

      // Update gallery images if provided
      if (gallery !== undefined) {
        // Delete existing gallery images
        await supabase
          .from('property_gallery')
          .delete()
          .eq('property_id', id);

        // Insert new gallery images
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
            console.error('Error updating gallery:', galleryError);
          }
        }
      }

      return res.status(200).json({ ...property, gallery: gallery || [] });

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