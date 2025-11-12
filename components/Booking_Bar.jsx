'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from '@/components/ui/button';
import { ChevronDown, CheckCircle2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use_toast';

/* =================== HOOK: Load Blocked Dates =================== */
function useBlockedDates() {
  const [blocked, setBlocked] = useState([]);

  const reloadBlockedDates = async () => {
    try {
      const from = new Date().toISOString().slice(0, 10);
      const to = new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)
        .toISOString()
        .slice(0, 10);
      const res = await fetch(`/api/availability?from=${from}&to=${to}`);
      if (res.ok) {
        const json = await res.json();
        setBlocked(json.blockedDates || []);
      }
    } catch (err) {
      console.error('Availability fetch error:', err);
    }
  };

  useEffect(() => {
    reloadBlockedDates();
  }, []);

  return { blocked, reloadBlockedDates };
}

/* =================== BOOKING HANDLER =================== */
async function createBookingRazorpay({
  checkIn,
  checkOut,
  adults,
  children,
  name,
  email,
  phone,
  toast,
  setBookingSummary,
  setPaymentLoading,
}) {
  if (!checkIn || !checkOut) {
    toast?.({
      variant: "destructive",
      title: "Missing Dates",
      description: "Select check-in and check-out dates.",
    });
    return;
  }

  // STEP 1️⃣: Skip pre-check — backend will handle date conflicts

  // STEP 2️⃣: Proceed to Razorpay order
  const nights = Math.ceil(
    (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
  );
  const ratePerNight = 14000;
  const amount = nights * ratePerNight * 100;

  const orderRes = await fetch("/api/razorpay/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount, currency: "INR" }),
  });

  const { order, error } = await orderRes.json();
  if (!order) {
    toast?.({
      variant: "destructive",
      title: "Payment Init Failed",
      description: error || "Try again later.",
    });
    return;
  }

  // STEP 3️⃣: Load Razorpay SDK if not loaded
  if (typeof window !== "undefined" && !window.Razorpay) {
    await new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "https://checkout.razorpay.com/v1/checkout.js";
      s.onload = resolve;
      s.onerror = reject;
      document.body.appendChild(s);
    });
  }

  // ✅ STEP 4️⃣: Open Razorpay Checkout
  const razorpayKey =
    typeof window !== "undefined"
      ? window.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
      : process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

  if (!razorpayKey) {
    toast?.({
      variant: "destructive",
      title: "Configuration Error",
      description: "Razorpay key not found. Contact site admin.",
    });
    return;
  }

  const options = {
    key: razorpayKey,
    amount: order.amount,
    currency: order.currency,
    name: "Nfarms Staycation",
    description: `Booking for ${nights} nights`,
    order_id: order.id,
    prefill: { name, email, contact: phone },
    theme: { color: "#16a34a" },

    handler: async function (response) {
      setPaymentLoading(true);
      try {
        const payload = {
          name,
          email,
          phone,
          checkIn: checkIn.toISOString().slice(0, 10), // send only "YYYY-MM-DD"
          checkOut: checkOut.toISOString().slice(0, 10),
          adults,
          children,
          amount,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        };

        const bookRes = await fetch("/api/booking", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const bookJson = await bookRes.json();

        if (bookJson?.booking) {
          toast?.({
            title: "Booking Confirmed 🎉",
            description: "We’ve emailed your confirmation.",
          });
          setBookingSummary({
            name,
            email,
            phone,
            checkIn,
            checkOut,
            adults,
            children,
            amount,
            nights,
            orderId: bookJson.booking.order_id,
          });
        } else if (bookRes.status === 409) {
          toast?.({
            variant: "destructive",
            title: "Date Unavailable",
            description:
              "Those dates are already booked. Please choose different ones.",
          });
        } else {
          toast?.({
            variant: "destructive",
            title: "Booking Failed",
            description: bookJson?.error || "Unknown error",
          });
        }
      } catch (err) {
        console.error("Booking save error:", err);
        toast?.({
          variant: "destructive",
          title: "Error",
          description: "Failed to finalize your booking.",
        });
      } finally {
        setPaymentLoading(false);
      }
    },

    modal: {
      ondismiss: function () {
        toast?.({
          title: "Payment Cancelled",
          description: "You closed the payment window.",
        });
      },
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
}


/* =================== BOOKING SUMMARY MODAL =================== */
function BookingSummaryModal({ summary, onClose, reloadBlockedDates }) {
  if (!summary) return null;
  const { name, email, phone, checkIn, checkOut, adults, children, amount, nights, orderId } =
    summary;

  return (
    <Dialog open={!!summary} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-green-600">
            <CheckCircle2 className="w-6 h-6" /> Booking Confirmed
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3 text-gray-800">
          <p>
            Thank you, <strong>{name}</strong>! Your stay is confirmed.
          </p>
          <ul className="space-y-1 text-sm">
            <li>
              📅 <strong>{nights}</strong> nights: {new Date(checkIn).toLocaleDateString()} →{' '}
              {new Date(checkOut).toLocaleDateString()}
            </li>
            <li>
              👨‍👩‍👧 {adults} adults, {children} children
            </li>
            <li>💰 ₹{(amount / 100).toFixed(2)}</li>
            <li>📧 {email}</li>
            <li>📞 {phone}</li>
            <li>🧾 Order ID: {orderId}</li>
          </ul>
          
          <Button
            onClick={async () => {
              await reloadBlockedDates(); // 🔁 Refresh blocked dates dynamically
              onClose();
            }}
            className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white"
          >
            Close
          </Button>

        </div>
      </DialogContent>
    </Dialog>
  );
}

/* =================== DESKTOP BOOKING BAR =================== */
function DesktopBookingBar({
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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const { toast, ToastView } = useToast();
  const [bookingSummary, setBookingSummary] = useState(null);
const { blocked: blockedDates, reloadBlockedDates } = useBlockedDates();


  const isBlocked = (date) => {
    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 10);
    return blockedDates.includes(local);
  };

  const nights =
    checkIn && checkOut
      ? Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
      : 0;
  const total = nights * 14000;

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
            <div className="bg-green-700/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-green-600/40 px-6 py-5 flex items-center gap-4 justify-between">
              {/* Date Inputs */}
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <label className="text-white text-xs mb-1">Check-in</label>
                  <DatePicker
                    selected={checkIn}
                    onChange={setCheckIn}
                    placeholderText="Select date"
                    minDate={new Date()}
                    filterDate={(d) => !isBlocked(d)}
                    className="w-[140px] bg-transparent border border-white/30 text-white rounded-md px-3 py-2 text-sm focus:outline-none"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-white text-xs mb-1">Check-out</label>
                  <DatePicker
                    selected={checkOut}
                    onChange={setCheckOut}
                    placeholderText="Check-out"
                    minDate={checkIn || new Date()}
                    filterDate={(d) => !isBlocked(d)}
                    className="w-[140px] bg-transparent border border-white/30 text-white rounded-md px-3 py-2 text-sm focus:outline-none"
                  />
                </div>

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

              {/* CTA */}
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

      {/* Dialog for Guest Details */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-md bg-white rounded-2xl shadow-xl p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-green-700">
              Guest Details
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-3 mt-2">
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
    setLoading(true);
    setOpenDialog(false);
    try {
      await createBookingRazorpay({
        checkIn,
        checkOut,
        adults,
        children,
        name,
        email,
        phone,
        toast,
        setBookingSummary,
        setPaymentLoading, // 🔥 controls overlay globally
      });
    } finally {
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

{/* ✅ Fullscreen payment loader overlay */}
{paymentLoading && (
  <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm text-white">
    <div className="w-12 h-12 border-t-4 border-white animate-spin rounded-full mb-3"></div>
    <p className="text-lg font-semibold">Finalizing Booking...</p>
  </div>
)}

          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Loader Overlay */}
      {paymentLoading && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm text-white">
          <div className="w-12 h-12 border-t-4 border-white animate-spin rounded-full mb-3"></div>
          <p className="text-lg font-semibold">Finalizing Booking...</p>
        </div>
      )}

      {/* Confirmation */}
      <BookingSummaryModal
  summary={bookingSummary}
  onClose={() => setBookingSummary(null)}
  reloadBlockedDates={reloadBlockedDates}
/>

      <ToastView />
    </>
  );
}

/* =================== EXPORT MAIN =================== */
export default function BookingBar(props) {
  return (
    <>
      <DesktopBookingBar {...props} />
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
            {/* You can add your MobileBookingBar variant here if needed */}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

