'use client';

import {
  Music,
  Flame,
  Projector,
  Gamepad2,
  Waves,
  Users,
  Camera,
  Video,
  Dumbbell,
  Table2,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ServicesSection = () => {
  const services = [
    {
      icon: <Flame className="w-10 h-10 text-white" />,
      title: 'BBQ Setup & Bonfire Nights',
      description:
        'Enjoy cozy evenings with our open BBQ and bonfire area — perfect for grilling, music, and great conversations under the stars.',
      image: 'https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?q=80&w=800&auto=format&fit=crop',
      capacity: 'Evening Activity',
    },
    {
      icon: <Music className="w-10 h-10 text-white" />,
      title: 'DJ & Sound Setup',
      description:
        'Get the party started with our professional DJ sound system and ambient lighting for unforgettable night vibes.',
      image: 'https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?q=80&w=800&auto=format&fit=crop',
      capacity: 'Party Ready',
    },
    {
      icon: <Projector className="w-10 h-10 text-white" />,
      title: 'Outdoor Projector & Movie Nights',
      description:
        'Host open-air movie nights with our large projector setup — perfect for group events and late-night screenings.',
      image: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=800&auto=format&fit=crop',
      capacity: 'Custom Setup',
    },
    {
      icon: <Camera className="w-10 h-10 text-white" />,
      title: 'Pre-Wedding Photoshoot',
      description:
        'Capture your special moments amidst the lush greenery and rustic charm of N Farms — perfect for cinematic pre-wedding shoots.',
      image: 'https://images.unsplash.com/photo-1530092285049-1c42085fd395?q=80&w=800&auto=format&fit=crop',
      capacity: 'Romantic Setup',
    },
    {
      icon: <Video className="w-10 h-10 text-white" />,
      title: 'Short Films & Serials Shooting',
      description:
        'Scenic landscapes, open fields, and farm aesthetics make N Farms a perfect backdrop for creative film and serial shoots.',
      image: 'https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?q=80&w=800&auto=format&fit=crop',
      capacity: 'Professional Setup',
    },


  {
    icon: <Gamepad2 className="w-10 h-10 text-white" />,
    title: 'Fun Games & Activities',
    description:
      'Challenge your friends and family to outdoor and indoor games — from cricket and badminton to board games.',
    image:
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop',
    capacity: 'All Day Fun',
  },
  {
    icon: <Table2 className="w-10 h-10 text-white" />,
    title: 'Table Tennis',
    description:
      'Enjoy competitive indoor table tennis with high-quality equipment — ideal for friendly matches or tournaments.',
    image:
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop',
    capacity: 'Indoor Sport',
  },
  {
    icon: <Dumbbell className="w-10 h-10 text-white" />,
    title: 'Tug of Car Challenge',
    description:
      'Test your strength and teamwork with our unique Tug of Car event — a fun and thrilling group activity.',
    image:
      'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=800&auto=format&fit=crop',
    capacity: 'Group Activity',
  },
  {
    icon: <Waves className="w-10 h-10 text-white" />,
    title: 'Swimming Pool Access',
    description:
      'Cool off and unwind in our clean, private pool surrounded by lush greenery — ideal for both kids and adults.',
    image:
      'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=800&auto=format&fit=crop',
    capacity: 'Open Daily',
  },
  {
    icon: <Users className="w-10 h-10 text-white" />,
    title: 'Private Events & Gatherings',
    description:
      'Host birthdays, reunions, and team outings in a serene, fully private space with customizable arrangements.',
    image:
      'https://images.unsplash.com/photo-1570498839593-e565b39455fc?q=80&w=800&auto=format&fit=crop',
    capacity: 'Custom Packages',
  },{
    icon: <Waves className="w-10 h-10 text-white" />,
    title: 'Luxury Stay & Farm Villa Experience',
    description:
      'Stay overnight in our premium farm villas featuring elegant interiors, private patios, and lush green surroundings — the perfect luxury escape.',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    capacity: 'Stay Experience',
  },
  {
    icon: <Camera className="w-10 h-10 text-white" />,
    title: 'Nature Walks & Photography Trails',
    description:
      'Explore the natural beauty of N Farms with peaceful morning walks, guided trails, and endless opportunities for photography enthusiasts.',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
    capacity: 'Morning Activity',
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
            Discover a wide range of activities, events, and entertainment designed for fun, relaxation, and creativity — all at N Farms.
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
