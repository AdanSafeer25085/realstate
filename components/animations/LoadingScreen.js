import { useState, useEffect } from 'react';

export default function LoadingScreen({ onComplete, duration = 3000 }) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, duration / 50);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  return (
    <div className={`fixed inset-0 bg-gradient-to-br from-brand-dark-blue via-blue-900 to-brand-gold z-50 flex items-center justify-center transition-opacity duration-500 ${isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="text-center">
        {/* Logo Animation */}
        <div className="mb-8 animate-bounce">
          <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-2xl">
            <span className="text-2xl font-bold text-brand-dark-blue">H</span>
          </div>
        </div>

        {/* Company Name */}
        <h1 className="text-4xl font-bold text-white mb-4 animate-fade-in">
          Helios Land
        </h1>
        
        {/* Tagline */}
        <p className="text-xl text-white/80 mb-8 animate-fade-in" style={{animationDelay: '0.5s'}}>
          Premium Real Estate in Gurgaon
        </p>

        {/* Progress Bar */}
        <div className="w-64 mx-auto">
          <div className="bg-white/20 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-brand-gold to-yellow-400 h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-white/60 mt-2 text-sm">
            {progress}%
          </p>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-4 h-4 bg-white rounded-full opacity-20 animate-float"></div>
          <div className="absolute top-40 right-20 w-6 h-6 bg-brand-gold rounded-full opacity-30 animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-40 left-20 w-3 h-3 bg-white rounded-full opacity-25 animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-60 right-40 w-5 h-5 bg-white rounded-full opacity-20 animate-float" style={{animationDelay: '0.5s'}}></div>
        </div>
      </div>
    </div>
  );
}
