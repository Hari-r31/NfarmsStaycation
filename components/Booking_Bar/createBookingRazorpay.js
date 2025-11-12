'use client';

export async function createBookingRazorpay({
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
  reloadBlockedDates, // ✅ added
}) {
  if (!checkIn || !checkOut) {
    toast?.({
      variant: "destructive",
      title: "Missing Dates",
      description: "Select check-in and check-out dates.",
    });
    return;
  }

  // ✅ Convert strings (YYYY-MM-DD) back to Date objects for calculations
  const checkInDate = new Date(`${checkIn}T12:00:00+05:30`);
  const checkOutDate = new Date(`${checkOut}T11:00:00+05:30`);

  const nights = Math.ceil(
    (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  const ratePerNight = 14000;
  const amount = nights * ratePerNight * 100; // Razorpay uses paise

  // ✅ Create Razorpay order
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

  // ✅ Load Razorpay SDK if not already present
  if (typeof window !== "undefined" && !window.Razorpay) {
    await new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "https://checkout.razorpay.com/v1/checkout.js";
      s.onload = resolve;
      s.onerror = reject;
      document.body.appendChild(s);
    });
  }

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

  // ✅ Razorpay payment configuration
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
          checkIn,
          checkOut,
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

          // ✅ Step 1: Immediately reload blocked dates
          if (typeof reloadBlockedDates === "function") {
            toast?.({
              title: "Updating Availability…",
              description: "Refreshing calendar with latest blocked dates.",
            });
            await reloadBlockedDates();
            toast?.({
              title: "Availability Updated ✅",
              description: "Your booking has been applied to the calendar.",
            });
          }

          // ✅ Step 2: Update booking summary modal
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
            description: "Those dates are already booked. Please choose different ones.",
          });
        } else {
          toast?.({
            variant: "destructive",
            title: "Booking Failed",
            description: bookJson?.error || "Unknown error occurred.",
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

  // ✅ Open Razorpay payment modal
  const rzp = new window.Razorpay(options);
  rzp.open();
}
