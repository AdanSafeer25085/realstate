import Head from 'next/head';
import Layout from '../components/Layout';
import { Phone, MessageCircle, Award, Users, TrendingUp } from 'lucide-react';

export default function About() {
  return (
    <Layout>
      <Head>
        <title>About Helios Land - Premier Real Estate Advisors in Gurgaon</title>
        <meta name="description" content="Learn about Helios Land, Gurgaon's premier real estate advisors specializing in SCO plots and residential properties." />
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-dark-blue to-blue-900 text-white py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="text-brand-gold">Helios Land</span>
            </h1>
            <p className="text-xl text-gray-200">
              Your trusted partner in Gurgaon real estate investment
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-lg text-gray-700 leading-relaxed space-y-6">
              <p>
                Every great vision deserves the perfect foundation. At <span className="text-brand-gold font-semibold">Helios Land</span>, our purpose is to
                secure it for you. As Gurgaon&apos;s premier real estate advisors, we specialize in connecting
                discerning investors, businesses, and families with high-potential SCO (Shop-Cum-Office)
                and Residential Plots in the city&apos;s most strategic locations.
              </p>

              <p>
                Our expertise is born from foresight—recognizing the incredible power of the
                government-approved SCO model and Gurgaon&apos;s global ascent. This allows us to guide
                you not just to a property, but to a prosperous future.
              </p>

              <p>
                With a deep passion for client success, the team at <span className="text-brand-gold font-semibold">Helios Land</span> is your trusted
                partner in turning ambition into reality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-brand-light-gray">
        <div className="container">
          <h2 className="section-title">Why Choose Helios Land?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white p-6 rounded-lg shadow-md">
              <div className="bg-brand-gold w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-brand-dark-blue mb-2">Market Expertise</h3>
              <p className="text-gray-600">Deep understanding of Gurgaon&apos;s real estate market with proven track record of successful investments.</p>
            </div>
            <div className="text-center bg-white p-6 rounded-lg shadow-md">
              <div className="bg-brand-gold w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-brand-dark-blue mb-2">Client-Centric Approach</h3>
              <p className="text-gray-600">Personalized service tailored to your specific investment goals and requirements.</p>
            </div>
            <div className="text-center bg-white p-6 rounded-lg shadow-md">
              <div className="bg-brand-gold w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-brand-dark-blue mb-2">Proven Results</h3>
              <p className="text-gray-600">Successful track record of helping clients achieve their real estate investment objectives.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-title">Get In Touch</h2>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-brand-dark-blue mb-4">Contact Details</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Phone size={20} className="text-brand-gold mr-3" />
                      <a href="tel:+919811677423" className="text-brand-dark-blue hover:text-brand-gold">
                        +91 98116 77423
                      </a>
                    </div>
                    <div className="flex items-center">
                      <Phone size={20} className="text-brand-gold mr-3" />
                      <a href="tel:+919811677423" className="text-brand-dark-blue hover:text-brand-gold">
                        +91 85276 30122
                      </a>
                    </div>
                    <div className="flex items-center">
                      <MessageCircle size={20} className="text-brand-gold mr-3" />
                      <a href="mailto:deepak@heliosland.in" className="text-brand-dark-blue hover:text-brand-gold">
                        deepak@heliosland.in
                      </a>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-brand-dark-blue mb-4">Office Address</h3>
                  <p className="text-gray-700">
                    HELIOS LAND SCO-70, 3RD FLOOR<br />
                    M3M MARKET-84 SECTOR-84<br />
                    GURGAON, GURUGRAM-122004
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-brand-dark-blue text-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Investment Journey?</h2>
            <p className="text-xl mb-8 text-gray-200">
              Connect with our experts today for personalized real estate consultation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+919811677423" className="btn btn-primary btn-large">
                <Phone size={20} />
                Call Now
              </a>
              <a
                href="https://wa.me/919811677423"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-large"
              >
                <MessageCircle size={20} />
                WhatsApp Consultation
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}