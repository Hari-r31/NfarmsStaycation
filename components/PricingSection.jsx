'use client';

import { Check, Star } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const PricingSection = () => {
  const plans = [
    {
      name: 'Day Outing',
      price: 'Custom',
      period: 'per group',
      badge: 'Popular',
      description: 'Perfect for day visits with family or friends',
      features: [
        'Full day access to resort',
        'Swimming pool access',
        'Indoor games & activities',
        'Scenic photo opportunities',
        'BBQ setup available',
        'Parking included',
      ],
      image: 'https://images.unsplash.com/photo-1564417947365-8dbc9d0e718e?q=80&w=600',
    },
    {
      name: 'Overnight Stay',
      price: 'Custom',
      period: 'per night',
      badge: 'Best Value',
      description: 'Complete farmstay experience with accommodation',
      features: [
        'Comfortable rooms/villas',
        'All day outing benefits',
        'Farm-to-table meals',
        'Evening bonfire access',
        'Complimentary breakfast',
        'Late checkout available',
        'Up to 20 guests',
      ],
      image: 'https://images.unsplash.com/photo-1650877173813-b809c3f03281?q=80&w=600',
      featured: true,
    },
    {
      name: 'Team Outings',
      price: 'Custom',
      period: 'per event',
      badge: 'Corporate',
      description: 'Ideal for corporate team building & events',
      features: [
        'Exclusive resort access',
        'Team building activities',
        'Conference space available',
        'Customized meal plans',
        'Event coordination support',
        'Audio-visual equipment',
        'Photography services',
        'Flexible timing',
      ],
      image: 'https://images.unsplash.com/photo-1505611202014-8c9470f8d068?q=80&w=600',
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-green-600 font-semibold mb-2">Flexible Options</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Booking Packages
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Choose the perfect package for your getaway. Contact us for custom pricing and special group rates.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative overflow-hidden hover:shadow-2xl transition-all duration-300 ${
                plan.featured ? 'ring-2 ring-green-600 scale-105' : ''
              }`}
            >
              {/* Image Header */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={plan.image}
                  alt={plan.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <Badge className="absolute top-4 right-4 bg-green-600 text-white">
                  {plan.badge}
                </Badge>
                {plan.featured && (
                  <div className="absolute top-4 left-4 flex items-center space-x-1 bg-white px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold">Recommended</span>
                  </div>
                )}
              </div>

              <CardHeader className="text-center pt-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center space-x-2">
                  <span className="text-4xl font-bold text-green-600">{plan.price}</span>
                  <span className="text-gray-500">/ {plan.period}</span>
                </div>
              </CardHeader>

              <CardContent className="pb-8">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${
                    plan.featured
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-white text-green-600 border-2 border-green-600 hover:bg-green-50'
                  }`}
                  onClick={() => window.open('http://wa.me/+919393935050', '_blank')}
                >
                  Contact Us
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* WhatsApp Contact */}
        <div className="text-center mt-12">
          <p className="text-gray-600 text-lg mb-4">
            Need a custom package? Contact us on WhatsApp
          </p>
          <Button 
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg"
            onClick={() => window.open('http://wa.me/+919393935050', '_blank')}
          >
            Chat on WhatsApp: +91 93939 35050
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
