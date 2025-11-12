import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseServer.js";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * Availability API
 * - Works with plain YYYY-MM-DD dates
 * - Allows same-day turnaround (checkout 11 AM → next check-in 12 PM)
 * - Returns list of blocked (unavailable) dates
 */
export async function GET(req) {
  try {
    const url = new URL(req.url);
    const from = url.searchParams.get("from");
    const to = url.searchParams.get("to");

    if (!from || !to) {
      return NextResponse.json(
        { error: "Missing ?from or ?to query params" },
        { status: 400 }
      );
    }

    // ✅ Fixed hours for internal comparison only
    const CHECK_IN_HOUR = 12;  // 12 PM
    const CHECK_OUT_HOUR = 11; // 11 AM

    // Parse date range
    const rangeStart = new Date(`${from}T${CHECK_IN_HOUR}:00:00+05:30`);
    const rangeEnd = new Date(`${to}T${CHECK_OUT_HOUR}:00:00+05:30`);

    // Fetch all bookings
    const { data: bookings, error } = await supabaseAdmin
      .from("bookings")
      .select("check_in, check_out, payment_status");

    if (error) throw error;

    // Track blocked dates
    const blocked = new Set();

    for (const booking of bookings ?? []) {
      const { check_in, check_out, payment_status } = booking;

      // Only consider confirmed or pending bookings
      if (!check_in || !check_out) continue;
      if (!["paid", "pending"].includes(payment_status)) continue;

      const checkIn = new Date(`${check_in}T${CHECK_IN_HOUR}:00:00+05:30`);
      const checkOut = new Date(`${check_out}T${CHECK_OUT_HOUR}:00:00+05:30`);

      // Ignore bookings completely outside requested range
      if (checkOut <= rangeStart || checkIn >= rangeEnd) continue;

      // 🧠 To allow same-day turnaround, end one minute before next day
      const safeCheckOut = new Date(checkOut.getTime() - 60 * 1000);

      // Add each booked day into blocked set
      const cur = new Date(checkIn);
      while (cur <= safeCheckOut) {
        blocked.add(cur.toISOString().slice(0, 10)); // YYYY-MM-DD
        cur.setDate(cur.getDate() + 1);
      }
    }

    const blockedDates = Array.from(blocked).sort();

    return NextResponse.json({ blockedDates });
  } catch (err) {
    console.error("❌ Availability API error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
