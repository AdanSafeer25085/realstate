import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PropertyCard from './PropertyCard';
import FadeIn from './animations/FadeIn';
import HoverAnimation from './animations/HoverAnimation';

export default function PropertySlider({ title, properties }) {
  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (direction) => {
    const slider = sliderRef.current;
    // Responsive scroll amount based on screen size
    const isMobile = window.innerWidth < 640;
    const isTablet = window.innerWidth < 1024;
    const scrollAmount = isMobile ? 200 : isTablet ? 280 : 320;

    if (direction === 'left') {
      slider.scrollLeft -= scrollAmount;
    } else {
      slider.scrollLeft += scrollAmount;
    }

    // Update scroll button states
    setTimeout(() => {
      setCanScrollLeft(slider.scrollLeft > 0);
      setCanScrollRight(
        slider.scrollLeft < slider.scrollWidth - slider.clientWidth
      );
    }, 300);
  };

  const handleScroll = () => {
    const slider = sliderRef.current;
    setCanScrollLeft(slider.scrollLeft > 0);
    setCanScrollRight(
      slider.scrollLeft < slider.scrollWidth - slider.clientWidth
    );
  };

  if (!properties || properties.length === 0) {
    return null;
  }

  return (
    <section className="py-8 sm:py-12">
      <div className="container">
        <FadeIn delay={0} duration={1} direction="up" distance={30}>
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h2 className="section-title mb-0 text-left sm:text-center animate-text-reveal">{title}</h2>
            <div className="flex gap-1 sm:gap-2">
              <HoverAnimation animationType="scale" intensity="medium">
                <button
                  onClick={() => scroll('left')}
                  disabled={!canScrollLeft}
                  className={`slider-btn ${!canScrollLeft ? 'opacity-50 cursor-not-allowed' : ''} transform transition-all duration-300`}
                >
                  <ChevronLeft size={16} className="sm:w-5 sm:h-5 transition-transform duration-300 hover:-translate-x-1" />
                </button>
              </HoverAnimation>
              <HoverAnimation animationType="scale" intensity="medium">
                <button
                  onClick={() => scroll('right')}
                  disabled={!canScrollRight}
                  className={`slider-btn ${!canScrollRight ? 'opacity-50 cursor-not-allowed' : ''} transform transition-all duration-300`}
                >
                  <ChevronRight size={16} className="sm:w-5 sm:h-5 transition-transform duration-300 hover:translate-x-1" />
                </button>
              </HoverAnimation>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={200} duration={1} direction="up" distance={50}>
          <div
            ref={sliderRef}
            className="slider-container"
            onScroll={handleScroll}
          >
            {properties.map((property, index) => (
              <div
                key={property.id}
                className="animate-slide-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <PropertyCard
                  property={property}
                  isSlider={true}
                />
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}