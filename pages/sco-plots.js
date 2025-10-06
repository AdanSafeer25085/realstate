import Head from 'next/head';
import Layout from '../components/Layout';
import PropertyCard from '../components/PropertyCard';
import { fetchProperties } from '../lib/api';
import { Building2, TrendingUp, MapPin, Clock } from 'lucide-react';

export default function SCOPlots({ scoProperties }) {
  return (
    <Layout>
      <Head>
        <title>SCO Plots in Gurgaon - Shop Cum Office Plots | Helios Land</title>
        <meta name="description" content="Premium SCO plots in Gurgaon. Shop Cum Office plots with high ROI potential in prime commercial locations." />
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-dark-blue to-blue-900 text-white py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              SCO <span className="text-brand-gold">Plots</span>
            </h1>
            <p className="text-xl text-gray-200 mb-4">
              Shop Cum Office Plots - The Future of Commercial Investment
            </p>
            <p className="text-lg text-gray-300 mb-8">
              Government-approved SCO model allowing B+G+4 development
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center">
                <Building2 size={16} className="mr-2 text-brand-gold" />
                <span>100% Land Ownership</span>
              </div>
              <div className="flex items-center">
                <TrendingUp size={16} className="mr-2 text-brand-gold" />
                <span>High ROI Potential</span>
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-2 text-brand-gold" />
                <span>Future-Ready Investment</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCO Properties Grid */}
      <section className="py-16">
        <div className="container">
          <h2 className="section-title">New & Upcoming Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scoProperties.length > 0 ? scoProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            )) : (
              <div className="col-span-full text-center py-12">
                <Building2 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No SCO Properties Found</h3>
                <p className="text-gray-500">SCO properties will appear here soon.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SCO Concept Explanation */}
      <section className="py-16 bg-brand-light-gray">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-title">Understanding SCO Plots</h2>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-brand-dark-blue mb-4">What are SCO Plots?</h3>
                  <p className="text-gray-700 mb-4">
                    Shop Cum Office (SCO) plots are a unique concept approved under the Haryana Government&apos;s
                    New Commercial Plotted Colony Policy. These plots allow for the development of independent,
                    multi-story commercial properties.
                  </p>
                  <h4 className="font-semibold text-brand-dark-blue mb-2">Development Rights:</h4>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Basement + Ground + 4 Floors + Terrace</li>
                    <li>• 100% plot coverage allowed</li>
                    <li>• Zero setback requirements</li>
                    <li>• Mixed-use development permitted</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-brand-dark-blue mb-4">Investment Benefits</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-brand-gold w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-1">
                        <span className="text-white text-xs font-bold">1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-brand-dark-blue">Complete Ownership</h4>
                        <p className="text-gray-600 text-sm">100% land ownership with freehold rights</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-brand-gold w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-1">
                        <span className="text-white text-xs font-bold">2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-brand-dark-blue">Multiple Revenue Streams</h4>
                        <p className="text-gray-600 text-sm">Retail, office, dining, and entertainment options</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-brand-gold w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-1">
                        <span className="text-white text-xs font-bold">3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-brand-dark-blue">High Appreciation</h4>
                        <p className="text-gray-600 text-sm">Located in rapidly developing commercial corridors</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top SCO Locations */}
      <section className="py-16">
        <div className="container">
          <h2 className="section-title">Prime SCO Locations in Gurgaon</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <MapPin size={20} className="text-brand-gold mr-2" />
                <h3 className="text-lg font-semibold text-brand-dark-blue">Sector 84</h3>
              </div>
              <p className="text-gray-600 mb-2">Dwarka Expressway connectivity</p>
              <p className="text-sm text-gray-500">Starting from ₹2.25 Cr</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <MapPin size={20} className="text-brand-gold mr-2" />
                <h3 className="text-lg font-semibold text-brand-dark-blue">Sector 89</h3>
              </div>
              <p className="text-gray-600 mb-2">Golf Course Extension Road</p>
              <p className="text-sm text-gray-500">Starting from ₹3.50 Cr</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <MapPin size={20} className="text-brand-gold mr-2" />
                <h3 className="text-lg font-semibold text-brand-dark-blue">Sector 73</h3>
              </div>
              <p className="text-gray-600 mb-2">SPR connectivity</p>
              <p className="text-sm text-gray-500">Starting from ₹4.25 Cr</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <MapPin size={20} className="text-brand-gold mr-2" />
                <h3 className="text-lg font-semibold text-brand-dark-blue">Sector 88A</h3>
              </div>
              <p className="text-gray-600 mb-2">NH-8 connectivity</p>
              <p className="text-sm text-gray-500">Starting from ₹5.00 Cr</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <MapPin size={20} className="text-brand-gold mr-2" />
                <h3 className="text-lg font-semibold text-brand-dark-blue">Sector 114</h3>
              </div>
              <p className="text-gray-600 mb-2">Dwarka Expressway frontage</p>
              <p className="text-sm text-gray-500">Starting from ₹6.75 Cr</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <MapPin size={20} className="text-brand-gold mr-2" />
                <h3 className="text-lg font-semibold text-brand-dark-blue">Sector 83</h3>
              </div>
              <p className="text-gray-600 mb-2">Golf Course Road proximity</p>
              <p className="text-sm text-gray-500">Starting from ₹7.50 Cr</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Gurgaon for SCO */}
      <section className="py-16 bg-brand-light-gray">
        <div className="container">
          <h2 className="section-title">Why Gurgaon for SCO Investment?</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-brand-dark-blue mb-4">Economic Hub</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Hub for 500+ Fortune companies</li>
                  <li>• Largest financial and technology center in NCR</li>
                  <li>• Major employment generator</li>
                  <li>• Growing startup ecosystem</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-brand-dark-blue mb-4">Infrastructure</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Metro connectivity to entire NCR</li>
                  <li>• Multiple expressways and highways</li>
                  <li>• Close to IGI Airport</li>
                  <li>• World-class commercial infrastructure</li>
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
  const scoProperties = await fetchProperties('sco');
  return {
    props: {
      scoProperties,
    },
  };
}
