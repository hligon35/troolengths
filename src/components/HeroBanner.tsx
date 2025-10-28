import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      id: 1,
      title: "Premium Hair Extensions",
      subtitle: "Transform your look with our premium quality hair",
      description: "100% Virgin Human Hair | Free Shipping | 30-Day Returns",
      ctaText: "Shop Now",
      ctaLink: "/category/bundles",
      backgroundImage: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=1920&h=800&fit=crop",
      textColor: "text-white"
    },
    {
      id: 2,
      title: "Lace Front Wigs",
      subtitle: "Natural hairlines that blend seamlessly",
      description: "Pre-plucked & Ready to Wear | Multiple Textures Available",
      ctaText: "Explore Wigs",
      ctaLink: "/category/wigs",
      backgroundImage: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=1920&h=800&fit=crop",
      textColor: "text-white"
    },
    {
      id: 3,
      title: "Flash Sale - 30% Off",
      subtitle: "Limited time offer on selected items",
      description: "Don't miss out on our biggest sale of the year!",
      ctaText: "Shop Sale",
      ctaLink: "/sale",
      backgroundImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=800&fit=crop",
      textColor: "text-white",
      isPromo: true
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url(${currentSlideData.backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <div className={`space-y-4 ${currentSlideData.textColor}`}>
              {currentSlideData.isPromo && (
                <div className="inline-block bg-accent-coral text-white px-4 py-2 rounded-full text-sm font-semibold animate-pulse">
                  🔥 LIMITED TIME OFFER
                </div>
              )}
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                {currentSlideData.title}
              </h1>
              
              <p className="text-xl md:text-2xl font-medium opacity-90">
                {currentSlideData.subtitle}
              </p>
              
              <p className="text-lg opacity-80">
                {currentSlideData.description}
              </p>
              
              <div className="pt-4">
                <Link
                  to={currentSlideData.ctaLink}
                  className={`inline-block px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 ${
                    currentSlideData.isPromo 
                      ? 'bg-accent-coral hover:bg-red-500 text-white' 
                      : 'bg-primary-500 hover:bg-primary-600 text-white'
                  }`}
                >
                  {currentSlideData.ctaText}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        title="Previous slide"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white transition-all"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button
        onClick={nextSlide}
        title="Next slide"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white transition-all"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            title={`Go to slide ${index + 1}`}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide 
                ? 'bg-white' 
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;