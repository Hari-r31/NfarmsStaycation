'use client';

import { Home, Heart, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const AboutSection = () => {
  const features = [
    {
      icon: <Home className="w-8 h-8 text-green-600" />,
      title: 'Luxury Accommodations',
      description: 'Modern Comfort in Nature',
    },
    {
      icon: <Heart className="w-8 h-8 text-green-600" />,
      title: 'Peaceful Retreat',
      description: 'Escape the City Chaos',
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: 'Perfect for Groups',
      description: 'Families, Teams & Friends',
    },
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-white to-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-green-600 font-semibold mb-2">Why Choose N Farms?</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Your Perfect Farmstay Escape
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image */}
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/resort/hero/whole.jpeg"
              alt="N Farms Resort"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-6 right-6 bg-white rounded-lg px-6 py-3 shadow-lg">
              <div className="text-3xl font-bold text-green-600">50+</div>
              <div className="text-sm text-gray-600">Guests</div>
            </div>
          </div>

          {/* Content */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              A Serene Farmstay Resort in Moinabad
            </h3>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Welcome to N Farms, where nature meets luxury. Our resort offers the perfect escape for team outings, family reunions, romantic getaways, and memorable celebrations. Experience the tranquility of farmlife combined with modern amenities.
            </p>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Bond with loved ones through indoor games, bonfire nights, and barbecue dinners. Relax by our refreshing swimming pool, explore rustic village-themed attractions, and create unforgettable memories in the heart of nature.
            </p>
<Button
  onClick={() =>
    document.getElementById('getintouch')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }
  className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg"
>
  Discover N Farms
</Button>

          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="hover:shadow-xl transition-shadow duration-300 border-none bg-white"
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
