'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use_toast';
import { createBookingRazorpay } from './createBookingRazorpay';
import { BookingSummaryModal } from './BookingSummaryModal';
import { useBlockedDates } from './useBlockedDates';
import { ChevronDown } from 'lucide-react';

// 🗓 Helper: generate next 60 days
function generateNextDays(count = 60) {
  const days = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    days.push(date);
  }
  return days;
}

export function MobileBookingBar({
  checkIn,
  setCheckIn,
  checkOut,
  setCheckOut,
  adults,
  setAdults,
  children,
  setChildren,
}) {
  const [expanded, setExpanded] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [bookingSummary, setBookingSummary] = useState(null);
  const { toast, ToastView } = useToast();
  const { blocked: blockedDates, reloadBlockedDates } = useBlockedDates();
  const [redirecting, setRedirecting] = useState(false);


  const days = useMemo(() => generateNextDays(60), []);
  const normalizeDate = (date) => {
    if (!date) return null;
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 10);
  };
  const isBlocked = (date) => blockedDates.includes(normalizeDate(date));

  const nights =
    checkIn && checkOut
      ? Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
      : 0;
  const total = nights * 14000;

  // ✅ Handle date select logic
  const handleSelectDate = (date) => {
    if (!checkIn) {
      // First click → set check-in
      if (isBlocked(date)) {
        toast?.({
          variant: 'destructive',
          title: 'Unavailable Date',
          description: 'This date is blocked for check-in.',
        });
        return;
      }
      setCheckIn(date);
      return;
    }

    if (checkIn && !checkOut) {
      if (date <= checkIn) {
        toast?.({
          variant: 'destructive',
          title: 'Invalid Check-out',
          description: 'Check-out must be after check-in.',
        });
        return;
      }

      // Check if range includes a blocked date
      let current = new Date(checkIn);
      let valid = true;
      while (current < date) {
        const iso = normalizeDate(current);
        if (blockedDates.includes(iso)) {
          valid = false;
          break;
        }
        current.setDate(current.getDate() + 1);
      }

      if (!valid) {
        toast?.({
          variant: 'destructive',
          title: 'Blocked Dates Found',
          description: 'Selected range includes unavailable dates.',
        });
        return;
      }

      setCheckOut(date);
      return;
    }

    // If both set → reset and start again
    setCheckIn(date);
    setCheckOut(null);
  };

  // ✅ Style logic for day cell
  const getDayStyle = (date) => {
    const iso = normalizeDate(date);
    if (isBlocked(date)) return 'bg-red-200 text-red-700 cursor-not-allowed opacity-60';

    if (checkIn && !checkOut && date.toDateString() === checkIn.toDateString())
      return 'bg-green-800 text-white font-semibold';
    if (checkIn && checkOut && date >= checkIn && date <= checkOut)
      return 'bg-green-600 text-white';
    return 'bg-white/10 hover:bg-white/20 text-white';
  };

  return (
    <>
      {/* ===== Collapsible Booking Bar ===== */}
      <motion.div
        animate={{ height: expanded ? 'auto' : '56px' }}
        transition={{ duration: 0.32, ease: 'easeInOut' }}
        className="fixed bottom-0 left-0 w-full overflow-hidden bg-green-700 text-white rounded-t-2xl shadow-2xl z-[70]"
      >
        <div
          className="flex justify-between items-center px-4 py-3 bg-green-800 cursor-pointer select-none"
          onClick={() => setExpanded((prev) => !prev)}
        >
          <span className="font-semibold text-sm tracking-wide">
            {expanded ? 'Hide Booking' : 'Book Your Stay'}
          </span>
          <ChevronDown
            className={`w-5 h-5 transform transition-transform duration-300 ${
              expanded ? 'rotate-180' : ''
            }`}
          />
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              key="expanded-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="px-5 py-5 border-t border-white/20"
            >
              {/* Scrollable Date Selector */}
              <div className="flex flex-col mb-4">
                <label className="text-xs mb-2">Select Dates</label>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/20">
                  {days.map((date) => {
  const blocked = isBlocked(date);
  return (
    <button
      key={date.toISOString()}
      onClick={() => handleSelectDate(date)}
      disabled={blocked}
      className={`relative flex flex-col items-center justify-center min-w-[60px] px-2 py-2 rounded-lg text-xs transition-all ${getDayStyle(date)}`}
    >
      <span>{date.toLocaleString('default', { weekday: 'short' })}</span>
      <span className="text-sm font-semibold mb-2">{date.getDate()}</span>

      {blocked && (
        <span className="absolute bottom-0 text-[8px] text-red-800 font-semibold mb-1">
          Not Available
        </span>
      )}
    </button>
  );
})}

                </div>
                <div className="text-[11px] mt-1 text-white/80">
                  Tap once for Check-in, tap again for Check-out.
                </div>
              </div>

              {/* Guests */}
              <div className="flex justify-between gap-3 mb-3">
                <div className="flex flex-col flex-1">
                  <label className="text-xs mb-1">Adults</label>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="w-full bg-transparent border border-white/30 text-white rounded-md px-2 py-1 text-sm focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                      <option key={n} value={n} className="text-gray-900">
                        {n}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col flex-1">
                  <label className="text-xs mb-1">Children</label>
                  <select
                    value={children}
                    onChange={(e) => setChildren(Number(e.target.value))}
                    className="w-full bg-transparent border border-white/30 text-white rounded-md px-2 py-1 text-sm focus:outline-none"
                  >
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                      <option key={n} value={n} className="text-gray-900">
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price + CTA */}
              <div className="mt-2 text-center">
                {nights > 0 && (
                  <p className="text-xs mb-2 text-white/90">
                    💰 <strong>₹{total}</strong> for {nights} nights
                  </p>
                )}
                <Button
                  onClick={() => {
                    if (!checkIn || !checkOut) {
                      toast?.({
                        variant: 'destructive',
                        title: 'Select Dates',
                        description: 'Please select both check-in and check-out.',
                      });
                      return;
                    }
                    setOpenDialog(true);
                  }}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-lg py-2 font-semibold shadow-md transition-all"
                >
                  Continue to Guest Details
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ===== Guest Details Dialog ===== */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-md bg-white rounded-2xl shadow-xl p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-green-700">
              Guest Details
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-3 mt-2">
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-1">
              <p className="text-sm text-green-800 font-medium">
                ✍️ Please enter your correct contact details.
              </p>
              <p className="text-xs text-green-700 mt-1 leading-snug">
                These details will be used for booking confirmation, receipts, and updates.
              </p>
            </div>

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
    if (!checkIn || !checkOut) {
      toast?.({
        variant: 'destructive',
        title: 'Missing Dates',
        description: 'Please select valid dates before proceeding.',
      });
      return;
    }
    if (!name.trim() || !email.trim() || !phone.trim()) {
      toast?.({
        variant: 'destructive',
        title: 'Incomplete Details',
        description: 'Please fill in your name, email, and phone number.',
      });
      return;
    }

    setLoading(true);
    setRedirecting(true); // 👈 show spinner
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
      setExpanded(false);
    } finally {
      setLoading(false);
      setTimeout(() => setRedirecting(false), 2000); // 👈 remove spinner after ~2s
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


      {/* Payment Loader */}
      {paymentLoading && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm text-white">
          <div className="w-12 h-12 border-t-4 border-white animate-spin rounded-full mb-3"></div>
          <p className="text-lg font-semibold">Finalizing Booking...</p>
        </div>
      )}

      {/* Booking Summary */}
      <BookingSummaryModal
        summary={bookingSummary}
        onClose={() => setBookingSummary(null)}
        reloadBlockedDates={reloadBlockedDates}
      />

      <ToastView />
    </>
  );
}
