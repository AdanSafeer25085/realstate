import { useState } from 'react';

export default function HoverAnimation({ 
  children, 
  animationType = 'lift',
  intensity = 'medium',
  className = "",
  onHover = null,
  onLeave = null
}) {
  const [isHovered, setIsHovered] = useState(false);

  const getAnimationClasses = () => {
    const baseClasses = 'transition-all duration-300 ease-out';
    
    switch (animationType) {
      case 'lift':
        const liftIntensity = intensity === 'high' ? 'hover:-translate-y-4' : 
                             intensity === 'low' ? 'hover:-translate-y-1' : 
                             'hover:-translate-y-2';
        return `${baseClasses} ${liftIntensity} hover:shadow-2xl`;
      
      case 'scale':
        const scaleIntensity = intensity === 'high' ? 'hover:scale-110' : 
                              intensity === 'low' ? 'hover:scale-105' : 
                              'hover:scale-108';
        return `${baseClasses} ${scaleIntensity} hover:shadow-xl`;
      
      case 'rotate':
        return `${baseClasses} hover:rotate-3 hover:scale-105 hover:shadow-xl`;
      
      case 'glow':
        return `${baseClasses} hover:shadow-2xl hover:shadow-brand-gold/50 hover:scale-105`;
      
      case 'slide':
        return `${baseClasses} hover:translate-x-2 hover:shadow-xl`;
      
      case 'bounce':
        return `${baseClasses} hover:animate-bounce hover:shadow-xl`;
      
      default:
        return `${baseClasses} hover:scale-105 hover:shadow-xl`;
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (onHover) onHover();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (onLeave) onLeave();
  };

  return (
    <div
      className={`${getAnimationClasses()} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
