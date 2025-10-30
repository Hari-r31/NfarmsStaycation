'use client';

import { Music, Flame, Projector, Gamepad2, Waves, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ServicesSection = () => {
  const services = [
    {
      icon: <Flame className="w-10 h-10 text-white" />,
      title: 'BBQ Setup & Bonfire Nights',
      description:
        'Enjoy cozy evenings with our open BBQ and bonfire area — perfect for grilling, music, and great conversations under the stars.',
      image: 'https://images.unsplash.com/photo-1601050690597-779c2d9f2b8c?q=80&w=600',
      capacity: 'Evening Activity',
    },
    {
      icon: <Music className="w-10 h-10 text-white" />,
      title: 'DJ & Sound Setup',
      description:
        'Get the party started with our professional DJ sound system and ambient lighting for unforgettable night vibes.',
      image: 'https://images.unsplash.com/photo-1601233749202-95d04a3d67b5?q=80&w=600',
      capacity: 'Party Ready',
    },
    {
      icon: <Projector className="w-10 h-10 text-white" />,
      title: 'Outdoor Projector & Movie Nights',
      description:
        'Host open-air movie nights with our large projector setup — perfect for group events and late-night screenings.',
      image: 'https://images.unsplash.com/photo-1598887142487-5f9d62d5a5da?q=80&w=600',
      capacity: 'Custom Setup',
    },
    {
      icon: <Gamepad2 className="w-10 h-10 text-white" />,
      title: 'Fun Games & Activities',
      description:
        'Challenge your friends and family to outdoor and indoor games — from cricket and badminton to board games.',
      image: 'https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?q=80&w=600',
      capacity: 'All Day Fun',
    },
    {
      icon: <Waves className="w-10 h-10 text-white" />,
      title: 'Swimming Pool Access',
      description:
        'Cool off and unwind in our clean, private pool surrounded by lush greenery — ideal for both kids and adults.',
      image: 'https://images.unsplash.com/photo-1594745565895-0816a6b9f6c5?q=80&w=600',
      capacity: 'Open Daily',
    },
    {
      icon: <Users className="w-10 h-10 text-white" />,
      title: 'Private Events & Gatherings',
      description:
        'Host birthdays, reunions, and team outings in a serene, fully private space with customizable arrangements.',
      image: 'https://images.unsplash.com/photo-1542317854-f9596ae570f8?q=80&w=600',
      capacity: 'Custom Packages',
    },
  ];

  return (
    <section id="services" className="mt-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-green-600 font-semibold mb-2">What We Offer</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Experiences at N Farms Staycation
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover an exclusive getaway packed with entertainment, comfort, and farm-style charm — only at N Farms.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl transition-all duration-300 overflow-hidden border-none"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center space-x-2 text-white">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                      {service.icon}
                    </div>
                    <div>
                      <p className="text-sm opacity-90">{service.capacity}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Button
                  variant="outline"
                  className="w-full group-hover:bg-green-600 group-hover:text-white group-hover:border-green-600 transition-colors"
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
