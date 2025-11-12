import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req) {
  try {
    // ✅ Check environment
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      console.error("❌ Razorpay environment variables missing");
      return NextResponse.json(
        { error: "Razorpay not configured" },
        { status: 500 }
      );
    }

    // ✅ Parse request body
    const { amount, currency = "INR", notes } = await req.json();
    if (!amount) {
      return NextResponse.json({ error: "Amount is required" }, { status: 400 });
    }

    // ✅ Initialize Razorpay
    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });

    // ✅ Create order
    const order = await razorpay.orders.create({
      amount,
      currency,
      payment_capture: true,
      receipt: `rcpt_${Date.now()}`,
      notes,
    });

    if (!order || !order.id) {
      throw new Error("Failed to create Razorpay order");
    }

    console.log("✅ Razorpay order created:", order.id);

    // ✅ Return order JSON
    return NextResponse.json({ order });
  } catch (err) {
    console.error("❌ Razorpay order error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
