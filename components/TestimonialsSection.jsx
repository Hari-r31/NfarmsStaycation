'use client';

import { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Family Visitor',
      image: 'https://images.unsplash.com/photo-1602867741746-6df80f40b3f6?q=80&w=400',
      rating: 5,
      text: 'N Farms was the perfect escape for our family reunion! The accommodations were comfortable, the swimming pool was great for the kids, and the bonfire night was unforgettable. The peaceful environment and friendly staff made our stay truly special.',
    },
    {
      name: 'Rahul Kapoor',
      role: 'Corporate Team Lead',
      image: 'https://images.unsplash.com/photo-1537721664796-76f77222a5d0?q=80&w=400',
      rating: 5,
      text: 'We organized our team outing at N Farms and it exceeded all expectations. The venue was perfect for team building activities, the food was delicious, and the natural setting helped everyone unwind. Highly recommended for corporate events!',
    },
    {
      name: 'Anjali & Vikram',
      role: 'Couple Getaway',
      image: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?q=80&w=400',
      rating: 5,
      text: 'Our romantic weekend at N Farms was absolutely magical. The rustic charm, beautiful photo spots, and serene atmosphere created the perfect setting for quality time together. We\'ll definitely be back!',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="py-20 bg-green-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1714588862918-1490f23f3e56?q=80&w=2000)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-green-300 font-semibold mb-2">Guest Experiences</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Our Guests Say
          </h2>
          <p className="text-green-100 text-lg max-w-2xl mx-auto">
            Read reviews from families, couples, and teams who have experienced the magic of N Farms.
          </p>
        </div>

        {/* Testimonial Slider */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
            <CardContent className="p-8 md:p-12">
              <Quote className="w-16 h-16 text-green-300 mb-6" />
              
              <div className="mb-8">
                <p className="text-xl md:text-2xl text-white leading-relaxed mb-6">
                  {testimonials[activeIndex].text}
                </p>
                
                {/* Rating */}
                <div className="flex space-x-1 mb-6">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <img
                  src={testimonials[activeIndex].image}
                  alt={testimonials[activeIndex].name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-green-300"
                />
                <div>
                  <h4 className="text-xl font-bold text-white">
                    {testimonials[activeIndex].name}
                  </h4>
                  <p className="text-green-200">{testimonials[activeIndex].role}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dots Navigation */}
          <div className="flex justify-center space-x-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === activeIndex
                    ? 'bg-white w-8'
                    : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
