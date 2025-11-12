'use client';

import Link from 'next/link';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import Footer from '@/components/Footer';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LegalLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  // Derive page title dynamically based on route
  const pageTitle = (() => {
    if (pathname.includes('privacy')) return 'Privacy Policy';
    if (pathname.includes('terms')) return 'Terms & Conditions';
    if (pathname.includes('refund')) return 'Cancellation & Refund Policy';
    return 'Legal Information';
  })();

  return (
    <main className="min-h-screen bg-white dark:bg-[#0d0d0d] flex flex-col justify-between">
      {/* 🟢 Hero Section */}
      <section className="relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="bg-gradient-to-r from-green-700 via-green-600 to-green-500 text-white py-16 sm:py-20"
        >
          <div className="container mx-auto px-6">
            {/* Top Row — Back Button + Breadcrumbs */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div className="flex items-center gap-4">
                {/* Back Button */}
                <button
                  onClick={() => router.back()}
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 
                             text-white text-sm font-medium px-4 py-2 rounded-full 
                             border border-white/30 backdrop-blur-md transition-all"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-green-100">
                  <Link
                    href="/"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Home
                  </Link>
                  <ChevronRight className="w-4 h-4 opacity-70" />
                  <span className="font-semibold text-white">{pageTitle}</span>
                </div>
              </div>
            </div>

            {/* Centered Page Title */}
            <div className="text-center mt-4">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                {pageTitle}
              </h1>
              <p className="text-green-100 text-sm md:text-base mt-2">
                Updated for 2025 • N Farms Staycation
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 📄 Page Content */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-grow"
      >
        {children}
      </motion.section>

      {/* 🌿 Shared Footer */}
      <Footer />
    </main>
  );
}
