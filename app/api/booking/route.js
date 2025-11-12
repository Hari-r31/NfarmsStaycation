import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabaseServer.js";
import {
  sendMail,
  bookingConfirmationHtmlForCustomer,
  bookingNotificationHtmlForAdmin,
} from "@/lib/mailer.js";

const RAZOR_SECRET = process.env.RAZORPAY_KEY_SECRET?.trim();
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

/* ----------------------------- Verify Razorpay Signature ----------------------------- */
function verifySignature(orderId, paymentId, signature) {
  try {
    const payload = `${orderId}|${paymentId}`;
    const expected = crypto
      .createHmac("sha256", RAZOR_SECRET)
      .update(payload)
      .digest("hex");
    const match = expected === signature;
    console.log("🧾 Signature verification →", { orderId, paymentId, match });
    return match;
  } catch (err) {
    console.error("❌ Signature verification failed:", err);
    return false;
  }
}

/* ----------------------------- Helper: Compute Updated Blocked Dates ----------------------------- */
async function getUpdatedBlockedDates() {
  const CHECK_IN_HOUR = 12;  // noon
  const CHECK_OUT_HOUR = 11; // morning

  function formatLocalDate(date) {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 10);
  }
  const today = formatLocalDate(new Date());
  const oneYearLater = formatLocalDate(new Date(Date.now() + 1000 * 60 * 60 * 24 * 365));



  const { data: bookings, error } = await supabaseAdmin
    .from("bookings")
    .select("check_in, check_out, payment_status");

  if (error) throw error;

  const blocked = new Set();

  for (const b of bookings ?? []) {
    if (!b.check_in || !b.check_out) continue;
    if (!["paid", "pending"].includes(b.payment_status)) continue;

    const checkIn = new Date(`${b.check_in}`);
    const checkOut = new Date(`${b.check_out}`);
    checkIn.setHours(CHECK_IN_HOUR, 0, 0, 0);
    checkOut.setHours(CHECK_OUT_HOUR, 0, 0, 0);

    const safeCheckOut = new Date(checkOut.getTime() - 60 * 1000);
    let cur = new Date(checkIn);

    while (cur <= safeCheckOut) {
      blocked.add(cur.toISOString().slice(0, 10)); // store YYYY-MM-DD
      cur.setDate(cur.getDate() + 1);
    }
  }

  const blockedDates = Array.from(blocked).sort();
  console.log("🚫 Updated Blocked Dates:", blockedDates);
  return blockedDates;
}

/* ----------------------------- POST /api/booking ----------------------------- */
export async function POST(req) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      checkIn,
      checkOut,
      adults,
      children,
      amount,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = body || {};

    if (!name || !email || !checkIn || !checkOut || !amount) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    console.log("📦 Booking Request:", {
      name,
      email,
      checkIn,
      checkOut,
      amount,
    });

    /* ----------------------------- STEP 1: Verify Payment ----------------------------- */
    let paymentStatus = "pending";
    if (razorpay_order_id && razorpay_payment_id && razorpay_signature) {
      const valid = verifySignature(
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
      );
      if (!valid) {
        return NextResponse.json(
          { error: "Invalid payment signature." },
          { status: 400 }
        );
      }
      paymentStatus = "paid";
    }

    /* ----------------------------- STEP 2: Insert Booking ----------------------------- */
    const CHECK_IN_HOUR = 12;
    const CHECK_OUT_HOUR = 11;

    // normalize to fixed hours (for safety, not hourly logic)
    const normalizedCheckIn = new Date(`${checkIn}T${CHECK_IN_HOUR}:00:00+05:30`);
    const normalizedCheckOut = new Date(`${checkOut}T${CHECK_OUT_HOUR}:00:00+05:30`);

    const { data: booking, error: dbError } = await supabaseAdmin
      .from("bookings")
      .insert([
        {
          name,
          email,
          phone,
          check_in: normalizedCheckIn.toISOString(),
          check_out: normalizedCheckOut.toISOString(),
          adults,
          children,
          amount,
          order_id: razorpay_order_id,
          payment_id: razorpay_payment_id,
          payment_status: paymentStatus,
        },
      ])
      .select()
      .single();

    if (dbError) throw dbError;
    console.log("✅ Booking inserted:", booking.id);

    /* ----------------------------- STEP 3: Send Emails ----------------------------- */
    const formattedCheckIn = new Date(checkIn).toLocaleDateString();
    const formattedCheckOut = new Date(checkOut).toLocaleDateString();

    const customerHtml = bookingConfirmationHtmlForCustomer({
      name,
      checkIn: formattedCheckIn,
      checkOut: formattedCheckOut,
      adults,
      children,
      amount,
      orderId: booking.order_id,
    });

    const adminHtml = bookingNotificationHtmlForAdmin({
      name,
      email,
      phone,
      checkIn: formattedCheckIn,
      checkOut: formattedCheckOut,
      adults,
      children,
      amount,
      orderId: booking.order_id,
      paymentStatus,
    });

    await Promise.allSettled([
      sendMail(email, "✅ Booking Confirmation — Nfarms Staycation", customerHtml),
      sendMail(ADMIN_EMAIL, "📦 New Booking Received — Nfarms", adminHtml),
    ]);

    console.log("📨 Confirmation emails sent successfully");

    /* ----------------------------- STEP 4: Return Updated Blocked Dates ----------------------------- */
    const blockedDates = await getUpdatedBlockedDates();

    return NextResponse.json({
      booking,
      blockedDates,
      message: "Booking confirmed successfully.",
    });
  } catch (err) {
    console.error("❌ Booking API Error:", err);
    return NextResponse.json(
      { error: err.message || "Internal server error." },
      { status: 500 }
    );
  }
}
