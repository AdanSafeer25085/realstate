import Head from 'next/head';
import Layout from '../components/Layout';
import PropertySlider from '../components/PropertySlider';
import TypingAnimation from '../components/animations/TypingAnimation';
import FadeIn from '../components/animations/FadeIn';
import StaggeredAnimation from '../components/animations/StaggeredAnimation';
import HoverAnimation from '../components/animations/HoverAnimation';
import { commercialProperties, residentialProperties, featuredProjects } from '../data/properties';
import { Phone, MessageCircle } from 'lucide-react';

export default function Home() {
  // Use the updated property data from data/properties.js
  const newProjects = featuredProjects; // SCO plots as new/upcoming projects
  const commercial = commercialProperties; // All 6 commercial properties
  const residential = residentialProperties; // All 5 residential properties

  return (
    <Layout>
      <Head>
        <title>Helios Land - Premium Real Estate in Gurgaon | SCO Plots, Commercial & Residential</title>
        <meta
          name="description"
          content="Discover premium real estate opportunities in Gurgaon with Helios Land. Specializing in SCO plots, commercial spaces, and luxury residential properties."
        />
      </Head>

      {/* Hero Banner */}
      <section
        className="relative min-h-screen flex items-center justify-center text-white overflow-hidden"
        style={{
          backgroundImage: "url('/images/header.jpeg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Enhanced Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-4 h-4 bg-brand-gold rounded-full opacity-20 animate-float"></div>
          <div className="absolute top-40 right-20 w-6 h-6 bg-white rounded-full opacity-30 animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-40 left-20 w-3 h-3 bg-brand-gold rounded-full opacity-25 animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-60 right-40 w-5 h-5 bg-white rounded-full opacity-20 animate-float" style={{animationDelay: '0.5s'}}></div>
          
          {/* Additional floating elements for more visual appeal */}
          <div className="absolute top-32 left-1/4 w-2 h-2 bg-brand-gold rounded-full opacity-15 animate-pulse-slow" style={{animationDelay: '3s'}}></div>
          <div className="absolute bottom-32 right-1/3 w-3 h-3 bg-white rounded-full opacity-25 animate-bounce-slow" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute top-1/2 left-8 w-1 h-1 bg-brand-gold rounded-full opacity-30 animate-pulse" style={{animationDelay: '2.5s'}}></div>
          <div className="absolute bottom-1/3 right-8 w-4 h-4 bg-white rounded-full opacity-20 animate-float" style={{animationDelay: '4s'}}></div>
        </div>
        
        {/* Content */}
        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <FadeIn delay={0} duration={1} direction="up" distance={50}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-tight">
                Premium Real Estate in <span className="text-brand-gold animate-pulse-glow">Gurgaon</span>
              </h1>
            </FadeIn>
            
            <FadeIn delay={500} duration={1} direction="up" distance={30}>
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-8 sm:mb-12 text-white font-light min-h-[2rem] sm:min-h-[3rem]">
                <TypingAnimation 
                  text="Discover exceptional SCO plots, commercial spaces, and luxury residential properties"
                  speed={50}
                  delay={1000}
                  className="text-white"
                />
              </div>
            </FadeIn>
            
            <StaggeredAnimation staggerDelay={0.2} animationType="fadeInUp">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                <HoverAnimation animationType="lift" intensity="high">
                  <a 
                    href="tel:+919811677423" 
                    className="btn btn-primary btn-large transform transition-all duration-300 hover:shadow-2xl"
                  >
                    <Phone size={20} className="sm:w-6 sm:h-6 animate-bounce-gentle" />
                    <span className="text-sm sm:text-base">Call +91 98116 77423</span>
                  </a>
                </HoverAnimation>
                <HoverAnimation animationType="glow" intensity="high">
                  <a
                    href="https://wa.me/919811677423"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-large bg-white text-brand-dark-blue hover:bg-brand-gold hover:text-white border-2 border-white transform transition-all duration-300 hover:shadow-2xl"
                  >
                    <MessageCircle size={20} className="sm:w-6 sm:h-6 animate-bounce-gentle" />
                    <span className="text-sm sm:text-base">WhatsApp Now</span>
                  </a>
                </HoverAnimation>
              </div>
            </StaggeredAnimation>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Property Sliders */}
      <FadeIn delay={0} duration={1} direction="up" distance={50}>
        <PropertySlider title="Featured SCO Projects" properties={newProjects} />
      </FadeIn>
      
      <FadeIn delay={200} duration={1} direction="up" distance={50}>
        <PropertySlider title="Commercial Properties" properties={commercial} />
      </FadeIn>
      
      <FadeIn delay={400} duration={1} direction="up" distance={50}>
        <PropertySlider title="Residential Properties" properties={residential} />
      </FadeIn>

      {/* SCO Information Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <FadeIn delay={0} duration={1} direction="up" distance={30}>
              <h2 className="section-title animate-text-reveal">SCO (SHOP CUM OFFICE) PLOTS</h2>
            </FadeIn>
            
            <StaggeredAnimation staggerDelay={0.1} animationType="fadeInUp">
              <div className="text-lg text-gray-700 leading-relaxed space-y-4">
                <FadeIn delay={200} duration={0.8} direction="left" distance={30}>
                  <p>
                    Helios Land presents a prime investment in one of India&apos;s most robust real estate markets:
                    Shop-Cum-Office (SCO) Plots in Gurugram.
                  </p>
                </FadeIn>
                <FadeIn delay={400} duration={0.8} direction="right" distance={30}>
                  <p>
                    Driven by accelerated urbanization and its status as a hub for over 500 Fortune companies,
                    Gurugram offers a fertile ground for commercial asset appreciation. This unique SCO concept,
                    approved under the Haryana Government&apos;s New Commercial Plotted Colony Policy, allows for
                    the development of independent, multi-story commercial properties (B+G+4).
                  </p>
                </FadeIn>
              </div>
            </StaggeredAnimation>

            <FadeIn delay={600} duration={1} direction="scale" distance={0}>
              <div className="bg-brand-light-gray p-6 rounded-lg mt-8 hover-glow">
                <h3 className="text-xl font-semibold text-brand-dark-blue mb-4 animate-fade-in">
                  Key Investment Highlights:
                </h3>
                <StaggeredAnimation staggerDelay={0.1} animationType="slideInLeft">
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start animate-slide-in-left">
                      <span className="text-brand-gold mr-2 animate-sparkle">•</span>
                      <span><strong>Asset Class:</strong> Plotted commercial development with 100% land ownership.</span>
                    </li>
                    <li className="flex items-start animate-slide-in-left" style={{animationDelay: '0.1s'}}>
                      <span className="text-brand-gold mr-2 animate-sparkle">•</span>
                      <span><strong>High Demand:</strong> Caters to the modern, integrated lifestyle of working, shopping, and dining.</span>
                    </li>
                    <li className="flex items-start animate-slide-in-left" style={{animationDelay: '0.2s'}}>
                      <span className="text-brand-gold mr-2 animate-sparkle">•</span>
                      <span><strong>Location Advantage:</strong> Positioned in Gurugram&apos;s designated growth corridors.</span>
                    </li>
                    <li className="flex items-start animate-slide-in-left" style={{animationDelay: '0.3s'}}>
                      <span className="text-brand-gold mr-2 animate-sparkle">•</span>
                      <span><strong>Versatile Revenue Streams:</strong> Ideal for high-street retail, corporate offices, and F&B outlets.</span>
                    </li>
                  </ul>
                </StaggeredAnimation>
              </div>
            </FadeIn>

            <FadeIn delay={800} duration={1} direction="up" distance={30}>
              <p className="mt-6">
                As specialists in SCO and residential properties, <span className="text-brand-gold font-semibold animate-pulse-glow">Helios Land</span> provides access to the most
                lucrative plots with exclusive offers. Connect with us to explore this unparalleled investment opportunity.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>
    </Layout>
  );
}
