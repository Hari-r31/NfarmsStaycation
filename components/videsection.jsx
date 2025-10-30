"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function GetInTouch() {
  return (
    <section>
      <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
        {/* ======= Video Hero Section ======= */}
        <div className="relative rounded-t-2xl overflow-hidden">
          {/* Background video */}
                    <video
            className="w-full absolute top-0 left-0 object-cover h-full -z-10"
            autoPlay
            loop
            muted
            playsInline
            aria-label="Video background showing luxurious real estate"
          >
            <source
              src="https://videos.pexels.com/video-files/7233782/7233782-hd_1920_1080_25fps.mp4"
              type="video/mp4"
            />
          </video>

          {/* Overlay */}
          <div className="bg-black/50 lg:py-64 md:py-40 py-20 flex flex-col items-center justify-center text-center gap-8">
            <motion.h2
              className="text-white lg:text-5xl md:text-4xl text-2xl font-semibold max-w-3xl leading-snug"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Escape to <span className="text-yellow-400">NFARMS Staycation</span> —
              where luxury meets nature’s calm.
            </motion.h2>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                href="/contact"
                className="bg-white py-4 px-8 rounded-full text-green-900 font-medium hover:bg-green-800 hover:text-white duration-300 shadow-md hover:shadow-lg"
              >
                Plan Your Stay
              </Link>
            </motion.div>
          </div>
        </div>

        {/* ======= Scrolling Banner Section ======= */}
        <div className="w-full py-5 bg-green-700 rounded-b-2xl overflow-hidden relative">
          <motion.div
            className="flex items-center gap-40 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              duration: 20,
              ease: "linear",
            }}
          >
            {[
              "BOOK YOUR NFARMS STAYCATION — EXPERIENCE LUXURY AMID NATURE 🌿",
              "PRIVATE VILLAS · INFINITY POOL · LUSH GREEN VIEWS · FAMILY RETREATS 🌺",
              "BOOK YOUR NFARMS STAYCATION — EXPERIENCE LUXURY AMID NATURE 🌿",
              "PRIVATE VILLAS · INFINITY POOL · LUSH GREEN VIEWS · FAMILY RETREATS 🌺",
            ].map((text, i) => (
              <p
                key={i}
                className="text-white relative after:absolute after:w-20 after:h-px after:bg-white/60 after:top-3 after:-right-32 text-sm sm:text-base tracking-wide"
              >
                {text}
              </p>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
