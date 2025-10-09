import Link from 'next/link';
import { MapPin, Bed, Bath, Square } from 'lucide-react';
import { useState } from 'react';
import HoverAnimation from './animations/HoverAnimation';
import FadeIn from './animations/FadeIn';

export default function PropertyCard({ property, isSlider = false }) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const cardClasses = isSlider
    ? "property-slide property-card"
    : "property-card";

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  return (
    <FadeIn delay={0} duration={0.4} direction="up" distance={20}>
      <div className="property-card-3d-container">
        <Link
          href={`/property/${property.slug}`}
          className={`${cardClasses} property-card-3d transform transition-all duration-300 ease-out block cursor-pointer group`}
        >
          <div className="relative h-48 sm:h-48 w-full overflow-hidden">
            <div className="absolute inset-0 transform transition-all duration-300 group-hover:scale-105">
              <img
                src={imageError ? "/images/placeholder.svg" : property.image}
                alt={property.title}
                className="w-full h-full object-cover transition-all duration-300"
                onLoad={handleImageLoad}
                onError={handleImageError}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block'
                }}
              />
            </div>
            {property.featured && (
              <div className="absolute top-2 left-2 bg-brand-gold text-white px-2 py-1 rounded text-sm font-semibold">
                Featured
              </div>
            )}
            <div className="absolute top-2 right-2 bg-brand-dark-blue text-white px-2 py-1 rounded text-sm capitalize">
              {property.type}
            </div>
          </div>

          <div className="p-4">
            <h3 className="text-lg font-semibold text-brand-dark-blue mb-2 line-clamp-2 text-left group-hover:text-brand-gold transition-colors duration-300">
              {property.title.split(' ').map((word, index) => (
                <span key={index}>
                  {index === 0 ? (
                    <span className="underline decoration-brand-gold decoration-2 group-hover:decoration-white transition-all duration-300">{word}</span>
                  ) : (
                    ` ${word}`
                  )}
                </span>
              ))}
            </h3>
          </div>
        </Link>
      </div>
    </FadeIn>
  );
}