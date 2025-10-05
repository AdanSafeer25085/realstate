import Head from 'next/head';
import Layout from '../components/Layout';
import { Phone, MessageCircle, Mail, MapPin, Clock, Send } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    propertyType: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple form submission without database
    alert('Thank you for your inquiry! We have received your details and will contact you soon.');

    // Reset form
    setFormData({
      name: '',
      phone: '',
      email: '',
      city: '',
      propertyType: '',
      message: ''
    });
  };

  return (
    <Layout>
      <Head>
        <title>Contact Helios Land - Real Estate Experts in Gurgaon</title>
        <meta name="description" content="Contact Helios Land for expert real estate consultation in Gurgaon. Get in touch for SCO plots, commercial and residential properties." />
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-dark-blue to-blue-900 text-white py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Contact <span className="text-brand-gold">Helios Land</span>
            </h1>
            <p className="text-xl text-gray-200">
              Get expert real estate consultation and personalized property solutions
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-brand-dark-blue mb-8">Get In Touch</h2>

              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="bg-brand-gold w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <Phone size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-dark-blue">Phone</h3>
                    <a href="tel:+919811677423" className="text-gray-600 hover:text-brand-gold">
                      +91 98116 77423
                    </a>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-brand-gold w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <Mail size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-dark-blue">Email</h3>
                    <a href="mailto:deepak@heliosland.in" className="text-gray-600 hover:text-brand-gold">
                      deepak@heliosland.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-brand-gold w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <MapPin size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-dark-blue">Office Address</h3>
                    <p className="text-gray-600">
                      HELIOS LAND SCO-70, 3RD FLOOR<br />
                      M3M MARKET-84 SECTOR-84<br />
                      GURGAON, GURUGRAM-122004
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-brand-gold w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <Clock size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-dark-blue">Business Hours</h3>
                    <p className="text-gray-600">
                      Monday - Saturday: 9:00 AM - 7:00 PM<br />
                      Sunday: 10:00 AM - 5:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Contact Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a href="tel:+919811677423" className="btn btn-call btn-large">
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
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-brand-dark-blue mb-6">Send Us A Message</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold"
                      placeholder="Your phone number"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold"
                      placeholder="Your email address"
                    />
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City of Residence
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold"
                      placeholder="Your city"
                    />
                  </div>

                  <div>
                    <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">
                      Property Interest
                    </label>
                    <select
                      id="propertyType"
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold"
                    >
                      <option value="">Select property type</option>
                      <option value="sco">SCO Plots</option>
                      <option value="commercial">Commercial Properties</option>
                      <option value="residential">Residential Properties</option>
                      <option value="investment">Investment Consultation</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold"
                      placeholder="Tell us about your requirements..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full btn btn-primary btn-large"
                  >
                    <Send size={20} />
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-brand-light-gray">
        <div className="container">
          <h2 className="section-title">Visit Our Office</h2>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.1234567890123!2d77.0123456789!3d28.1234567890!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sM3M%20Market%2084%2C%20Sector%2084%2C%20Gurgaon!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-md"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}