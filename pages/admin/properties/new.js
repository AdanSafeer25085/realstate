import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import { useForm } from 'react-hook-form';

export default function NewProperty() {
  const router = useRouter();
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [galleryImages, setGalleryImages] = useState(['']);
  const [highlights, setHighlights] = useState(['']);
  const [features, setFeatures] = useState(['']);
  const [priceList, setPriceList] = useState([{ type_name: '', total_plots: '', area: '', price: '', booking_amount: '' }]);
  const [locationDetails, setLocationDetails] = useState(['']);
  const [commitments, setCommitments] = useState(['']);
  const propertyType = watch('type');

  useEffect(() => {
    // Check if user is logged in
    const adminUser = sessionStorage.getItem('adminUser');
    if (!adminUser) {
      router.push('/admin/login');
    }
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);

    // Filter out empty arrays
    const gallery = galleryImages.filter(img => img.trim() !== '');
    const filteredHighlights = highlights.filter(h => h.trim() !== '');
    const filteredFeatures = features.filter(f => f.trim() !== '');
    const filteredPriceList = priceList.filter(p => p.type_name.trim() !== '');
    const filteredLocationDetails = locationDetails.filter(l => l.trim() !== '');
    const filteredCommitments = commitments.filter(c => c.trim() !== '');

    const propertyData = {
      ...data,
      gallery,
      highlights: filteredHighlights,
      features: filteredFeatures,
      priceList: filteredPriceList,
      locationDetails: filteredLocationDetails,
      commitments: filteredCommitments,
      bedrooms: data.bedrooms ? parseInt(data.bedrooms) : null,
      bathrooms: data.bathrooms ? parseInt(data.bathrooms) : null,
      featured: data.featured === 'true',
      display_in_slider: data.display_in_slider === 'true'
    };

    try {
      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(propertyData),
      });

      if (res.ok) {
        router.push('/admin/dashboard');
      } else {
        const error = await res.json();
        alert('Error creating property: ' + (error.error || 'Unknown error'));
        setLoading(false);
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to create property');
      setLoading(false);
    }
  };

  // Gallery Images Functions
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

  // Highlights Functions
  const addHighlight = () => {
    setHighlights([...highlights, '']);
  };

  const updateHighlight = (index, value) => {
    const updated = [...highlights];
    updated[index] = value;
    setHighlights(updated);
  };

  const removeHighlight = (index) => {
    setHighlights(highlights.filter((_, i) => i !== index));
  };

  // Features Functions
  const addFeature = () => {
    setFeatures([...features, '']);
  };

  const updateFeature = (index, value) => {
    const updated = [...features];
    updated[index] = value;
    setFeatures(updated);
  };

  const removeFeature = (index) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  // Price List Functions
  const addPriceListItem = () => {
    setPriceList([...priceList, { type_name: '', total_plots: '', area: '', price: '', booking_amount: '' }]);
  };

  const updatePriceListItem = (index, field, value) => {
    const updated = [...priceList];
    updated[index][field] = value;
    setPriceList(updated);
  };

  const removePriceListItem = (index) => {
    setPriceList(priceList.filter((_, i) => i !== index));
  };

  // Location Details Functions
  const addLocationDetail = () => {
    setLocationDetails([...locationDetails, '']);
  };

  const updateLocationDetail = (index, value) => {
    const updated = [...locationDetails];
    updated[index] = value;
    setLocationDetails(updated);
  };

  const removeLocationDetail = (index) => {
    setLocationDetails(locationDetails.filter((_, i) => i !== index));
  };

  // Commitments Functions
  const addCommitment = () => {
    setCommitments([...commitments, '']);
  };

  const updateCommitment = (index, value) => {
    const updated = [...commitments];
    updated[index] = value;
    setCommitments(updated);
  };

  const removeCommitment = (index) => {
    setCommitments(commitments.filter((_, i) => i !== index));
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Add New Property</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Information */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Title *</label>
                  <input
                    {...register('title', { required: 'Title is required' })}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Property Subtitle</label>
                  <input
                    {...register('property_subtitle')}
                    placeholder="e.g., SCO PLOTS, SECTOR 73 - GURGAON"
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
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

                <div>
                  <label className="block text-sm font-medium mb-2">Show in Slider</label>
                  <select
                    {...register('display_in_slider')}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="false">No (Only in dropdown)</option>
                    <option value="true">Yes (In slider and dropdown)</option>
                  </select>
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
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  {...register('description')}
                  rows={3}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium mb-2">Detailed Description</label>
                <textarea
                  {...register('detailed_description')}
                  rows={5}
                  placeholder="Detailed description for the property page"
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Images */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Images</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Main Image URL</label>
                  <input
                    {...register('image')}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Hero Image URL</label>
                  <input
                    {...register('hero_image')}
                    placeholder="https://example.com/hero-image.jpg"
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Highlights Image URL</label>
                  <input
                    {...register('highlights_image')}
                    placeholder="https://example.com/highlights-image.jpg"
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Features Image URL</label>
                  <input
                    {...register('features_image')}
                    placeholder="https://example.com/features-image.jpg"
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Location Map Image URL</label>
                  <input
                    {...register('location_map_image')}
                    placeholder="https://example.com/location-map.jpg"
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Property Summary */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Property Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Developer</label>
                  <input
                    {...register('developer')}
                    placeholder="e.g., Capital Group"
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Property Type</label>
                  <input
                    {...register('property_type')}
                    placeholder="e.g., Commercial Property"
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Summary Type</label>
                  <input
                    {...register('summary_type')}
                    placeholder="e.g., SCO Plots"
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Land Area</label>
                  <input
                    {...register('land_area')}
                    placeholder="e.g., 7.4 Acres"
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Current Status</label>
                  <input
                    {...register('current_status')}
                    placeholder="e.g., Ongoing"
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Ownership</label>
                  <input
                    {...register('ownership')}
                    placeholder="e.g., Freehold"
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Nearest Landmark</label>
                  <input
                    {...register('nearest_landmark')}
                    placeholder="e.g., DLF Alameda"
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Developer Information */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Developer Information</h2>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Developer Name</label>
                  <input
                    {...register('developer_name')}
                    placeholder="e.g., CAPITAL DEVELOPERS INDIA"
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Developer Description</label>
                  <textarea
                    {...register('developer_description')}
                    rows={4}
                    placeholder="Description about the developer"
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Highlights</h2>
              {highlights.map((highlight, index) => (
                <div key={index} className="flex space-x-2 mb-2">
                  <input
                    value={highlight}
                    onChange={(e) => updateHighlight(index, e.target.value)}
                    placeholder="Enter a highlight point"
                    className="flex-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeHighlight(index)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addHighlight}
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Add Highlight
              </button>
            </div>

            {/* Features */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Features</h2>
              {features.map((feature, index) => (
                <div key={index} className="flex space-x-2 mb-2">
                  <input
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    placeholder="Enter a feature"
                    className="flex-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addFeature}
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Add Feature
              </button>
            </div>

            {/* Price List */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Price List & Area</h2>
              {priceList.map((item, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4 p-4 border rounded">
                  <div>
                    <label className="block text-sm font-medium mb-2">Type</label>
                    <input
                      value={item.type_name}
                      onChange={(e) => updatePriceListItem(index, 'type_name', e.target.value)}
                      placeholder="e.g., A"
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Total Plots</label>
                    <input
                      value={item.total_plots}
                      onChange={(e) => updatePriceListItem(index, 'total_plots', e.target.value)}
                      placeholder="e.g., 20"
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Area</label>
                    <input
                      value={item.area}
                      onChange={(e) => updatePriceListItem(index, 'area', e.target.value)}
                      placeholder="e.g., 101 SQYD"
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Price</label>
                    <input
                      value={item.price}
                      onChange={(e) => updatePriceListItem(index, 'price', e.target.value)}
                      placeholder="e.g., on request"
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Booking Amount</label>
                    <input
                      value={item.booking_amount}
                      onChange={(e) => updatePriceListItem(index, 'booking_amount', e.target.value)}
                      placeholder="e.g., ₹10 Lac"
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={() => removePriceListItem(index)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addPriceListItem}
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Add Price List Item
              </button>
            </div>

            {/* Location Details */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Location Details</h2>
              {locationDetails.map((detail, index) => (
                <div key={index} className="flex space-x-2 mb-2">
                  <input
                    value={detail}
                    onChange={(e) => updateLocationDetail(index, e.target.value)}
                    placeholder="Enter a location point"
                    className="flex-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeLocationDetail(index)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addLocationDetail}
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Add Location Detail
              </button>
            </div>

            {/* Our Commitments */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Our Commitments</h2>
              {commitments.map((commitment, index) => (
                <div key={index} className="flex space-x-2 mb-2">
                  <input
                    value={commitment}
                    onChange={(e) => updateCommitment(index, e.target.value)}
                    placeholder="e.g., Timely Delivery"
                    className="flex-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeCommitment(index)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addCommitment}
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Add Commitment
              </button>
            </div>

            {/* Gallery Images */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Gallery Images</h2>
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
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
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
                {loading ? 'Creating...' : 'Create Property'}
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