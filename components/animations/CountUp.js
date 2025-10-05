import { useState, useEffect, useRef } from 'react';

export default function CountUp({ 
  end, 
  duration = 2000, 
  start = 0, 
  suffix = '', 
  prefix = '',
  className = "",
  threshold = 0.1
}) {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [threshold, isVisible]);

  useEffect(() => {
    if (isVisible) {
      const increment = (end - start) / (duration / 16);
      let current = start;

      intervalRef.current = setInterval(() => {
        current += increment;
        if (current >= end) {
          setCount(end);
          clearInterval(intervalRef.current);
        } else {
          setCount(Math.floor(current));
        }
      }, 16);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [isVisible, end, start, duration]);

  return (
    <span ref={elementRef} className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}
