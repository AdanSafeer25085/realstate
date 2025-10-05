import { Instagram, Phone, Facebook, Twitter, Linkedin, Youtube, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
 const handleLogoClick = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      window.location.href = '/';
    }, 400); // small delay for smooth scroll
  };
export default function Footer() {
  return (
    <>
      {/* Contact Section */}
      <div className="bg-gray-50 py-8 sm:py-12">
        <div className="container text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Don&apos;t be shy - drop us a line.</h2>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">We&apos;re looking forward to speaking to you!</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <a
              href="https://wa.me/919811677423"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-large"
            >
              <MessageCircle size={18} className="sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">WhatsApp</span>
            </a>
            <a
              href="tel:+919811677423"
              className="btn btn-call btn-large"
            >
              <Phone size={18} className="sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">Call Now</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <footer className="bg-[#dbdbdd] py-8 sm:py-12">
        <div className="container">
          {/* Mobile Layout */}
          <div className="block md:hidden">
            {/* Logo Section */}
            <div className="text-center mb-8">
              <Link
                href="/"
                onClick={handleLogoClick}
                className="flex flex-col items-center space-y-2 cursor-pointer group relative"
              >
                <Image
                  src="/images/logo.png"
                  alt="Helios Land Logo"
                  width={80}
                  height={80}
                  className="rounded-full transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
                <Image
                  src="/images/logo2.jpg"
                  alt="Helios Land"
                  width={120}
                  height={50}
                  className=""
                />
              </Link>
            </div>

            {/* Links Grid */}
            <div className="flex justify-center space-x-8 mb-6">
              <div className="space-y-3">
                <Link href="/new-projects" className="block text-gray-700 hover:text-[#b8860b] font-medium uppercase text-xs transition-colors">
                  NEW PROJECTS
                </Link>
                <Link href="/built-up-sco" className="block text-gray-700 hover:text-[#b8860b] font-medium uppercase text-xs transition-colors">
                  BUILT-UP SCO
                </Link>
                <Link href="/top-5-projects" className="block text-gray-700 hover:text-[#b8860b] font-medium uppercase text-xs transition-colors">
                  TOP 5 PROJECTS
                </Link>
              </div>
              <div className="space-y-3">
                <Link href="/disclaimer" className="block text-gray-700 hover:text-[#b8860b] font-medium uppercase text-xs transition-colors">
                  DISCLAIMER
                </Link>
                <Link href="/privacy-policy" className="block text-gray-700 hover:text-[#b8860b] font-medium uppercase text-xs transition-colors">
                  PRIVACY POLICY
                </Link>
                <Link href="/about" className="block text-gray-700 hover:text-[#b8860b] font-medium uppercase text-xs transition-colors">
                  CONTACT US
                </Link>
              </div>
            </div>

            {/* Contact Info */}
            <div className="text-center mb-6">
              <a
                href="tel:+919811677423"
                className="block text-gray-700 hover:text-[#b8860b] font-medium text-sm transition-colors mb-2"
              >
                +91 98116 77423
              </a>
              <a
                href="mailto:info@heliosland.com"
                className="block text-gray-700 hover:text-[#b8860b] font-medium text-sm transition-colors"
              >
                info@heliosland.com
              </a>
            </div>

            {/* Social Media Icons */}
            <div className="flex justify-center space-x-4 mb-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#b8860b] transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#b8860b] transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#b8860b] transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://instagram.com/heliosland"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#b8860b] transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#b8860b] transition-colors"
              >
                <Youtube size={20} />
              </a>
            </div>

            {/* Copyright */}
            <div className="text-center">
              <p className="text-gray-600 text-xs">
                Copyright © 2024 Helios Land. All rights reserved.
              </p>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:flex flex-row justify-between items-start">
            {/* Left Section - Links */}
            <div className="flex-1 text-center">
              <div className="flex flex-col gap-3">
                <Link href="/new-projects" className="text-gray-700 hover:text-[#b8860b] font-medium uppercase text-sm transition-colors">
                  NEW PROJECTS
                </Link>
                <Link href="/built-up-sco" className="text-gray-700 hover:text-[#b8860b] font-medium uppercase text-sm transition-colors">
                  BUILT-UP SCO
                </Link>
                <Link href="/top-5-projects" className="text-gray-700 hover:text-[#b8860b] font-medium uppercase text-sm transition-colors">
                  TOP 5 PROJECTS
                </Link>
              </div>
            </div>

            {/* Center Section - Logo */}
            <div className="flex-1 flex justify-center">
              <div className="flex flex-col items-center">
               <Link
    href="/"
    onClick={handleLogoClick}
                  className="flex flex-col items-center space-y-2 cursor-pointer group relative"
  >
                <Image
                  src="/images/logo.png"
                    alt="Helios Land Logo"
                    width={100}
                    height={100}
                    className="rounded-full transition-transform duration-500 ease-in-out group-hover:scale-110"
                  />
                <Image
                src="/images/logo2.jpg"
                alt="Helios Land"
                width={150}
                height={60}
                    className=""
                />
                </Link>
                
              {/* Social Media Icons */}
                <div className="flex justify-center space-x-4 mt-6 mb-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
                    className="text-gray-600 hover:text-[#b8860b] transition-colors"
            >
                    <Facebook size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
                    className="text-gray-600 hover:text-[#b8860b] transition-colors"
            >
                    <Twitter size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
                    className="text-gray-600 hover:text-[#b8860b] transition-colors"
            >
                    <Linkedin size={20} />
            </a>
            <a
              href="https://instagram.com/heliosland"
              target="_blank"
              rel="noopener noreferrer"
                    className="text-gray-600 hover:text-[#b8860b] transition-colors"
            >
                    <Instagram size={20} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
                    className="text-gray-600 hover:text-[#b8860b] transition-colors"
            >
                    <Youtube size={20} />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center">
                  <p className="text-gray-600 text-xs">
                    Copyright © 2024 Helios Land. All rights reserved.
                  </p>
                </div>
          </div>
            </div>

            {/* Right Section - Links */}
            <div className="flex-1 text-center">
              <div className="flex flex-col gap-3">
                <Link href="/disclaimer" className="text-gray-700 hover:text-[#b8860b] font-medium uppercase text-sm transition-colors">
    DISCLAIMER
  </Link>
                <Link href="/privacy-policy" className="text-gray-700 hover:text-[#b8860b] font-medium uppercase text-sm transition-colors">
    PRIVACY POLICY
  </Link>
                <Link href="/about" className="text-gray-700 hover:text-[#b8860b] font-medium uppercase text-sm transition-colors">
    CONTACT US
  </Link>
                <a href="tel:+919811677423" className="text-gray-700 hover:text-[#b8860b] font-medium text-sm transition-colors">
    +91 98116 77423
  </a>
                <a href="mailto:info@heliosland.com" className="text-gray-700 hover:text-[#b8860b] font-medium text-sm transition-colors">
    info@heliosland.com
  </a>
</div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}