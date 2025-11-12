// app/layout.js
import "./globals.css";

export const metadata = {
  title: "Nfarms Staycation | Nature Retreat & Farmstay Experience",
  description:
    "Escape to Nfarms Staycation — a peaceful nature retreat offering farmstay experiences, lush greenery, and modern comfort near the countryside. Perfect for family getaways, wellness retreats, and digital detox stays.",
  keywords: [
    "Nfarms",
    "farm stay",
    "nature retreat",
    "staycation",
    "eco resort",
    "farmhouse",
    "vacation rental",
    "family getaway",
    "weekend stay",
    "eco tourism",
  ],
  authors: [{ name: "Nfarms Team" }],
  creator: "Nfarms",
  publisher: "Nfarms",
  icons: {
    icon: "/logo_icon.png",
  },
  openGraph: {
    title: "Nfarms Staycation | Nature Retreat & Farmstay Experience",
    description:
      "Relax, reconnect, and recharge at Nfarms Staycation — an eco-friendly farmstay surrounded by nature.",
    url: "https://nfarms.in",
    siteName: "Nfarms Staycation",
    images: [
      {
        url: "/logo_main.png",
        width: 800,
        height: 600,
        alt: "Nfarms Staycation Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nfarms Staycation | Eco Farmstay Retreat",
    description:
      "Experience the joy of slow living at Nfarms Staycation — your perfect escape into nature.",
    images: ["/logo_main.png"],
  },
  metadataBase: new URL("https://nfarms.in"),
};

export default function RootLayout({ children }) {
  // ✅ Structured Data (Schema.org JSON-LD)
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: "Nfarms Staycation",
    image: "https://nfarms.in/logo_main.png",
    "@id": "https://nfarms.in",
    url: "https://nfarms.in",
    telephone: "+91 93939 35050",
    priceRange: "₹₹",
    description:
      "Nfarms Staycation offers a tranquil farmstay experience surrounded by lush greenery. Perfect for family vacations, wellness retreats, and couples getaways.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Vemavaram, Andhra Pradesh",
      addressLocality: "Rajahmundry",
      addressRegion: "AP",
      postalCode: "533101",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "17.0537", // ✅ update to your exact Google Maps coordinates
      longitude: "81.7898",
    },
    brand: {
      "@type": "Brand",
      name: "Nfarms Staycation",
      logo: "https://nfarms.in/logo_main.png",
    },
    sameAs: [
      "https://www.instagram.com/nfarmsstaycation",
      "https://www.facebook.com/nfarmsstaycation",
      "https://maps.google.com/?q=Nfarms+Staycation",
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "08:00",
        closes: "22:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "324",
    },
    review: [
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Priya Sharma" },
        reviewBody:
          "An absolutely serene stay! The farm vibes and staff hospitality were amazing.",
        reviewRating: { "@type": "Rating", ratingValue: "5" },
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        {/* ✅ Favicon & Canonical */}
        <link rel="icon" href="/logo_main.png" type="image/png" />
        <link rel="canonical" href="https://nfarms.in" />

        {/* ✅ SEO Meta */}
        <meta name="language" content="English" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* ✅ Font Optimization */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* ✅ JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body className="bg-white text-gray-900 dark:bg-[#0d0d0d] dark:text-gray-100 antialiased">
        {children}
      </body>
    </html>
  );
}
