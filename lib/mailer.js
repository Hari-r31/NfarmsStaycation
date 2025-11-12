import nodemailer from "nodemailer";

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const FROM = process.env.FROM_NAME || EMAIL_USER;

if (!EMAIL_USER || !EMAIL_PASS) {
  console.warn("⚠️ EMAIL_USER or EMAIL_PASS not set — email sending will fail.");
}

// ✅ Configure Gmail transporter (can switch to any SMTP)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: EMAIL_USER, pass: EMAIL_PASS },
});

/**
 * Send an email
 * @param {string} to - Recipient email
 * @param {string} subject - Subject line
 * @param {string} html - HTML body content
 */
export async function sendMail(to, subject, html) {
  try {
    const info = await transporter.sendMail({ from: FROM, to, subject, html });
    console.log(`📧 Email sent to ${to}: ${info.messageId}`);
    return info;
  } catch (err) {
    console.error("❌ Email send error:", err);
  }
}

/* ======================================================
   🧾 CUSTOMER EMAIL TEMPLATE
   Sent to: Customer
   Purpose: Booking confirmation / receipt
====================================================== */
export function bookingConfirmationHtmlForCustomer({
  name,
  checkIn,
  checkOut,
  adults,
  children,
  amount,
  orderId,
}) {
  const formattedAmount = (amount / 100).toFixed(2);

  return `
  <div style="font-family: system-ui, -apple-system, sans-serif; color:#0f172a;">
    <h2 style="color:#16a34a;">🌿 Booking Confirmed — Nfarms Staycation</h2>
    <p>Hi <strong>${name}</strong>,</p>
    <p>We’re delighted to confirm your stay at <strong>Nfarms Staycation</strong>.</p>
    <ul style="line-height:1.6;">
      <li><strong>Check-in:</strong> ${checkIn}</li>
      <li><strong>Check-out:</strong> ${checkOut}</li>
      <li><strong>Guests:</strong> ${adults} adults, ${children} children</li>
      <li><strong>Amount Paid:</strong> ₹${formattedAmount}</li>
      ${orderId ? `<li><strong>Order ID:</strong> ${orderId}</li>` : ""}
    </ul>
    <p>We look forward to hosting you soon! 🌾</p>
    <p><strong>Warm regards,</strong><br/>The Nfarms Team</p>
  </div>
  `;
}

/* ======================================================
   🧾 ADMIN EMAIL TEMPLATE
   Sent to: Admin (you)
   Purpose: Notify about new booking
====================================================== */
export function bookingNotificationHtmlForAdmin({
  name,
  email,
  phone,
  checkIn,
  checkOut,
  adults,
  children,
  amount,
  orderId,
  paymentStatus,
}) {
  const formattedAmount = (amount / 100).toFixed(2);

  return `
  <div style="font-family: system-ui, -apple-system, sans-serif; color:#111;">
    <h2 style="color:#d97706;">📦 New Booking Received</h2>
    <p>A new booking has been made on <strong>Nfarms Staycation</strong>.</p>
    <ul style="line-height:1.6;">
      <li><strong>Name:</strong> ${name}</li>
      <li><strong>Email:</strong> ${email}</li>
      <li><strong>Phone:</strong> ${phone}</li>
      <li><strong>Check-in:</strong> ${checkIn}</li>
      <li><strong>Check-out:</strong> ${checkOut}</li>
      <li><strong>Guests:</strong> ${adults} adults, ${children} children</li>
      <li><strong>Amount:</strong> ₹${formattedAmount}</li>
      ${orderId ? `<li><strong>Order ID:</strong> ${orderId}</li>` : ""}
      <li><strong>Payment Status:</strong> ${paymentStatus}</li>
    </ul>
    <p>🕒 Time: ${new Date().toLocaleString()}</p>
  </div>
  `;
}
