
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useSpring, animated } from '@react-spring/web';
import heroBackground from '@/assets/hero-background.jpg';
import heroBackground2 from '@/assets/hero-background-2.jpg';
import heroBackground3 from '@/assets/hero-background-3.jpg';

type SlideData = {
  id: number;
  imageSrc: string;
  title: string;
  subtitle: string;
}

const slides: SlideData[] = [
  {
    id: 1,
    imageSrc: heroBackground,
    title: 'Peaceful Homestay Retreat',
    subtitle: 'Experience comfort and tranquility in the heart of nature'
  },
  {
    id: 2,
    imageSrc: heroBackground2,
    title: 'Cozy Valley Views',
    subtitle: 'Wake up to stunning vistas and fresh mountain air'
  },
  {
    id: 3,
    imageSrc: heroBackground3,
    title: 'Home Away From Home',
    subtitle: 'Authentic local hospitality with modern comforts'
  }
];

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  
  const parallaxProps = useSpring({
    transform: `translateY(${scrollY * 0.3}px)`,
    config: { mass: 1, tension: 120, friction: 14 }
  });
  
  const textFloatProps = useSpring({
    transform: `translateY(${-scrollY * 0.2}px)`,
    config: { mass: 1, tension: 120, friction: 14 }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const scrollPos = Math.max(0, -rect.top);
        setScrollY(scrollPos);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  
  return (
    <div ref={heroRef} className="relative h-screen w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          className={cn(
            'absolute inset-0 transition-opacity duration-1500 ease-in-out',
            currentSlide === index ? 'opacity-100' : 'opacity-0'
          )}
        >
          <div className="absolute inset-0 bg-black/50 z-10" />
          <animated.div 
            style={{
              backgroundImage: `url(${slide.imageSrc})`,
              filter: 'contrast(1.1) brightness(0.9)',
              transform: currentSlide === index ? parallaxProps.transform : 'none'
            }}
            className="absolute inset-0 w-full h-full bg-cover bg-center"
          />
          
          <div className="relative h-full flex flex-col items-center justify-center text-center px-4 z-20">
            <animated.div style={currentSlide === index ? textFloatProps : {}}>
              <h1 
                className={cn(
                  "text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white max-w-5xl leading-tight mb-4",
                  "transition-all duration-700 transform",
                  "text-shadow-lg",
                  currentSlide === index ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                )}
                style={{
                  color: '#FFFFFF', // Pure white color
                  textShadow: '0 0 15px rgba(255, 255, 255, 0.7)'
                }}
              >
                {slide.title}
              </h1>
              <p 
                className={cn(
                  "text-lg md:text-xl text-white max-w-2xl mb-8",
                  "transition-all duration-700 delay-300 transform",
                  "text-shadow-md",
                  currentSlide === index ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                )}
                style={{
                  color: '#FFFFFF', // Pure white color
                  textShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
                }}
              >
                {slide.subtitle}
              </p>
              <div 
                className={cn(
                  "transition-all duration-700 delay-500 transform",
                  currentSlide === index ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                )}
              >
                <Link 
                  to="/contact" 
                  className="btn-primary text-lg hover:shadow-glow transition-all duration-300 transform hover:scale-110"
                >
                  Contact for Booking
                </Link>
              </div>
            </animated.div>
          </div>
        </div>
      ))}
      
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              'w-3 h-3 rounded-full transition-all duration-300 transform',
              currentSlide === index 
                ? 'bg-white scale-150 shadow-glow' 
                : 'bg-white/50 hover:bg-white/80 hover:scale-125'
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      <animated.div 
        style={useSpring({
          from: { opacity: 0, transform: 'translateY(20px)' },
          to: { opacity: 1, transform: 'translateY(0px)' },
          delay: 800,
          config: { tension: 120, friction: 14 }
        })}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block"
      >
        <div className="w-8 h-12 rounded-full border-2 border-white/70 flex items-start justify-center hover:border-white hover:shadow-glow transition-all duration-300">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-[slide-down_1.5s_ease-in-out_infinite]" />
        </div>
      </animated.div>
    </div>
  );
};

export default Hero;
