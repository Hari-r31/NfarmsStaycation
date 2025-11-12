'use client';

export default function RefundPolicy() {
  return (
    <section className="py-20 bg-white dark:bg-[#0d0d0d] text-gray-800 dark:text-gray-200">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl font-bold mb-6 text-green-700">
          Cancellation & Refund Policy
        </h1>
        <p className="mb-6">
          At N Farms Staycation, we value our guests and strive to provide a
          fair and transparent refund process. Please review the following terms
          before making a booking.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">1. Advance Payment</h2>
        <p className="mb-6">
          A <strong>₹3,000 advance payment</strong> is required to confirm every
          booking. This amount will be adjusted against the total booking cost
          or refunded (as per the conditions below).
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">2. Refundable Conditions</h2>
        <ul className="list-disc ml-6 mb-6 space-y-2">
          <li>
            The advance amount is <strong>refundable</strong> if the stay is
            completed and the property is maintained without damage.
          </li>
          <li>
            In case of any property damage, the cost of repair will be deducted
            from the ₹3,000 advance.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-3">3. No-Show & Late Cancellations</h2>
        <ul className="list-disc ml-6 mb-6 space-y-2">
          <li>
            If a guest fails to show up on the scheduled date without prior
            intimation, the advance is <strong>non-refundable</strong>.
          </li>
          <li>
            Cancellations made less than <strong>48 hours</strong> before
            check-in are considered no-shows.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-3">4. Refund Processing Time</h2>
        <p className="mb-6">
          Approved refunds will be processed within <strong>7–10 business
          days</strong> to the original payment source, depending on the payment
          gateway and bank policies.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">5. Contact for Refunds</h2>
        <p>
          For refund-related queries, please contact our team at{' '}
          <a
            href="mailto:contact@nfarms.in"
            className="text-green-700 underline hover:text-green-800"
          >
            contact@nfarms.in
          </a>{' '}
          or call us at{' '}
          <a
            href="tel:+919393935050"
            className="text-green-700 underline hover:text-green-800"
          >
            +91 93939 35050
          </a>
          .
        </p>
      </div>
    </section>
  );
}
