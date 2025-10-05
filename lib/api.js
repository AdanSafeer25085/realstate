// API helper functions to fetch properties from database

export async function fetchProperties(type = null, featured = null) {
  try {
    // Use different URLs for server-side vs client-side
    const baseUrl = typeof window === 'undefined'
      ? process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'
      : '';

    let url = `${baseUrl}/api/properties`;
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
    console.error('Error fetching properties from API:', error);
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
    const baseUrl = typeof window === 'undefined'
      ? process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'
      : '';

    const res = await fetch(`${baseUrl}/api/properties/${id}`);
    if (!res.ok) {
      throw new Error('Failed to fetch property');
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching property by ID:', error);
    return null;
  }
}