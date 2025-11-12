// BookingBar.jsx 
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { DesktopBookingBar } from '@/components/Booking_Bar/DesktopBookingBar';
import { MobileBookingBar } from '@/components/Booking_Bar/MobileBookingBar'; // ✅ Import added

/* =================== EXPORT MAIN =================== */
export default function BookingBar(props) {
  return (
    <>
      {/* ===== Desktop View ===== */}
      <DesktopBookingBar {...props} />

      {/* ===== Mobile View ===== */}
      <AnimatePresence>
        {!props.mobileOpen && (
          <motion.div
            key="mobile-booking"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed bottom-0 left-0 w-full z-[50]"
          >
            <MobileBookingBar {...props} /> {/* ✅ Inserted mobile booking version */}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
