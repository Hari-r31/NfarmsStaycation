'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X, ChevronDown, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import CommandPalette from '@/components/ui/CommandPalette';
import BookingBar from '@/components/BookingBar';

export default function Navbar() {
  const [scrollDir, setScrollDir] = useState('up');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const { theme } = useTheme();
  const lastScrollY = useRef(0);
  const moreRef = useRef(null);
  const mobileRef = useRef(null);

  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const handleScroll = useCallback(() => {
    const current = window.scrollY;
    if (current > lastScrollY.current + 10) setScrollDir('down');
    else if (current < lastScrollY.current - 10) setScrollDir('up');
    lastScrollY.current = current;
    setMoreOpen(false);
    setMobileOpen(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        moreRef.current &&
        !moreRef.current.contains(e.target) &&
        mobileRef.current &&
        !mobileRef.current.contains(e.target)
      ) {
        setMoreOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const navLinks = [
    { name: 'Home', id: 'hero' },
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Pricing', id: 'pricing' },
    { name: 'FAQ', id: 'faq' },
    { name: 'Contact', id: 'footer' },
  ];

  const handleChatClick = () => {
    const message = encodeURIComponent("Hi 👋 I'd like to know more about your stays!");
    window.open(`https://wa.me/919393935050?text=${message}`, '_blank');
  };

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: scrollDir === 'down' ? -110 : 0 }}
        transition={{ duration: 0.38, ease: 'easeInOut' }}
        className="fixed top-0 z-50 w-full"
      >
        <nav
          className={`mx-4 sm:mx-auto max-w-7xl px-6 sm:px-9 rounded-full shadow-md backdrop-blur-md transition-colors flex items-center justify-between gap-4 mt-6 sm:mt-2
          ${scrollDir === 'down' ? 'bg-white/80 dark:bg-black/60' : 'bg-white/90 dark:bg-black/70'}`}
        >
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="/logo2_.png"
              alt="Nfarms Logo"
              className="w-24 h-24 object-contain scale-110 -my-2"
            />
          </div>

          {/* Center Command Palette */}
          <div className="hidden md:flex flex-1 justify-center px-4">
            <div className="relative w-full max-w-lg rounded-2xl bg-white/60 backdrop-blur-sm">
              <CommandPalette />
            </div>
          </div>

          {/* Desktop Buttons */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-4" ref={moreRef}>
              {/* Chat with Us (Desktop) */}
            </div>

            <Button    onClick={handleChatClick} className="hidden md:inline-block bg-green-600 hover:bg-green-700 text-white rounded-full px-4 py-2">
              Chat with Us
            </Button>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen((s) => !s)}
              className="md:hidden p-2 rounded-full text-green-600"
              aria-label="Toggle menu"
              ref={mobileRef}
            >
              {mobileOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </nav>

        {/* 🌿 Mobile Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setMobileOpen(false)}
                className="fixed inset-0 bg-black/50 backdrop-blur-md z-[9998]"
              />
              {/* Drawer Panel */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.4 }}
                className="fixed top-0 right-0 h-full w-[82%] sm:w-[360px] 
                           bg-white/15 backdrop-blur-2xl border-l border-green-400/20 
                           shadow-[0_0_40px_rgba(16,185,129,0.25)] 
                           z-[9999] flex flex-col rounded-l-2xl overflow-hidden"
              >
                {/* Header */}
                <div className="flex justify-between items-center px-6 py-5 border-b border-green-400/20 bg-white/5 backdrop-blur-sm">
                  <h2 className="text-2xl font-semibold tracking-tight text-white drop-shadow-sm">
                    Nfarms Staycation
                  </h2>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="text-white hover:text-green-900 transition-transform active:scale-95"
                  >
                    <X className="w-8 h-8 stroke-[2.4]" />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6">
                  {navLinks.map((link, idx) => (
                    <motion.button
                      key={link.id}
                      onClick={() => {
                        document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' });
                        setMobileOpen(false);
                      }}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * idx, duration: 0.25 }}
                      className="text-left text-[1.15rem] font-medium tracking-wide 
                                 text-white hover:text-green-900 transition-all 
                                 hover:scale-[1.03] active:scale-[0.98]"
                    >
                      {link.name}
                    </motion.button>
                  ))}
                </div>

                {/* Buttons */}
                <div className="px-6 py-6 border-t border-green-400/20 bg-white/10 backdrop-blur-sm flex flex-col gap-3">
                  <Button
                    onClick={handleChatClick}
                    className="w-full flex items-center justify-center gap-2 bg-green-600/80 hover:bg-green-700/90 
                               text-white text-[1rem] py-3 rounded-full font-semibold shadow-lg shadow-green-700/30 
                               transition-all duration-300"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Chat with Us
                  </Button>

                 <Button
  onClick={() => window.open('tel:919393935050')}
  className="w-full bg-green-500/70 hover:bg-green-600 
             text-white text-[1rem] py-3 rounded-full 
             font-semibold shadow-md shadow-green-700/20 
             transition-all duration-300"
>
  Call Us Now
</Button>

                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Booking Bars (both synced) */}
      <BookingBar
        scrollDir={scrollDir}
        checkIn={checkIn}
        setCheckIn={setCheckIn}
        checkOut={checkOut}
        setCheckOut={setCheckOut}
        adults={adults}
        setAdults={setAdults}
        children={children}
        setChildren={setChildren}
        mobileOpen={mobileOpen}
      />
    </>
  );
}
