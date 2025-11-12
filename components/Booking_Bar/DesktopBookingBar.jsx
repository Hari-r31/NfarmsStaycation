'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use_toast';
import { useBlockedDates } from './useBlockedDates';
import { createBookingRazorpay } from './createBookingRazorpay';
import { BookingSummaryModal } from './BookingSummaryModal';

export function DesktopBookingBar({
  scrollDir,
  checkIn,
  setCheckIn,
  checkOut,
  setCheckOut,
  adults,
  setAdults,
  children,
  setChildren,
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [hoverDate, setHoverDate] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const { toast, ToastView } = useToast();
  const [bookingSummary, setBookingSummary] = useState(null);
  const { blocked: blockedDates, reloadBlockedDates, loading: blockedLoading } = useBlockedDates();
    const [redirecting, setRedirecting] = useState(false);

  // ✅ Normalize date safely
  const normalizeDate = (date) => {
    if (!date) return null;
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 10);
  };

  // ✅ Check if date is blocked
  const isBlocked = (date) => {
    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 10);
    return blockedDates.includes(local);
  };

  // ✅ Day styling (hover + dotted checkout hint)
  const dayClassName = (date) => {
    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 10);

    // Blocked days (unavailable)
    if (isBlocked(date)) return 'opacity-40 cursor-not-allowed';

    // ✅ Dotted border style: allowed checkout-on-blocked (gray outline)
    const prev = new Date(date.getTime() - 1000 * 60 * 60 * 24);
    const isoPrev = new Date(prev.getTime() - prev.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 10);
    if (blockedDates.includes(local) && !blockedDates.includes(isoPrev)) {
      return 'border border-dotted border-gray-400 text-white rounded-full';
    }

    // Selected range styling
    if (checkIn && checkOut && date >= checkIn && date <= checkOut) {
      if (
        date.toDateString() === checkIn.toDateString() ||
        date.toDateString() === checkOut.toDateString()
      ) {
        return 'bg-green-800 text-white font-semibold rounded-full';
      }
      return 'bg-green-600 text-white';
    }

    // 🟢 Hover preview — clipped before first blocked date
    if (checkIn && !checkOut && hoverDate && date > checkIn) {
      let lastAllowed = new Date(checkIn);
      while (lastAllowed < hoverDate) {
        lastAllowed.setDate(lastAllowed.getDate() + 1);
        const iso = new Date(lastAllowed.getTime() - lastAllowed.getTimezoneOffset() * 60000)
          .toISOString()
          .slice(0, 10);
        if (blockedDates.includes(iso)) {
          lastAllowed.setDate(lastAllowed.getDate() - 1);
          break;
        }
      }
      if (date <= lastAllowed) return 'bg-green-500/40 text-white';
    }

    return '';
  };

  // ✅ Calculate nights and total
  const nights =
    checkIn && checkOut
      ? Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
      : 0;
  const total = nights * 14000;

  // ✅ Auto-revalidate when new blocked dates arrive
  useEffect(() => {
    if (!checkIn || !checkOut || blockedDates.length === 0) return;

    let invalid = false;
    const current = new Date(checkIn);
    while (current <= checkOut) {
      const iso = new Date(current.getTime() - current.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 10);
      if (blockedDates.includes(iso)) {
        invalid = true;
        break;
      }
      current.setDate(current.getDate() + 1);
    }

    if (invalid) {
      toast?.({
        variant: 'destructive',
        title: 'Dates Updated',
        description:
          'Some of your previously selected dates just got booked. Your range was adjusted automatically.',
      });
      setCheckOut(new Date(current.getTime() - 1000 * 60 * 60 * 24));
    }
  }, [blockedDates]);

  return (
    <>
      <AnimatePresence>
        {scrollDir === 'down' && (
          <motion.div
            key="desktop-booking"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="hidden md:block fixed bottom-6 left-[22%] -translate-x-1/2 z-50 w-[60%] max-w-5xl"
          >
            <div className="relative bg-green-700/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-green-600/40 px-6 py-5 flex items-center gap-4 justify-between">
              
              {/* ===== Availability Loader Overlay ===== */}
              {blockedLoading && (
                <div className="absolute inset-0 bg-black/30 backdrop-blur-sm rounded-2xl flex items-center justify-center z-20">
                  <div className="flex flex-col items-center text-white">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mb-2"></div>
                    <p className="text-xs">Fetching latest availability...</p>
                  </div>
                </div>
              )}

              {/* ===== Date Inputs ===== */}
              <div className="flex items-center gap-3">
                {/* Check-in */}
                <div className="flex flex-col">
                  <label className="text-white text-xs mb-1">Check-in</label>
                  <DatePicker
                    selected={checkIn}
                    onChange={(date) => {
                      setCheckIn(date);

                      if (!checkOut || checkOut <= date) {
                        const nextDay = new Date(date.getTime() + 1000 * 60 * 60 * 24);
                        setCheckOut(nextDay);
                        return;
                      }

                      // Revalidate existing checkout after new check-in
                      let conflict = false;
                      const current = new Date(date);
                      while (current <= checkOut) {
                        const iso = new Date(current.getTime() - current.getTimezoneOffset() * 60000)
                          .toISOString()
                          .slice(0, 10);
                        if (blockedDates.includes(iso)) {
                          conflict = true;
                          break;
                        }
                        current.setDate(current.getDate() + 1);
                      }

                      if (conflict) {
                        toast?.({
                          variant: 'destructive',
                          title: 'Unavailable Range Adjusted',
                          description:
                            'Your new check-in overlaps blocked dates. Checkout has been adjusted to the last available date before the blocked range.',
                        });
                        setCheckOut(new Date(current.getTime() - 1000 * 60 * 60 * 24));
                      }
                    }}
                    selectsStart
                    startDate={checkIn}
                    endDate={checkOut}
                    placeholderText="Select date"
                    minDate={new Date()}
                    filterDate={(d) => !isBlocked(d)}
                    dayClassName={dayClassName}
                    className="w-[140px] bg-transparent border border-white/30 text-white rounded-md px-3 py-2 text-sm focus:outline-none"
                  />
                </div>

                {/* Check-out */}
                <div className="flex flex-col">
                  <label className="text-white text-xs mb-1">Check-out</label>
                  <DatePicker
                    selected={checkOut}
                    onChange={(date) => {
                      if (!checkIn) return;

                      // ✅ Allow selecting blocked checkout if it's right after last free date
                      let conflict = false;
                      const current = new Date(checkIn);

                      while (current < date) {
                        const iso = new Date(current.getTime() - current.getTimezoneOffset() * 60000)
                          .toISOString()
                          .slice(0, 10);

                        if (blockedDates.includes(iso)) {
                          conflict = true;
                          break;
                        }
                        current.setDate(current.getDate() + 1);
                      }

                      if (conflict) {
                        toast?.({
                          variant: 'destructive',
                          title: 'Unavailable Range Adjusted',
                          description:
                            'Your checkout has been adjusted to the last available date before the blocked range.',
                        });
                        setCheckOut(new Date(current.getTime()));
                        return;
                      }

                      setCheckOut(date);
                    }}
                    selectsEnd
                    startDate={checkIn}
                    endDate={checkOut}
                    placeholderText="Check-out"
                    minDate={checkIn ? new Date(checkIn.getTime() + 1000 * 60 * 60 * 24) : new Date()}
                    filterDate={(d) => {
                      const prev = new Date(d.getTime() - 1000 * 60 * 60 * 24);
                      const isoPrev = new Date(prev.getTime() - prev.getTimezoneOffset() * 60000)
                        .toISOString()
                        .slice(0, 10);
                      const isoCurr = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
                        .toISOString()
                        .slice(0, 10);

                      if (blockedDates.includes(isoCurr) && !blockedDates.includes(isoPrev)) {
                        return true; // ✅ allowed checkout
                      }

                      if (isBlocked(d)) return false;
                      if (checkIn && d <= checkIn) return false;
                      return true;
                    }}
                    onDayMouseEnter={(date) => setHoverDate(date)}
                    onDayMouseLeave={() => setHoverDate(null)}
                    dayClassName={dayClassName}
                    className="w-[140px] bg-transparent border border-white/30 text-white rounded-md px-3 py-2 text-sm focus:outline-none"
                  />
                </div>

                {/* Adults */}
                <div className="flex flex-col">
                  <label className="text-white text-xs mb-1">Adults</label>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="w-[90px] bg-transparent border border-white/30 text-white rounded-md px-3 py-2 text-sm focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                      <option key={n} value={n} className="text-gray-900">
                        {n}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Children */}
                <div className="flex flex-col">
                  <label className="text-white text-xs mb-1">Children</label>
                  <select
                    value={children}
                    onChange={(e) => setChildren(Number(e.target.value))}
                    className="w-[90px] bg-transparent border border-white/30 text-white rounded-md px-3 py-2 text-sm focus:outline-none"
                  >
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                      <option key={n} value={n} className="text-gray-900">
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* ===== CTA ===== */}
              <div className="flex flex-col items-end">
                {nights > 0 && (
                  <p className="text-white text-sm mb-2">
                    Total: <strong>₹{total}</strong> for {nights} nights
                  </p>
                )}
                <Button
                  onClick={() => setOpenDialog(true)}
                  className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-5 py-3 font-semibold shadow-md transition-all"
                >
                  Book your Stay
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== Guest Details Dialog ===== */}
<Dialog open={openDialog} onOpenChange={setOpenDialog}>
  <DialogContent className="max-w-md bg-white rounded-2xl shadow-xl p-6">
    <DialogHeader>
      <DialogTitle className="text-lg font-semibold text-green-700">
        Guest Details
      </DialogTitle>
    </DialogHeader>

    <div className="flex flex-col gap-3 mt-2">
      {/* === Info Banner === */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-green-50 border border-green-200 rounded-lg p-3 mb-1"
      >
        <p className="text-sm text-green-800 font-medium">
          ✍️ Please enter your correct contact details.
        </p>
        <p className="text-xs text-green-700 mt-1 leading-snug">
          These details will be used for booking confirmation, receipts, and important updates
          about your stay. A confirmation email will be sent to this address.
        </p>
      </motion.div>

      {/* === Input Fields === */}
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-green-600"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-green-600"
      />
      <input
        type="tel"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-green-600"
      />

      <div className="text-sm text-gray-600 mt-3">
        🏡 <strong>{nights}</strong> nights from{' '}
        {checkIn?.toLocaleDateString()} to {checkOut?.toLocaleDateString()} <br />
        💰 Total: <strong>₹{total}</strong>
      </div>

      <Button
  disabled={loading || paymentLoading}
  onClick={async () => {
    // ✅ Basic date validation
    if (!checkIn || !checkOut) {
      toast?.({
        variant: 'destructive',
        title: 'Missing Dates',
        description: 'Please select check-in and check-out dates.',
      });
      return;
    }
    if (checkOut <= checkIn) {
      toast?.({
        variant: 'destructive',
        title: 'Invalid Dates',
        description: 'Check-out date must be after check-in date.',
      });
      return;
    }

    // ✅ Guest details validation
    if (!name.trim() || !email.trim() || !phone.trim()) {
      toast?.({
        variant: 'destructive',
        title: 'Incomplete Details',
        description: 'Please fill in your name, email, and phone number.',
      });
      return;
    }

    // ✅ Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast?.({
        variant: 'destructive',
        title: 'Invalid Email',
        description: 'Please enter a valid email address.',
      });
      return;
    }

    // ✅ Phone format validation
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      toast?.({
        variant: 'destructive',
        title: 'Invalid Phone Number',
        description: 'Phone number should contain 10–15 digits.',
      });
      return;
    }

    // ✅ Trigger redirect spinner
    setLoading(true);
    setRedirecting(true);
    setOpenDialog(false);

    try {
      await createBookingRazorpay({
        checkIn: normalizeDate(checkIn),
        checkOut: normalizeDate(checkOut),
        adults,
        children,
        name,
        email,
        phone,
        toast,
        setBookingSummary,
        setPaymentLoading,
      });
    } catch (err) {
      toast?.({
        variant: 'destructive',
        title: 'Payment Failed',
        description: 'Something went wrong while redirecting to payment.',
      });
    } finally {
      // hide redirect spinner gracefully
      setTimeout(() => setRedirecting(false), 1500);
      setLoading(false);
    }
  }}
  className={`mt-4 w-full text-white font-semibold ${
    loading || paymentLoading
      ? 'bg-green-400 cursor-wait'
      : 'bg-green-600 hover:bg-green-700'
  }`}
>
  {loading || paymentLoading ? 'Processing Payment...' : 'Proceed to Payment'}
</Button>
    </div>
  </DialogContent>
</Dialog>
      {redirecting && (
              <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm text-white">
                <div className="w-12 h-12 border-t-4 border-white animate-spin rounded-full mb-3"></div>
                <p className="text-lg font-semibold animate-pulse">Redirecting to payment page...</p>

              </div>
            )}

      {/* ===== Payment Loader Overlay ===== */}
      {paymentLoading && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm text-white">
          <div className="w-12 h-12 border-t-4 border-white animate-spin rounded-full mb-3"></div>
          <p className="text-lg font-semibold">Finalizing Booking...</p>
        </div>
      )}

      {/* ===== Booking Summary Modal ===== */}
      <BookingSummaryModal
        summary={bookingSummary}
        onClose={() => setBookingSummary(null)}
        reloadBlockedDates={reloadBlockedDates}
      />

      <ToastView />
    </>
  );
}
