import { useState } from 'react';
import FadeIn from './FadeIn';
import HoverAnimation from './HoverAnimation';
import StaggeredAnimation from './StaggeredAnimation';
import TypingAnimation from './TypingAnimation';
import CountUp from './CountUp';

export default function AnimationShowcase() {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container">
        <FadeIn delay={0} duration={1} direction="up" distance={50}>
          <h2 className="text-4xl font-bold text-center mb-12 text-brand-dark-blue">
            Animation Showcase
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Typing Animation Demo */}
          <FadeIn delay={200} duration={1} direction="left" distance={30}>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-brand-dark-blue">Typing Animation</h3>
              <TypingAnimation 
                text="Welcome to Helios Land - Premium Real Estate"
                speed={100}
                className="text-gray-700"
              />
            </div>
          </FadeIn>

          {/* Count Up Animation Demo */}
          <FadeIn delay={400} duration={1} direction="up" distance={30}>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-brand-dark-blue">Count Up Animation</h3>
              <div className="text-3xl font-bold text-brand-gold">
                <CountUp end={500} suffix="+" prefix="" />
              </div>
              <p className="text-gray-600 mt-2">Happy Customers</p>
            </div>
          </FadeIn>

          {/* Hover Animations Demo */}
          <FadeIn delay={600} duration={1} direction="right" distance={30}>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-brand-dark-blue">Hover Effects</h3>
              <div className="space-y-4">
                <HoverAnimation animationType="lift" intensity="medium">
                  <div className="p-4 bg-brand-gold text-white rounded cursor-pointer">
                    Lift Effect
                  </div>
                </HoverAnimation>
                <HoverAnimation animationType="scale" intensity="high">
                  <div className="p-4 bg-brand-dark-blue text-white rounded cursor-pointer">
                    Scale Effect
                  </div>
                </HoverAnimation>
                <HoverAnimation animationType="glow" intensity="high">
                  <div className="p-4 bg-gray-800 text-white rounded cursor-pointer">
                    Glow Effect
                  </div>
                </HoverAnimation>
              </div>
            </div>
          </FadeIn>

          {/* Staggered Animation Demo */}
          <FadeIn delay={800} duration={1} direction="up" distance={30}>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-brand-dark-blue">Staggered Animation</h3>
              <StaggeredAnimation staggerDelay={0.2} animationType="fadeInUp">
                <div className="space-y-2">
                  <div className="p-2 bg-blue-100 rounded">Item 1</div>
                  <div className="p-2 bg-blue-100 rounded">Item 2</div>
                  <div className="p-2 bg-blue-100 rounded">Item 3</div>
                  <div className="p-2 bg-blue-100 rounded">Item 4</div>
                </div>
              </StaggeredAnimation>
            </div>
          </FadeIn>

          {/* CSS Animation Classes Demo */}
          <FadeIn delay={1000} duration={1} direction="left" distance={30}>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-brand-dark-blue">CSS Animations</h3>
              <div className="space-y-4">
                <div className="p-4 bg-green-100 rounded animate-bounce">
                  Bounce
                </div>
                <div className="p-4 bg-purple-100 rounded animate-pulse">
                  Pulse
                </div>
                <div className="p-4 bg-red-100 rounded animate-spin">
                  Spin
                </div>
                <div className="p-4 bg-yellow-100 rounded animate-ping">
                  Ping
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Interactive Demo */}
          <FadeIn delay={1200} duration={1} direction="right" distance={30}>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-brand-dark-blue">Interactive Demo</h3>
              <button
                onClick={() => setShowDemo(!showDemo)}
                className="btn btn-primary mb-4"
              >
                Toggle Demo
              </button>
              {showDemo && (
                <div className="animate-fade-in">
                  <div className="p-4 bg-gradient-to-r from-brand-gold to-yellow-400 text-white rounded">
                    <p>This content appears with a fade-in animation!</p>
                  </div>
                </div>
              )}
            </div>
          </FadeIn>
        </div>

        {/* Animation Classes Reference */}
        <FadeIn delay={1400} duration={1} direction="up" distance={50}>
          <div className="mt-16 bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-6 text-brand-dark-blue">Available Animation Classes</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2 text-brand-gold">Fade Animations</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>animate-fade-in</li>
                  <li>animate-fade-in-up</li>
                  <li>animate-fade-in-down</li>
                  <li>animate-fade-in-left</li>
                  <li>animate-fade-in-right</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-brand-gold">Slide Animations</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>animate-slide-up</li>
                  <li>animate-slide-down</li>
                  <li>animate-slide-in-left</li>
                  <li>animate-slide-in-right</li>
                  <li>animate-slide-in-up</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-brand-gold">Scale Animations</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>animate-scale-in</li>
                  <li>animate-zoom-in</li>
                  <li>animate-bounce-in</li>
                  <li>animate-elastic</li>
                  <li>animate-wiggle</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-brand-gold">Hover Effects</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>hover-lift</li>
                  <li>hover-scale</li>
                  <li>hover-glow</li>
                  <li>hover-rotate</li>
                  <li>hover-bounce</li>
                </ul>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
