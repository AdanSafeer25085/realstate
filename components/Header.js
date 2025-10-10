import Link from 'next/link';
import Image from 'next/image';
import { Phone, MessageCircle, Menu, X, ChevronDown, ChevronUp, Home, Building, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import FadeIn from './animations/FadeIn';
import HoverAnimation from './animations/HoverAnimation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [properties, setProperties] = useState([]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      setOpenDropdown(null); // Close dropdowns when opening menu
    }
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  // Fetch properties for dropdown links
  useEffect(() => {
    const fetchPropertiesForDropdown = async () => {
      try {
        const res = await fetch('/api/properties');
        const data = await res.json();
        setProperties(data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchPropertiesForDropdown();
  }, []);


  // Get ALL properties by type for dropdowns
  const getPropertiesByType = (type) => {
    return properties.filter(p => p.type === type);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 🟢 Smooth scroll + navigation for Home logo
  const handleLogoClick = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      window.location.href = '/';
    }, 400); // small delay for smooth scroll
  };

  return (
    <>
      {/* 🔹 Transparent Slide-In Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 sm:w-72 z-50 transform transition-all duration-500 ease-in-out
        ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        bg-white/90 shadow-lg backdrop-blur-sm border-l border-gray-200 flex flex-col justify-between`}
      >
        <div className="p-4 sm:p-6 relative">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-brand-dark-blue hover:text-[#b8860b] transition-colors"
            aria-label="Close menu"
          >
            <X size={24} className="sm:w-7 sm:h-7" />
          </button>

          {/* Navigation Links */}
          <div className="mt-12 sm:mt-16">
            <nav className="flex flex-col space-y-3">
              <Link
                href="/"
                className="text-base sm:text-lg font-extrabold text-brand-dark-blue hover:text-[#b8860b] transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>

              {/* Residential Dropdown */}
              <div>
                <button
                  onClick={() => toggleDropdown('residential')}
                  className="w-full flex items-center justify-between text-base sm:text-lg font-extrabold text-brand-dark-blue hover:text-[#b8860b] transition-colors py-2"
                >
                  <div className="flex items-center">
                    <Home size={18} className="mr-2" />
                    Residential
                  </div>
                  {openDropdown === 'residential' ?
                    <ChevronUp size={16} /> :
                    <ChevronDown size={16} />
                  }
                </button>
                {openDropdown === 'residential' && (
                  <div className="ml-6 mt-2 animate-fadeIn">
                    {getPropertiesByType('residential').length > 0 ? (
                      <div className="max-h-[180px] overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        {getPropertiesByType('residential').map((property) => (
                          <Link
                            key={property.id}
                            href={`/property/${property.slug}`}
                            className="block text-sm text-gray-700 hover:text-[#b8860b] transition-colors py-2 pl-2 border-l-2 border-transparent hover:border-[#b8860b]"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {property.title}
                            {property.display_in_slider && (
                              <span className="ml-2 text-xs text-green-600">★</span>
                            )}
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <span className="block text-sm text-gray-500 py-1">No properties available</span>
                    )}
                  </div>
                )}
              </div>

              {/* Commercial Dropdown */}
              <div>
                <button
                  onClick={() => toggleDropdown('commercial')}
                  className="w-full flex items-center justify-between text-base sm:text-lg font-extrabold text-brand-dark-blue hover:text-[#b8860b] transition-colors py-2"
                >
                  <div className="flex items-center">
                    <Building size={18} className="mr-2" />
                    Commercial
                  </div>
                  {openDropdown === 'commercial' ?
                    <ChevronUp size={16} /> :
                    <ChevronDown size={16} />
                  }
                </button>
                {openDropdown === 'commercial' && (
                  <div className="ml-6 mt-2 animate-fadeIn">
                    {getPropertiesByType('commercial').length > 0 ? (
                      <div className="max-h-[180px] overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        {getPropertiesByType('commercial').map((property) => (
                          <Link
                            key={property.id}
                            href={`/property/${property.slug}`}
                            className="block text-sm text-gray-700 hover:text-[#b8860b] transition-colors py-2 pl-2 border-l-2 border-transparent hover:border-[#b8860b]"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {property.title}
                            {property.display_in_slider && (
                              <span className="ml-2 text-xs text-green-600">★</span>
                            )}
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <span className="block text-sm text-gray-500 py-1">No properties available</span>
                    )}
                  </div>
                )}
              </div>

              {/* Upcoming Dropdown */}
              <div>
                <button
                  onClick={() => toggleDropdown('upcoming')}
                  className="w-full flex items-center justify-between text-base sm:text-lg font-extrabold text-brand-dark-blue hover:text-[#b8860b] transition-colors py-2"
                >
                  <div className="flex items-center">
                    <Clock size={18} className="mr-2" />
                    New & Upcoming Projects
                  </div>
                  {openDropdown === 'upcoming' ?
                    <ChevronUp size={16} /> :
                    <ChevronDown size={16} />
                  }
                </button>
                {openDropdown === 'upcoming' && (
                  <div className="ml-6 mt-2 animate-fadeIn">
                    {getPropertiesByType('New & upcoming projects').length > 0 ? (
                      <div className="max-h-[180px] overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        {getPropertiesByType('New & upcoming projects').map((property) => (
                          <Link
                            key={property.id}
                            href={`/property/${property.slug}`}
                            className="block text-sm text-gray-700 hover:text-[#b8860b] transition-colors py-2 pl-2 border-l-2 border-transparent hover:border-[#b8860b]"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {property.title}
                            {property.display_in_slider && (
                              <span className="ml-2 text-xs text-green-600">★</span>
                            )}
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <span className="block text-sm text-gray-500 py-1">No properties available</span>
                    )}
                  </div>
                )}
              </div>

              <Link
                href="/about"
                className="text-base sm:text-lg font-extrabold text-brand-dark-blue hover:text-[#b8860b] transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
            </nav>
          </div>
        </div>

        {/* 📞 Bottom Contact Section */}
        <div className="pb-20 sm:pb-[150px] flex flex-col items-center space-y-2">
          <a
            href="tel:+919811677423"
            className="flex items-center space-x-2 text-brand-dark-blue hover:text-[#b8860b] transition-colors font-semibold text-sm sm:text-base"
          >
            <Phone size={18} className="sm:w-5 sm:h-5" />
            <span>+91 98116 77423</span>
          </a>
        </div>
      </div>

      {/* Header */}
      <header className={`bg-white/70 shadow-md relative transition-all duration-300 ${isScrolled ? 'bg-white/95 shadow-lg' : ''}`}>
        <div className="container">
          <div className="flex items-center justify-between py-3 sm:py-4">
           <div className="flex items-center">
  {/* 🟢 Smooth logo click */}
  <Link
    href="/"
    onClick={handleLogoClick}
    className="flex items-center space-x-2 sm:space-x-3 cursor-pointer group relative"
  >
    <div className="relative">
      <Image
        src="/images/logo.png"
        alt="Helios Land Logo"
        width={80}
        height={80}
        className="transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:z-20 sm:w-[100px] sm:h-[100px]"
      />
    </div>
      </Link>
 
  
</div>


            <nav className="hidden md:flex items-center space-x-8">
              <HoverAnimation animationType="scale" intensity="low">
                <Link
                  href="/"
                  className="text-brand-dark-blue font-extrabold text-xl hover:text-[#b8860b] transition-colors animate-fade-in"
                >
                  Home
                </Link>
              </HoverAnimation>
              <HoverAnimation animationType="scale" intensity="low">
                <Link
                  href="/about"
                  className="text-brand-dark-blue font-extrabold text-xl hover:text-[#b8860b] transition-colors animate-fade-in"
                  style={{animationDelay: '0.1s'}}
                >
                  Contact Us
                </Link>
              </HoverAnimation>
            </nav>

            <div className="flex items-center space-x-1 sm:space-x-4">
              {/* Mobile buttons - icons only */}
              <HoverAnimation animationType="bounce" intensity="medium">
                <a href="tel:+919811677423" className="btn btn-call btn-small flex sm:hidden animate-bounce-in">
                  <Phone size={16} />
                </a>
              </HoverAnimation>
              <HoverAnimation animationType="bounce" intensity="medium">
                <a
                  href="https://wa.me/919811677423"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-small flex sm:hidden animate-bounce-in"
                  style={{animationDelay: '0.1s'}}
                >
                  <MessageCircle size={16} />
                </a>
              </HoverAnimation>
              
              {/* Desktop buttons - with text */}
              <HoverAnimation animationType="lift" intensity="medium">
                <a href="tel:+919811677423" className="btn btn-call btn-small hidden sm:flex animate-scale-in">
                  <Phone size={16} />
                  <span className="hidden lg:inline">Call Now</span>
                </a>
              </HoverAnimation>
              <HoverAnimation animationType="lift" intensity="medium">
                <a
                  href="https://wa.me/919811677423"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-small hidden sm:flex animate-scale-in"
                  style={{animationDelay: '0.1s'}}
                >
                  <MessageCircle size={16} />
                  <span className="hidden lg:inline">WhatsApp</span>
                </a>
              </HoverAnimation>
              
              <HoverAnimation animationType="rotate" intensity="medium">
                <button
                  onClick={toggleMenu}
                  className="text-brand-dark-blue hover:text-[#b8860b] transition-colors animate-bounce-in"
                  aria-label="Toggle menu"
                >
                  <Menu size={20} className="sm:w-6 sm:h-6" />
                </button>
              </HoverAnimation>
            </div>
          </div>
        </div>
      </header>

      {/* Custom animation */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 1.5s ease-in-out forwards;
        }
        
        /* Custom scrollbar styling for property dropdowns */
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </>
  );
}
