import Head from 'next/head';
import Layout from '../components/Layout';
import PropertyCard from '../components/PropertyCard';
import { commercialProperties } from '../data/properties';
import { Building, TrendingUp, MapPin } from 'lucide-react';

export default function Commercial() {
  return (
    <Layout>
      <Head>
        <title>Commercial Properties in Gurgaon - Helios Land</title>
        <meta name="description" content="Explore premium commercial properties and office spaces in Gurgaon's prime locations. High-yield investment opportunities." />
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-dark-blue to-blue-900 text-white py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Commercial <span className="text-brand-gold">Properties</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Premium office spaces and commercial properties in Gurgaon&apos;s business districts
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center">
                <Building size={16} className="mr-2 text-brand-gold" />
                <span>Premium Locations</span>
              </div>
              <div className="flex items-center">
                <TrendingUp size={16} className="mr-2 text-brand-gold" />
                <span>High ROI</span>
              </div>
              <div className="flex items-center">
                <MapPin size={16} className="mr-2 text-brand-gold" />
                <span>Prime Business Districts</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {commercialProperties.length > 0 ? commercialProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            )) : (
              <div className="col-span-full text-center py-12">
                <Building className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Commercial Properties Found</h3>
                <p className="text-gray-500">Commercial properties will appear here soon.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Commercial Investment Benefits */}
      <section className="py-16 bg-brand-light-gray">
        <div className="container">
          <h2 className="section-title">Why Invest in Commercial Properties?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-brand-gold w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <TrendingUp size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-brand-dark-blue mb-2">Higher Returns</h3>
              <p className="text-gray-600">Commercial properties typically offer higher rental yields compared to residential properties.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-brand-gold w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Building size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-brand-dark-blue mb-2">Stable Income</h3>
              <p className="text-gray-600">Long-term lease agreements provide stable and predictable rental income.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-brand-gold w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <MapPin size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-brand-dark-blue mb-2">Prime Locations</h3>
              <p className="text-gray-600">Properties located in Gurgaon&apos;s established business districts with excellent connectivity.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Locations */}
      <section className="py-16">
        <div className="container">
          <h2 className="section-title">Prime Commercial Locations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-lg font-semibold text-brand-dark-blue mb-2">Cyber City</h3>
              <p className="text-gray-600">IT hub with multinational corporations</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-lg font-semibold text-brand-dark-blue mb-2">Golf Course Road</h3>
              <p className="text-gray-600">Premium business district</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-lg font-semibold text-brand-dark-blue mb-2">Sector 47</h3>
              <p className="text-gray-600">Established commercial zone</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-lg font-semibold text-brand-dark-blue mb-2">MG Road</h3>
              <p className="text-gray-600">Central business area</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
