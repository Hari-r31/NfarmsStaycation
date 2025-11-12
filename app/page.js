'use client';

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import Crosssection from '@/components/crosssection';
import FloatingChatButton from '@/components/whatsapp';
import FeaturedProperty from '@/components/features_stay';
import GetInTouch from '@/components/videsection';
import ServicesSection from '@/components/ServicesSection';
import GallerySection from '@/components/GallerySection';
import TestimonialsSection from '@/components/TestimonialsSection';
import PricingSection from '@/components/PricingSection';
import FAQ from '@/components/Faq';
import Footer from '@/components/Footer';
import { ReactLenis } from 'lenis/react';

export default function Home() {
  return (
    <>
      {/* Global Navbar */}
      <Navbar />

      {/* Smooth scroll wrapper */}
      <ReactLenis
        root
        options={{
          lerp: 0.05,
          duration: 1.5,
          smoothWheel: true,
        }}
      >
        <main className="relative bg-white dark:bg-black">
          <section id="hero">            <HeroSection />
          </section>

          <section id="about">
            <AboutSection />
          </section>

          <section id="crosssection">
            <Crosssection />
          </section>

          <section id="services">
            <ServicesSection />
          </section>

          <section id="featured">
            <FeaturedProperty />
          </section>

          <section id="getintouch">
            <GetInTouch />
          </section>

          <section id="gallery">
            <GallerySection />
          </section>

          <section id="testimonials">
            <TestimonialsSection />
          </section>

          <section id="pricing">
            <PricingSection />
          </section>

          <section id="faq">
            <FAQ />
          </section>

          <footer id="footer">
            <Footer />
          </footer>

        </main>

      </ReactLenis>
                        <FloatingChatButton />
    </>
  );
}
