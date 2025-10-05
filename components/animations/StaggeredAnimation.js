import { useState, useEffect, useRef } from 'react';

export default function StaggeredAnimation({ 
  children, 
  staggerDelay = 0.1, 
  animationType = 'fadeInUp',
  className = "",
  threshold = 0.1
}) {
  const [visibleItems, setVisibleItems] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const childrenArray = Array.isArray(children) ? children : [children];
          childrenArray.forEach((_, index) => {
            setTimeout(() => {
              setVisibleItems(prev => [...prev, index]);
            }, index * staggerDelay * 1000);
          });
        }
      },
      { threshold }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [children, staggerDelay, threshold]);

  const getAnimationClass = (index) => {
    const isVisible = visibleItems.includes(index);
    
    switch (animationType) {
      case 'fadeInUp':
        return isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8';
      case 'fadeInLeft':
        return isVisible ? 'animate-slide-in-left' : 'opacity-0 -translate-x-8';
      case 'fadeInRight':
        return isVisible ? 'animate-slide-in-right' : 'opacity-0 translate-x-8';
      case 'scaleIn':
        return isVisible ? 'animate-scale-in' : 'opacity-0 scale-95';
      default:
        return isVisible ? 'animate-fade-in' : 'opacity-0';
    }
  };

  return (
    <div ref={containerRef} className={className}>
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <div
            key={index}
            className={`transition-all duration-700 ease-out ${getAnimationClass(index)}`}
          >
            {child}
          </div>
        ))
      ) : (
        <div className={`transition-all duration-700 ease-out ${getAnimationClass(0)}`}>
          {children}
        </div>
      )}
    </div>
  );
}
