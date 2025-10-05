import { useState, useEffect, useRef } from 'react';

export default function ParallaxScroll({ 
  children, 
  speed = 0.5, 
  className = "",
  direction = 'up'
}) {
  const [offset, setOffset] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const rate = scrolled * -speed;
        
        if (direction === 'up') {
          setOffset(rate);
        } else if (direction === 'down') {
          setOffset(-rate);
        } else if (direction === 'left') {
          setOffset(rate);
        } else if (direction === 'right') {
          setOffset(-rate);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, direction]);

  const getTransform = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return `translateY(${offset}px)`;
      case 'left':
      case 'right':
        return `translateX(${offset}px)`;
      default:
        return `translateY(${offset}px)`;
    }
  };

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        transform: getTransform(),
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  );
}
