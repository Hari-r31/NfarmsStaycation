'use client';

import {
  Leaf,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Youtube,
  Star,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const Footer = () => {
  // Updated footer navigation
  const footerLinks = {
    'Quick Links': [
      { label: 'Home', href: '#hero' },
      { label: 'About Us', href: '#about' },
      { label: 'Services', href: '#services' },
      { label: 'Gallery', href: '#gallery' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Contact', href: '#footer' },
    ],
    'Our Services': [
      { label: 'Day Outings', href: '#services' },
      { label: 'Overnight Stays', href: '#services' },
      { label: 'Team Events', href: '#services' },
      { label: 'Family Reunions', href: '#services' },
      { label: 'Photo Sessions', href: '#services' },
      { label: 'Custom Packages', href: '#services' },
    ],
    'Resources': [
      { label: 'FAQs', href: '#faq' },
      { label: 'Testimonials', href: '#testimonials' },
      { label: 'Booking Policy', href: '#pricing' },
      { label: 'Terms & Conditions', href: '/legal/terms' },
      { label: 'Privacy Policy', href: '/legal/privacy' },
      { label: 'Cancellation & Refund Policy', href: '/legal/refund' },
    ],
  };

  const socialLinks = [
    {
      icon: <Instagram className="w-5 h-5" />,
      href: 'https://www.instagram.com/nfarms.hyd/',
      label: 'Instagram',
      tooltip: 'Follow us on Instagram',
    },
    {
      icon: <Youtube className="w-5 h-5" />,
      href: 'https://www.youtube.com/channel/UCrH38KrDjXF_pGjPZxd0-jA',
      label: 'YouTube',
      tooltip: 'Watch us on YouTube',
    },
    {
      icon: <Star className="w-5 h-5" />,
      href: 'https://www.google.com/travel/search?ts=CAEaKwopEicyJTB4M2JjYmMxY2VkMDQ2ODczMToweGFkMjA0ODdmMzcyNjM5MjE&qs=CAEyFENnc0lvZktZdWZPUGtwQ3RBUkFCOAI&utm_campaign=sharing&utm_medium=link_btn&utm_source=htls',
      label: 'Google Reviews',
      tooltip: 'Check our Google Reviews',
    },
  ];

  return (
    <footer id="footer" className="bg-green-900 text-white relative overflow-hidden">
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
                A serene farmstay resort in Moinabad, perfect for team outings,
                family reunions, and romantic getaways. Experience nature meets
                luxury.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                  <span className="text-green-200">
                    17E/1, Moinabad, Nazeeb Nagar Village, Moinabad, Telangana -
                    501504, India
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <a
                    href="tel:+919393935050"
                    className="text-green-200 hover:text-white transition-colors"
                  >
                    +91 93939 35050
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <a
                    href="mailto:contact@nfarms.in"
                    className="text-green-200 hover:text-white transition-colors"
                  >
                    contact@nfarms.in
                  </a>
                </div>
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-lg font-bold mb-4">{title}</h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-green-200 hover:text-white transition-colors cursor-pointer"
                      >
                        {link.label}
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
              <p className="text-green-200 text-sm text-center md:text-left">
                © 2025 N Farms. All rights reserved. Where nature meets luxury.
              </p>

              {/* Social Links with Tooltip */}
              <div className="flex space-x-5 relative">
                {socialLinks.map((social, idx) => (
                  <SocialIcon key={idx} {...social} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* Tooltip-Enabled Icon Component */
const SocialIcon = ({ icon, href, label, tooltip }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative flex items-center justify-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="w-10 h-10 bg-green-800 hover:bg-green-700 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110"
      >
        {icon}
      </a>

      {hovered && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="absolute bottom-12 whitespace-nowrap bg-green-700 text-white text-xs font-medium px-3 py-1 rounded-md shadow-md"
        >
          {tooltip}
        </motion.span>
      )}
    </div>
  );
};

export default Footer;
