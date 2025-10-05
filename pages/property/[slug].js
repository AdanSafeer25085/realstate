import Head from "next/head";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { fetchPropertyBySlug } from '../../lib/api';
import {
  Phone,
  MessageCircle,
  MapPin,
  Bed,
  Bath,
  Square,
  Calendar,
  Download,
  Share2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function PropertyDetail({ property }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!property) {
    return <div>Property not found</div>;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple form submission without database
    alert(
      "Thank you for your inquiry! We have received your details and will contact you soon."
    );

    // Reset form
    setFormData({
      name: "",
      phone: "",
      email: "",
      message: "",
    });
  };

  const handleScheduleVisit = () => {
    const message = `Hi, I would like to schedule a site visit for ${property.title}. Please let me know available dates.`;
    window.open(
      `https://wa.me/919811677423?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const handleDownloadBrochure = () => {
    alert("Brochure download will be available soon!");
  };

  const nextImage = () => {
    if (property.gallery && property.gallery.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === property.gallery.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (property.gallery && property.gallery.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? property.gallery.length - 1 : prev - 1
      );
    }
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
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

      {/* Property Header */}
      <section className="py-8 bg-brand-light-gray">
        <div className="container">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-brand-dark-blue mb-2">
                {property.title}
              </h1>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin size={18} className="mr-2" />
                <span>{property.location}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Details */}
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Property Image */}
              <div className="relative h-96 rounded-lg overflow-hidden mb-8">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-brand-gold text-white px-3 py-1 rounded text-sm font-semibold">
                  {property.type.toUpperCase()}
                </div>
                {property.featured && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded text-sm font-semibold">
                    Featured
                  </div>
                )}
              </div>

              {/* Property Specifications */}
              {property.bedrooms && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-brand-light-gray p-4 rounded-lg text-center">
                    <Bed size={24} className="mx-auto mb-2 text-brand-gold" />
                    <div className="font-semibold text-brand-dark-blue">
                      {property.bedrooms}
                    </div>
                    <div className="text-sm text-gray-600">Bedrooms</div>
                  </div>
                  <div className="bg-brand-light-gray p-4 rounded-lg text-center">
                    <Bath size={24} className="mx-auto mb-2 text-brand-gold" />
                    <div className="font-semibold text-brand-dark-blue">
                      {property.bathrooms}
                    </div>
                    <div className="text-sm text-gray-600">Bathrooms</div>
                  </div>
                  <div className="bg-brand-light-gray p-4 rounded-lg text-center">
                    <Square
                      size={24}
                      className="mx-auto mb-2 text-brand-gold"
                    />
                    <div className="font-semibold text-brand-dark-blue">
                      {property.area}
                    </div>
                    <div className="text-sm text-gray-600">Area</div>
                  </div>
                  <div className="bg-brand-light-gray p-4 rounded-lg text-center">
                    <MapPin
                      size={24}
                      className="mx-auto mb-2 text-brand-gold"
                    />
                    <div className="font-semibold text-brand-dark-blue">
                      {property.type}
                    </div>
                    <div className="text-sm text-gray-600">Type</div>
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-brand-dark-blue mb-4">
                  Property Description
                </h2>
                <div className="text-gray-700 space-y-4">
                  {property.description}
                </div>
              </div>

              {/* Key Features */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-brand-dark-blue mb-4">
                  Key Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-brand-gold rounded-full mr-3"></span>
                      Prime location in {property.location}
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-brand-gold rounded-full mr-3"></span>
                      Modern architecture and design
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-brand-gold rounded-full mr-3"></span>
                      Excellent connectivity
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-brand-gold rounded-full mr-3"></span>
                      High-quality construction
                    </li>
                  </ul>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-brand-gold rounded-full mr-3"></span>
                      24/7 security
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-brand-gold rounded-full mr-3"></span>
                      Power backup
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-brand-gold rounded-full mr-3"></span>
                      Ample parking space
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-brand-gold rounded-full mr-3"></span>
                      Investment potential
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Contact Form */}
              <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                <h3 className="text-xl font-bold text-brand-dark-blue mb-4">
                  Get More Information
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-gold"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-gold"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-gold"
                  />
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows="3"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-gold"
                  ></textarea>
                  <button type="submit" className="w-full btn btn-primary">
                    Send Inquiry
                  </button>
                </form>
              </div>

              {/* Quick Contact */}
              <div className="bg-brand-light-gray p-6 rounded-lg">
                <h3 className="text-lg font-bold text-brand-dark-blue mb-4">
                  Quick Contact
                </h3>
                <div className="space-y-3">
                  <a
                    href="tel:+919811677423"
                    className="flex items-center w-full btn btn-call"
                  >
                    <Phone size={18} />
                    Call Now
                  </a>
                  <a
                    href="https://wa.me/919811677423"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center w-full btn btn-whatsapp"
                  >
                    <MessageCircle size={18} />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* Location Advantages */}
          <div>
            <h2 className="text-2xl font-bold text-brand-dark-blue mb-4 w-[100%]">
              Location Advantages
            </h2>
            <div className="bg-brand-light-gray p-6 rounded-lg">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-brand-dark-blue mb-3">
                    Location
                  </h3>
                  <p className="text-gray-700">{property.location}</p>
                  <p className="text-sm text-gray-600 mt-2">
                    Strategic location with excellent connectivity and proximity
                    to major business districts and amenities.
                  </p>
                </div>
                {property.locationImage && (
                  <div>
                    <h3 className="text-lg font-semibold text-brand-dark-blue mb-3">
                      Location Map
                    </h3>
                    <Image
                      src={property.locationImage}
                      alt={`${property.title} Location Map`}
                      width={400}
                      height={250}
                      className="rounded-lg object-cover w-full h-[250px]"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Property Gallery */}
          {property.gallery && property.gallery.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-brand-dark-blue mb-6">
                Property Gallery
              </h2>

              {/* Main Gallery Image */}
              <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden mb-4 group">
                <Image
                  src={property.gallery[currentImageIndex]}
                  alt={`${property.title} Gallery Image ${currentImageIndex + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {property.gallery.length}
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {property.gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`relative w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-200 ${
                      index === currentImageIndex
                        ? "ring-2 ring-brand-gold opacity-100"
                        : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${property.title} Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;

  // Fetch property from database by slug
  const property = await fetchPropertyBySlug(slug);

  if (!property) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      property,
    },
  };
}
