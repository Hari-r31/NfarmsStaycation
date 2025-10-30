"use client";
import React from "react";
import { Icon } from "@iconify/react";
import { BedDouble, Bath, Car, Martini } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const featuredProprty = [
  {
    scr: "/resort/hero/side_1.jpeg",
    alt: "NFARMS Staycation Villa 1",
  },
  {
    scr: "/resort/hero/side_2.jpeg",
    alt: "NFARMS Staycation Villa 2",
  },
  {
    scr: "/resort/hero/pool_2.jpeg",
    alt: "NFARMS Staycation Pool View",
  },
];

const features = [
  { icon: BedDouble, label: "4 Bedrooms" },
  { icon: Bath, label: "3 Bathrooms" },
  { icon: Car, label: "Private Parking" },
  { icon: Martini, label: "Pool & Lounge Area" },
];

const FeaturedProperty = () => {
  return (
    <section className="mt-20 mb-20">
      <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left Carousel Section */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <Carousel opts={{ loop: true }}>
              <CarouselContent>
                {featuredProprty.map((item, index) => (
                  <CarouselItem key={index}>
                    <img
                      src={item.scr}
                      alt={item.alt}
                      width={680}
                      height={530}
                      className="rounded-2xl w-full h-[540px] object-cover"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          {/* Right Info Section */}
          <div className="flex flex-col gap-10">
            <div>
              <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2 items-center">
                <Icon
                  icon="ph:house-simple-fill"
                  className="text-2xl text-primary"
                />
                Featured Stay
              </p>
              <h2 className="lg:text-[52px] text-[40px] font-semibold text-dark dark:text-white leading-tight">
                NFARMS Luxury Staycation
              </h2>
              <div className="flex items-center gap-2.5 mt-2">
                <Icon
                  icon="ph:map-pin"
                  width={24}
                  height={24}
                  className="text-dark/50 dark:text-white/50"
                />
                <p className="text-dark/50 dark:text-white/50 text-base">
                  Beachside Drive, Vizag, Andhra Pradesh
                </p>
              </div>
            </div>

            <p className="text-base text-dark/60 dark:text-white/60 leading-relaxed">
              Discover tranquility at NFARMS Staycation — a peaceful escape
              surrounded by lush greenery and ocean breeze. Enjoy spacious
              rooms, a private pool, and cozy lounges designed for luxury and
              relaxation.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-8">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="bg-dark/5 dark:bg-white/5 p-3 rounded-lg shadow-sm">
                    <f.icon className="w-6 h-6 text-dark dark:text-white" />
                  </div>
                  <h6 className="text-dark dark:text-white font-medium">
                    {f.label}
                  </h6>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-10 items-center">
              <a
                href="/contactus"
                className="py-4 px-8 bg-primary hover:bg-dark duration-300 rounded-full text-white shadow-md hover:shadow-lg transition-all"
              >
                Book your stay
              </a>
              <div>
                <h4 className="text-3xl text-dark dark:text-white font-semibold">
                  ₹14,999 / night
                </h4>
                <p className="text-base text-dark/50 dark:text-white/50">
                  Inclusive of breakfast
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperty;
