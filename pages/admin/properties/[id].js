import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import { useForm } from 'react-hook-form';

export default function EditProperty() {
  const router = useRouter();
  const { id } = router.query;
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [galleryImages, setGalleryImages] = useState(['']);
  const propertyType = watch('type');

  useEffect(() => {
    // Check if user is logged in
    const adminUser = sessionStorage.getItem('adminUser');
    if (!adminUser) {
      router.push('/admin/login');
    }
    if (id) {
      fetchProperty();
    }
  }, [id]);

  const fetchProperty = async () => {
    try {
      const res = await fetch(`/api/properties/${id}`);
      const property = await res.json();

      // Set form values
      Object.keys(property).forEach(key => {
        if (key === 'gallery') {
          setGalleryImages(property.gallery.length > 0 ? property.gallery : ['']);
        } else if (key === 'featured') {
          setValue(key, property[key] ? 'true' : 'false');
        } else if (property[key] !== null) {
          setValue(key, property[key]);
        }
      });
    } catch (err) {
      console.error('Error fetching property:', err);
      alert('Failed to load property');
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);

    // Filter out empty gallery images
    const gallery = galleryImages.filter(img => img.trim() !== '');

    const propertyData = {
      ...data,
      gallery,
      bedrooms: data.bedrooms ? parseInt(data.bedrooms) : null,
      bathrooms: data.bathrooms ? parseInt(data.bathrooms) : null,
      featured: data.featured === 'true'
    };

    try {
      const res = await fetch(`/api/properties/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(propertyData),
      });

      if (res.ok) {
        router.push('/admin/dashboard');
      } else {
        const error = await res.json();
        alert('Error updating property: ' + (error.error || 'Unknown error'));
        setLoading(false);
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to update property');
      setLoading(false);
    }
  };

  const addGalleryImage = () => {
    setGalleryImages([...galleryImages, '']);
  };

  const updateGalleryImage = (index, value) => {
    const updated = [...galleryImages];
    updated[index] = value;
    setGalleryImages(updated);
  };

  const removeGalleryImage = (index) => {
    setGalleryImages(galleryImages.filter((_, i) => i !== index));
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Edit Property</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Title *</label>
                <input
                  {...register('title', { required: 'Title is required' })}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
                {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Location *</label>
                <input
                  {...register('location', { required: 'Location is required' })}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
                {errors.location && <span className="text-red-500 text-sm">{errors.location.message}</span>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Price *</label>
                <input
                  {...register('price', { required: 'Price is required' })}
                  placeholder="e.g., ₹1,85,00,000"
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
                {errors.price && <span className="text-red-500 text-sm">{errors.price.message}</span>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Slug *</label>
                <input
                  {...register('slug', { required: 'Slug is required' })}
                  placeholder="e.g., property-name-location"
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
                {errors.slug && <span className="text-red-500 text-sm">{errors.slug.message}</span>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Type *</label>
                <select
                  {...register('type', { required: 'Type is required' })}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Type</option>
                  <option value="commercial">Commercial</option>
                  <option value="residential">Residential</option>
                  <option value="sco">SCO</option>
                </select>
                {errors.type && <span className="text-red-500 text-sm">{errors.type.message}</span>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Area</label>
                <input
                  {...register('area')}
                  placeholder="e.g., 70-127 SQYD or 3,500 sq ft"
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {propertyType === 'residential' && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">Bedrooms</label>
                    <input
                      {...register('bedrooms')}
                      type="number"
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Bathrooms</label>
                    <input
                      {...register('bathrooms')}
                      type="number"
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">Featured</label>
                <select
                  {...register('featured')}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Main Image URL</label>
              <input
                {...register('image')}
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Location Map Image URL</label>
              <input
                {...register('location_image')}
                placeholder="https://example.com/location-map.jpg"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                {...register('description')}
                rows={3}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Specifications</label>
              <textarea
                {...register('specifications')}
                rows={2}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Special Offer</label>
              <input
                {...register('special_offer')}
                placeholder="e.g., EOI PRICE: ₹2.70 Cr (All Inclusive) + GST"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Gallery Images</label>
              {galleryImages.map((image, index) => (
                <div key={index} className="flex space-x-2 mb-2">
                  <input
                    value={image}
                    onChange={(e) => updateGalleryImage(index, e.target.value)}
                    placeholder="https://example.com/gallery-image.jpg"
                    className="flex-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(index)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addGalleryImage}
                className="mt-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Add Gallery Image
              </button>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
              >
                {loading ? 'Updating...' : 'Update Property'}
              </button>
              <button
                type="button"
                onClick={() => router.push('/admin/dashboard')}
                className="px-6 py-3 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}