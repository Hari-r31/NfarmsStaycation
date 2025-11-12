'use client';

export default function PrivacyPolicy() {
  return (
    <section className="py-20 bg-white dark:bg-[#0d0d0d] text-gray-800 dark:text-gray-200">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl font-bold mb-6 text-green-700">
          Privacy Policy
        </h1>
        <p className="mb-6">
          N Farms Staycation (“we,” “our,” or “us”) is committed to protecting
          your privacy. This policy describes how we collect, use, and safeguard
          your personal information in compliance with the Information Technology
          Act, 2000, and applicable data protection laws.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">1. Information We Collect</h2>
        <ul className="list-disc ml-6 mb-6 space-y-2">
          <li>Personal details such as name, phone number, and email address.</li>
          <li>
            Booking details including stay duration, payment information, and
            guest preferences.
          </li>
          <li>
            Technical information such as IP address, browser type, and cookies
            for improving site experience.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-3">2. How We Use Your Information</h2>
        <ul className="list-disc ml-6 mb-6 space-y-2">
          <li>To confirm and manage your booking.</li>
          <li>To communicate offers, updates, and support messages.</li>
          <li>To comply with applicable legal and regulatory obligations.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-3">3. Payment Information</h2>
        <p className="mb-6">
          We use secure third-party payment gateways (such as Razorpay) to
          process online transactions. We do not store your card or bank details
          on our servers.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">4. Cookies</h2>
        <p className="mb-6">
          Our website uses cookies for analytics and personalization. You may
          disable cookies in your browser settings, though some features may not
          function properly.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">5. Data Protection</h2>
        <p className="mb-6">
          We employ SSL encryption and secure storage to protect personal
          information from unauthorized access or disclosure.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">6. Third-Party Services</h2>
        <p className="mb-6">
          We may use third-party services such as Google Maps, Razorpay, or
          analytics tools. These platforms may collect limited user data under
          their own privacy policies.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">7. Your Rights</h2>
        <p className="mb-6">
          You may request to access, correct, or delete your personal data by
          contacting us at{' '}
          <a
            href="mailto:contact@nfarms.in"
            className="text-green-700 underline hover:text-green-800"
          >
            contact@nfarms.in
          </a>
          .
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">8. Updates to this Policy</h2>
        <p>
          This Privacy Policy may be updated from time to time. The latest
          version will always be available on this page.
        </p>
      </div>
    </section>
  );
}
