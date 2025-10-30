'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const GallerySection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    { url: 'https://images.unsplash.com/photo-1591105877372-e94c120febde?q=80&w=800', title: 'BBQ & Bonfire Nights' },
    { url: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=800', title: 'DJ Setup & Party Vibes' },
    { url: 'https://images.unsplash.com/photo-1598887142487-5f9d62d5a5da?q=80&w=800', title: 'Outdoor Projector Screen' },
    { url: 'https://images.unsplash.com/photo-1594745565895-0816a6b9f6c5?q=80&w=800', title: 'Private Swimming Pool' },
    { url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=800', title: 'Spacious Farm Villa Stay' },
    { url: 'https://images.unsplash.com/photo-1649172705920-56b8a4bba3d0?q=80&w=800', title: 'Fun Outdoor Games' },
    { url: 'https://images.unsplash.com/photo-1610878180933-123728745c43?q=80&w=800', title: 'Serene Nature Views' },
    { url: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=800', title: 'Evening Lights & Ambience' },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-white to-green-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-green-600 font-semibold mb-2">Gallery</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Staycation Moments at N Farms
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            A glimpse into the relaxing and joyful experiences waiting for you — from poolside fun to cozy bonfire nights.
          </p>
        </div>

        {/* Main Carousel */}
        <div className="relative max-w-5xl mx-auto mb-8">
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={images[currentIndex].url}
              alt={images[currentIndex].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <h3 className="text-white text-2xl font-bold">{images[currentIndex].title}</h3>
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white shadow-lg"
            variant="ghost"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </Button>
          <Button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white shadow-lg"
            variant="ghost"
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </Button>
        </div>

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4 max-w-5xl mx-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative h-20 rounded-lg overflow-hidden transition-all ${
                index === currentIndex
                  ? 'ring-4 ring-green-600 scale-105'
                  : 'hover:scale-105 opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
