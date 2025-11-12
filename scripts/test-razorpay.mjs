// Run with: node --env-file=.env scripts/test-razorpay.mjs
import fetch from "node-fetch";

const amount = 50000; // ₹500.00
const currency = "INR";
const notes = { test: "true" };

async function testRazorpay() {
  console.log("🔗 Testing Razorpay order creation...");

  const res = await fetch("http://localhost:3000/api/razorpay/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount, currency, notes }),
  });

  const json = await res.json();
  console.log("📦 Response:");
  console.log(JSON.stringify(json, null, 2));

  if (json.order?.id) {
    console.log(`✅ Order created successfully: ${json.order.id}`);
  } else {
    console.error("❌ Order creation failed:", json.error);
  }
}

testRazorpay().catch(console.error);
