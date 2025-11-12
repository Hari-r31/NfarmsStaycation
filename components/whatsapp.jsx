'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingBackToTopButton() {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // ✅ Detect desktop (client-side only)
  useEffect(() => {
    const checkDevice = () => {
      setIsDesktop(window.innerWidth >= 1024); // 1024px breakpoint for "lg" screens
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // ✅ Show button after scrolling down (only if desktop)
  useEffect(() => {
    if (!isDesktop) return;

    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDesktop]);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 🚫 If not desktop, don't render anything
  if (!isDesktop) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="back-to-top"
          className="fixed bottom-14 right-6 z-[9999] flex items-end justify-end"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.4 }}
        >
          {/* 🌈 Soft Glow Aura */}
          <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-green-400 to-emerald-600 opacity-30 animate-pulse pointer-events-none" />

          {/* ⬆️ Shaking Button */}
          <motion.button
            onClick={handleScrollTop}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              x: [0, -4, 4, -4, 4, 0],
            }}
            transition={{
              duration: 0.6,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatDelay: 7, // shakes every 7s
            }}
            className="relative flex items-center justify-center gap-2 rounded-full
                       bg-gradient-to-br from-green-500 via-emerald-500 to-green-700
                       text-white font-semibold shadow-[0_0_25px_rgba(16,185,129,0.4)]
                       px-5 py-3 transition-all duration-300 group overflow-hidden"
          >
            {/* Icon */}
            <motion.div
              animate={{
                rotate: hovered ? -10 : 0,
                scale: hovered ? 1.2 : 1,
              }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-full bg-white/10 blur-sm"></div>
              <ArrowUp className="w-5 h-5 text-white relative z-10" />
            </motion.div>

            {/* 🧠 Expandable Text */}
            <AnimatePresence>
              {hovered && (
                <motion.span
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 'auto', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden text-sm font-medium whitespace-nowrap"
                >
                  Back to Top
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
