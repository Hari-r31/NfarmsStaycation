'use client';

import { Leaf, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  const footerLinks = {
    'Quick Links': ['Home', 'About Us', 'Amenities', 'Gallery', 'Blog', 'Contact'],
    'Our Services': ['Day Outings', 'Overnight Stays', 'Team Events', 'Family Reunions', 'Photo Sessions', 'Custom Packages'],
    'Resources': ['Booking Policy', 'Location Guide', 'FAQs', 'Testimonials', 'Gallery', 'Contact'],
  };

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: '#', label: 'Facebook' },
    { icon: <Instagram className="w-5 h-5" />, href: '#', label: 'Instagram' },
    { icon: <Twitter className="w-5 h-5" />, href: '#', label: 'Twitter' },
    { icon: <Youtube className="w-5 h-5" />, href: '#', label: 'YouTube' },
  ];

  return (
    <footer id="footer" className="bg-green-900 text-white">
      
      {/* Main Footer */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                  <Leaf className="w-7 h-7 text-white" />
                </div>
                <span className="text-3xl font-bold">N Farms</span>
              </div>
              <p className="text-green-200 mb-6 max-w-sm">
                A serene farmstay resort in Moinabad, perfect for team outings, family reunions, and romantic getaways. Experience nature meets luxury.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                  <span className="text-green-200">17E/1, Moinabad, Nazeeb Nagar Village, Moinabad, Telangana - 501504, India</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <a href="tel:+919393935050" className="text-green-200 hover:text-white transition-colors">+91 93939 35050</a>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <a href="mailto:contact@nfarms.in" className="text-green-200 hover:text-white transition-colors">contact@nfarms.in</a>
                </div>
              </div>
            </div>

            {/* Links Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-lg font-bold mb-4">{title}</h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-green-200 hover:text-white transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-green-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-green-200 text-sm">
                © 2025 N Farms. All rights reserved. Where nature meets luxury.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-green-800 hover:bg-green-700 rounded-full flex items-center justify-center transition-colors"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
