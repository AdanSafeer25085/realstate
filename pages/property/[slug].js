import Head from "next/head";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { fetchPropertyBySlug } from '../../lib/api';
import {
  ChevronLeft,
  ChevronRight,
  X,
  Clock,
  CheckCircle,
  Building,
  Diamond,
  Headphones,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function PropertyDetail({ property, propertyDetails }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!property) {
    return <div>Property not found</div>;
  }

  const {
    summary = {},
    highlights = [],
    features = [],
    priceList = [],
    locationDetails = [],
    developerInfo = {},
    commitments = []
  } = propertyDetails || {};

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert(
      "Thank you for your inquiry! We have received your details and will contact you soon."
    );
    setFormData({
      name: "",
      phone: "",
      email: "",
    });
  };

  const nextImage = () => {
    if (property.property_gallery && property.property_gallery.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === property.property_gallery.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (property.property_gallery && property.property_gallery.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? property.property_gallery.length - 1 : prev - 1
      );
    }
  };


  const openGallery = (index = 0) => {
    setCurrentImageIndex(index);
    setIsGalleryOpen(true);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
  };

  const commitmentIcons = {
    'Timely Delivery': Clock,
    'World-Class Quality': CheckCircle,
    'Contemporary Designs': Building,
    'Top Class Partners': Users,
    'Best Customer Support': Headphones,
    'Value Creations': Diamond,
  };

  return (
    <Layout>
      <Head>
        <title>{property.title} - Helios Land</title>
        <meta
          name="description"
          content={`${property.title} in ${property.location}. Price: ${property.price}. Premium real estate property by Helios Land.`}
        />
      </Head>

      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center text-white overflow-hidden"
        style={{
          backgroundImage: `url('${property.hero_image || property.image}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Content */}
        <div className="container relative z-10">
          <div className="max-w-4xl">
            <div className="mb-4">
              <span className="text-sm uppercase tracking-wider text-brand-gold font-medium">
                {property.property_subtitle || property.type.toUpperCase()}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              {property.title}
            </h1>
            <div className="text-lg md:text-xl mb-8 text-gray-200">
              <span className="uppercase tracking-wide font-medium">{property.type} - {property.location}</span>
            </div>

            {/* Highlights */}
            {highlights.length > 0 && (
              <div className="space-y-3 mb-8">
                {highlights.slice(0, 4).map((highlight, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle size={20} className="text-brand-gold mr-3 flex-shrink-0" />
                    <span className="text-white">{highlight.highlight_text}</span>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' })}
              className="bg-brand-gold text-black px-8 py-3 rounded font-semibold hover:bg-yellow-400 transition-colors"
            >
              SCHEDULE SITE VISIT
            </button>
          </div>
        </div>
      </section>

      {/* SCO Plots Summary & Contact Form Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Summary */}
            <div className="lg:col-span-2">
              <div className="mb-4">
                <span className="text-sm uppercase tracking-wider text-gray-600">
                  {property.title}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-gold mb-8">
                SCO PLOTS SUMMARY
              </h2>

              {/* Summary Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Developer</h3>
                    <p className="text-gray-700">{summary.developer || 'Capital Group'}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Area</h3>
                    <p className="text-gray-700">{summary.area || property.area}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Current Status</h3>
                    <p className="text-gray-700">{summary.current_status || 'Ongoing'}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Property Type</h3>
                    <p className="text-gray-700">{summary.property_type || 'Commercial Property'}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Price</h3>
                    <p className="text-gray-700">{summary.price || property.price}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Ownership</h3>
                    <p className="text-gray-700">{summary.ownership || 'Freehold'}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Type</h3>
                    <p className="text-gray-700">{summary.type || property.type}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Land Area</h3>
                    <p className="text-gray-700">{summary.land_area || '7.4 Acres'}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Nearest Landmark</h3>
                    <p className="text-gray-700">{summary.nearest_landmark || 'DLF Alameda'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-1">
              <div id="contact-form" className="bg-gray-900 text-white p-6 rounded-lg">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-medium mb-2">INTERESTED IN SCO PLOTS?</h3>
                  <h2 className="text-2xl font-bold">GET INSTANT CALLBACK</h2>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-brand-gold"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Mobile NO"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-brand-gold"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email ID"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-brand-gold"
                  />
                  <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded transition-colors"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      {property.detailed_description && (
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="max-w-4xl">
              <div className="mb-4">
                <span className="text-xl uppercase tracking-wider text-gray-600">
                  BUILTUP SCO PLOTS
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-gold mb-8">
                {property.title.toUpperCase()}
              </h2>
              <div className="text-gray-700 text-lg leading-relaxed">
                {property.detailed_description}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Highlights Section */}
      {highlights.length > 0 && property.highlights_image && (
        <section className="py-16 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-brand-gold mb-8">
                  HIGHLIGHTS
                </h2>
                <div className="space-y-4">
                  {highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-gray-800 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                      <p className="text-gray-700">{highlight.highlight_text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <Image
                  src={property.highlights_image}
                  alt="Highlights"
                  width={600}
                  height={400}
                  className="rounded-lg object-cover w-full h-[400px]"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Picture Gallery */}
      {property.property_gallery && property.property_gallery.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-gold mb-8">
              PICTURE GALLERY
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {property.property_gallery.slice(0, 6).map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-video cursor-pointer overflow-hidden rounded-lg group"
                  onClick={() => openGallery(index)}
                >
                  <Image
                    src={image.image_url}
                    alt={`Gallery Image ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      {features.length > 0 && property.features_image && (
        <section className="py-16 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <Image
                  src={property.features_image}
                  alt="Features"
                  width={600}
                  height={400}
                  className="rounded-lg object-cover w-full h-[400px]"
                />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-brand-gold mb-8">
                  FEATURES
                </h2>
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-gray-800 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                      <p className="text-gray-700">{feature.feature_text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Price List & Area */}
      {priceList.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="mb-4">
              <span className="text-sm uppercase tracking-wider text-gray-600">
                {property.title}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-gold mb-8">
              PRICE LIST & AREA
            </h2>

            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold text-gray-900">Type</th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-900">Total Plots</th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-900">Area</th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-900">Price</th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-900">Booking Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {priceList.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="px-6 py-4 font-semibold text-gray-900">{item.type_name}</td>
                        <td className="px-6 py-4 text-gray-700">{item.total_plots}</td>
                        <td className="px-6 py-4 text-gray-700">{item.area}</td>
                        <td className="px-6 py-4 text-gray-700">{item.price}</td>
                        <td className="px-6 py-4 text-gray-700">{item.booking_amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Location Map */}
      {property.location_map_image && (
        <section className="py-16 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <Image
                  src={property.location_map_image}
                  alt="Location Map"
                  width={600}
                  height={400}
                  className="rounded-lg object-cover w-full h-[400px]"
                />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-brand-gold mb-8">
                  LOCATION MAP
                </h2>
                {locationDetails.length > 0 && (
                  <div className="space-y-4">
                    {locationDetails.map((detail, index) => (
                      <div key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-gray-800 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                        <p className="text-gray-700">{detail.location_point}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Developer Info */}
      {developerInfo.developer_name && (
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                {developerInfo.developer_name.toUpperCase()}
              </h2>
              <div className="w-16 h-1 bg-brand-gold mx-auto mb-8"></div>
              <p className="text-gray-700 text-lg leading-relaxed">
                {developerInfo.developer_description}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Our Commitment */}
      {commitments.length > 0 && (
        <section className="py-16 bg-gray-900 text-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                OUR COMMITMENT
              </h2>
              <div className="w-16 h-1 bg-brand-gold mx-auto"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {commitments.map((commitment, index) => {
                const IconComponent = commitmentIcons[commitment.commitment_title] || CheckCircle;
                return (
                  <div key={index} className="text-center">
                    <div className="mb-4 flex justify-center">
                      <IconComponent size={48} className="text-brand-gold" />
                    </div>
                    <h3 className="font-semibold text-sm">
                      {commitment.commitment_title}
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Modal */}
      {isGalleryOpen && property.property_gallery && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={closeGallery}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X size={32} />
            </button>

            {/* Main Image */}
            <div className="relative w-full h-full max-w-6xl max-h-[90vh] mx-4">
              <Image
                src={property.property_gallery[currentImageIndex].image_url}
                alt={`Gallery Image ${currentImageIndex + 1}`}
                fill
                className="object-contain"
              />
            </div>

            {/* Navigation */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
            >
              <ChevronLeft size={48} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
            >
              <ChevronRight size={48} />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-4 py-2 rounded">
              {currentImageIndex + 1} / {property.property_gallery.length}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;

  try {
    // Fetch property from database by slug
    const property = await fetchPropertyBySlug(slug);

    if (!property) {
      return {
        notFound: true,
      };
    }

    // Fetch additional property details
    const supabase = require('../../lib/supabase').default;

    // Fetch all related data
    const [summaryData, highlightsData, featuresData, priceListData, locationData, developerData, commitmentsData] = await Promise.all([
      supabase.from('property_summary').select('*').eq('property_id', property.id).single(),
      supabase.from('property_highlights').select('*').eq('property_id', property.id).order('display_order'),
      supabase.from('property_features').select('*').eq('property_id', property.id).order('display_order'),
      supabase.from('property_price_list').select('*').eq('property_id', property.id).order('display_order'),
      supabase.from('property_location_details').select('*').eq('property_id', property.id).order('display_order'),
      supabase.from('property_developer_info').select('*').eq('property_id', property.id).single(),
      supabase.from('property_commitments').select('*').eq('property_id', property.id).order('display_order'),
    ]);

    const propertyDetails = {
      summary: summaryData.data || {},
      highlights: highlightsData.data || [],
      features: featuresData.data || [],
      priceList: priceListData.data || [],
      locationDetails: locationData.data || [],
      developerInfo: developerData.data || {},
      commitments: commitmentsData.data || []
    };

    return {
      props: {
        property,
        propertyDetails,
      },
    };
  } catch (error) {
    console.error('Error fetching property details:', error);
    return {
      notFound: true,
    };
  }
}