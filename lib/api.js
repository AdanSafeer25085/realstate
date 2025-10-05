// API helper functions to fetch properties from database

export async function fetchProperties(type = null, featured = null) {
  try {
    // For server-side, directly import and use Supabase instead of fetch
    if (typeof window === 'undefined') {
      const supabase = require('../lib/supabase').default;

      let query = supabase
        .from('properties')
        .select(`*, property_gallery (id, image_url, image_order)`)
        .order('created_at', { ascending: false });

      if (type) {
        query = query.eq('type', type);
      }
      if (featured !== null) {
        query = query.eq('featured', featured);
      }

      const { data: properties, error } = await query;

      if (error) {
        console.error('Supabase error:', error);
        return [];
      }

      return properties || [];
    }

    // Client-side fetch
    let url = `/api/properties`;
    const params = new URLSearchParams();

    if (type) params.append('type', type);
    if (featured !== null) params.append('featured', featured.toString());

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Failed to fetch properties from API');
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
}

export async function fetchPropertyBySlug(slug) {
  try {
    const properties = await fetchProperties();
    return properties.find(p => p.slug === slug) || null;
  } catch (error) {
    console.error('Error fetching property by slug:', error);
    return null;
  }
}

export async function fetchPropertyById(id) {
  try {
    // For server-side, directly use Supabase
    if (typeof window === 'undefined') {
      const supabase = require('../lib/supabase').default;

      const { data: property, error } = await supabase
        .from('properties')
        .select(`*, property_gallery (id, image_url, image_order)`)
        .eq('id', id)
        .single();

      if (error) {
        console.error('Supabase error:', error);
        return null;
      }

      return property;
    }

    // Client-side fetch
    const res = await fetch(`/api/properties/${id}`);
    if (!res.ok) {
      throw new Error('Failed to fetch property');
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching property by ID:', error);
    return null;
  }
}