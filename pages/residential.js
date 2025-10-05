import Head from 'next/head';
import Layout from '../components/Layout';
import PropertyCard from '../components/PropertyCard';
import { fetchProperties } from '../lib/api';
import { Home, Users, Shield, Wifi } from 'lucide-react';

export default function Residential({ properties }) {
  return (
    <Layout>
      <Head>
        <title>Residential Properties in Gurgaon - Helios Land</title>
        <meta name="description" content="Luxury residential properties and apartments in Gurgaon. Premium living spaces in prime locations." />
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-dark-blue to-blue-900 text-white py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Residential <span className="text-brand-gold">Properties</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Luxury homes and apartments in Gurgaon&apos;s most desirable neighborhoods
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center">
                <Home size={16} className="mr-2 text-brand-gold" />
                <span>Premium Living</span>
              </div>
              <div className="flex items-center">
                <Shield size={16} className="mr-2 text-brand-gold" />
                <span>Secure Communities</span>
              </div>
              <div className="flex items-center">
                <Wifi size={16} className="mr-2 text-brand-gold" />
                <span>Modern Amenities</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.length > 0 ? properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            )) : (
              <div className="col-span-full text-center py-12">
                <Home className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Residential Properties Found</h3>
                <p className="text-gray-500">Residential properties will appear here soon.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Residential Features */}
      <section className="py-16 bg-brand-light-gray">
        <div className="container">
          <h2 className="section-title">Premium Residential Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-brand-gold w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-brand-dark-blue mb-2">Modern Design</h3>
              <p className="text-gray-600">Contemporary architecture with premium finishes</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-brand-gold w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-brand-dark-blue mb-2">24/7 Security</h3>
              <p className="text-gray-600">Gated communities with round-the-clock security</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-brand-gold w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-brand-dark-blue mb-2">Community Living</h3>
              <p className="text-gray-600">Clubhouse, gym, swimming pool, and recreational facilities</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-brand-gold w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wifi size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-brand-dark-blue mb-2">Smart Homes</h3>
              <p className="text-gray-600">High-speed internet and smart home automation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Developers */}
      <section className="py-16">
        <div className="container">
          <h2 className="section-title">Trusted Developers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <h3 className="text-sm font-semibold text-brand-dark-blue">DLF</h3>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <h3 className="text-sm font-semibold text-brand-dark-blue">Emaar</h3>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <h3 className="text-sm font-semibold text-brand-dark-blue">M3M</h3>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <h3 className="text-sm font-semibold text-brand-dark-blue">Vatika</h3>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <h3 className="text-sm font-semibold text-brand-dark-blue">Krisumi</h3>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <h3 className="text-sm font-semibold text-brand-dark-blue">Birla</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Benefits */}
      <section className="py-16 bg-brand-light-gray">
        <div className="container">
          <h2 className="section-title">Why Invest in Gurgaon Residential?</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-brand-dark-blue mb-4">Strategic Location</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Close proximity to Delhi and NCR</li>
                  <li>• Excellent metro and road connectivity</li>
                  <li>• Near international airport</li>
                  <li>• Major IT and business hubs nearby</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-brand-dark-blue mb-4">Investment Potential</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Consistent property appreciation</li>
                  <li>• High rental demand</li>
                  <li>• World-class infrastructure development</li>
                  <li>• Growing corporate presence</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps() {
  const properties = await fetchProperties('residential');
  return {
    props: {
      properties,
    },
  };
}
