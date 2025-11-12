'use client';

export default function TermsPage() {
  return (
    <section className="py-20 bg-white dark:bg-[#0d0d0d] text-gray-800 dark:text-gray-200">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl font-bold mb-6 text-green-700">
          Terms & Conditions
        </h1>
        <p className="mb-6">
          Welcome to <strong>N Farms Staycation</strong>. By confirming your
          booking, you agree to comply with and be bound by the following Terms
          and Conditions. Please read these carefully before proceeding.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">1. Booking & Payments</h2>
        <ul className="list-disc ml-6 mb-6 space-y-2">
          <li>
            All bookings must be confirmed through our website or official
            representatives.
          </li>
          <li>
            A minimum <strong>advance payment of ₹3,000</strong> is required to
            secure your booking. The remaining balance must be paid prior to or
            at check-in.
          </li>
          <li>
            Bookings are valid only after successful payment confirmation.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-3">2. Check-In & Stay Duration</h2>
        <p className="mb-6">
          Booking time slots are from <strong>11:00 AM to 10:00 AM</strong> (23
          hours per booking). Early check-ins or late check-outs are subject to
          availability and additional charges.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">3. Guest Conduct</h2>
        <ul className="list-disc ml-6 mb-6 space-y-2">
          <li>
            Guests must maintain cleanliness and avoid property damage. Any
            damages will be deducted from the security advance.
          </li>
          <li>
            Illegal activities, loud disturbances, or misconduct will lead to
            immediate eviction without refund.
          </li>
          <li>
            N Farms Staycation is a family-friendly property — guests are
            expected to behave responsibly.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-3">4. Liability</h2>
        <p className="mb-6">
          N Farms is not liable for personal injuries, loss of belongings, or
          natural events (rain, power outage, etc.) beyond our control.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">5. Cancellation & Refunds</h2>
        <p className="mb-6">
          Please refer to our{' '}
          <a
            href="/legal/refund"
            className="text-green-700 underline hover:text-green-800"
          >
            Cancellation & Refund Policy
          </a>{' '}
          for detailed terms. No refunds will be issued in case of a no-show.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">6. Jurisdiction</h2>
        <p>
          All disputes are subject to the jurisdiction of Hyderabad, Telangana,
          India.
        </p>
      </div>
    </section>
  );
}
