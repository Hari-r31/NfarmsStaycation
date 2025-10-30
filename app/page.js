'use client';

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import Crosssection from '@/components/crosssection';
import Categories from '@/components/cat_section';
import FeaturedProperty from '@/components/features_stay';
import GetInTouch from '@/components/videsection';
import ServicesSection from '@/components/ServicesSection';
import GallerySection from '@/components/GallerySection';
import TestimonialsSection from '@/components/TestimonialsSection';
import PricingSection from '@/components/PricingSection';
import FAQ  from '@/components/Faq';
import Footer from '@/components/Footer';
import { ReactLenis } from 'lenis/react';

export default function Home() {
  return (
    <>
      <Navbar />
      <ReactLenis
        root
        options={{
          lerp: 0.05,
          duration: 1.5,
          smoothWheel: true,
        }}
      >
        <main>
          <HeroSection />
          <AboutSection />
          <Crosssection />

          <FeaturedProperty />
          <GetInTouch />
          <ServicesSection />
          <GallerySection />
          <TestimonialsSection />
          <PricingSection />
          <FAQ />
          <Footer />
        </main>
      </ReactLenis>
    </>
  );
}
