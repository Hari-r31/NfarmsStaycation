import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseServer";

export async function GET(req) {
  try {
    console.log("🧠 Fetching daily availability...");

    // Extract query params
    const url = new URL(req.url);
    const from = url.searchParams.get("from");
    const to = url.searchParams.get("to");

    if (!from || !to) {
      return NextResponse.json(
        { error: "Missing 'from' or 'to' query parameters" },
        { status: 400 }
      );
    }

    // Query Supabase for existing bookings overlapping the date range
    const { data: bookings, error } = await supabaseAdmin
      .from("bookings")
      .select("check_in, check_out")
      .gte("check_out", from)
      .lte("check_in", to);

    if (error) {
      console.error("❌ Supabase query error:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    // Build set of blocked dates
    const blocked = new Set();
    for (const b of bookings || []) {
      let cur = new Date(b.check_in);
      const end = new Date(b.check_out);
      while (cur < end) {
        blocked.add(cur.toISOString().slice(0, 10));
        cur.setDate(cur.getDate() + 1);
      }
    }

    // Build array of all days in range with status
    const daily = [];
    let current = new Date(from);
    const end = new Date(to);

    while (current <= end) {
      const dateStr = current.toISOString().slice(0, 10);
      daily.push({
        date: dateStr,
        available: !blocked.has(dateStr),
      });
      current.setDate(current.getDate() + 1);
    }

    console.log(`✅ Generated ${daily.length} day statuses`);
    return NextResponse.json({
      success: true,
      from,
      to,
      total_days: daily.length,
      data: daily,
    });
  } catch (err) {
    console.error("❌ Supabase availability check failed:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
