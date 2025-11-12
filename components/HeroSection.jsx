"use client";

import { useScroll, useTransform, useSpring, motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Detect mobile view
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const scale = isMobile ? 0.3 : 1;

  // Desktop scroll text
  const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.6], [1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.6], [0, -40 * scale]);

  // ✅ Cinematic fade-out for mobile (easeOutCubic-like curve)
  const mobileOpacityBase = useTransform(scrollYProgress, [0, 0.15, 0.55], [1, 1, 0]);
  const mobileTextOpacity = useSpring(mobileOpacityBase, {
    stiffness: 100,
    damping: 30,
    mass: 0.4,
  });

  // Mobile slideshow images
  const mobile_images = [
    "/resort/hero/front_1.jpeg",
    "/resort/hero/pool_1.jpeg",
    "/resort/hero/whole.jpeg",
    "/resort/hero/pool_2.jpeg",
  ];

  // Desktop parallax motion
  const col1Y = useTransform(scrollYProgress, [0, 1], [-125, 1000]);
  const col2Y = useTransform(scrollYProgress, [0, 1], [250, 250]);
  const col3Y = useTransform(scrollYProgress, [0.45, 1], [0, -600]);
  const col4Y = useTransform(scrollYProgress, [0, 1], [250, 245]);
  const col5Y = useTransform(scrollYProgress, [0, 1], [-125, 1000]);

  // Desktop images
  const first_images = ["/resort/hero/front_1.jpeg", "/resort/hero/whole.jpeg"];
  const second_images = [
    "/resort/hero/pool_1.jpeg",
    "/resort/hero/side_2.jpeg",
    "/resort/hero/pool_2.jpeg",
  ];
  const third_images = ["/resort/hero/side_1.jpeg", "/resort/hero/pool_1.jpeg"];
  const fourth_images = [
    "/resort/hero/pool_1.jpeg",
    "/resort/hero/side_2.jpeg",
    "/resort/hero/pool_2.jpeg",
  ];
  const fifth_images = ["/resort/hero/whole.jpeg", "/resort/hero/front_1.jpeg"];

  // ===== MOBILE LAYOUT =====
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % mobile_images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isMobile, mobile_images.length]);

  if (isMobile) {
    return (
      <section
        ref={ref}
        className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-black text-white"
      >
        {/* === Background Crossfade === */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 z-0">
            {mobile_images.map((src, i) => (
              <motion.img
                key={i}
                src={src}
                alt="resort-bg"
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: i === activeIndex ? 1 : 0,
                  scale: i === activeIndex ? 1.05 : 1,
                }}
                transition={{
                  opacity: { duration: 2.4, ease: "easeInOut" },
                  scale: { duration: 6, ease: "easeOut" },
                }}
                style={{
                  transformOrigin: "center",
                  zIndex: i === activeIndex ? 1 : 0,
                }}
              />
            ))}
          </div>

          {/* ✅ Subtle overlays for clarity */}
          <div className="absolute inset-0 z-10 bg-white/30 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-40 z-20 bg-gradient-to-t from-white via-white/40 to-transparent pointer-events-none" />
        </div>

        {/* === Cinematic Fade Text === */}
        <motion.div
          style={{ opacity: mobileTextOpacity }}
          transition={{ ease: [0.22, 1, 0.36, 1] }} // easeOutCubic curve
          className="relative z-30 text-center px-6"
        >
          <h1 className="text-[24vw] font-extrabold leading-[0.9] tracking-tight text-green-900 drop-shadow-[0_4px_12px_rgba(255,255,255,0.9)]">
            Nfarms
          </h1>
          <span className="block text-[11vw] font-bold text-yellow-600 drop-shadow-[0_3px_10px_rgba(255,255,255,0.8)]">
            staycation
          </span>
        </motion.div>
      </section>
    );
  }

  // ===== DESKTOP LAYOUT =====
  return (
    <section
      ref={ref}
      className="relative flex items-center justify-center
      bg-[url('https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1600')]
      bg-cover bg-center bg-fixed before:absolute before:inset-0
      before:bg-white/60 before:backdrop-blur-sm overflow-hidden
      min-h-screen sm:min-h-[200vh]"
    >
      <div
        className="absolute inset-0 flex justify-center gap-4 px-4
        sm:gap-6 sm:px-10
        max-md:flex-wrap max-md:justify-center"
      >
        <motion.div style={{ y: col1Y }} className="flex flex-col gap-3 sm:gap-6 max-md:hidden">
          {first_images.map((src, i) => (
            <img
              key={`col1-${i}`}
              src={src}
              className="w-28 h-36 sm:w-60 sm:h-56 object-cover shadow-lg"
              alt=""
            />
          ))}
        </motion.div>

        <motion.div style={{ y: col2Y }} className="flex flex-col gap-3 sm:gap-6 max-md:hidden">
          {second_images.map((src, i) => (
            <img
              key={`col2-${i}`}
              src={src}
              className="w-28 h-36 sm:w-40 sm:h-56 object-cover shadow-lg"
              alt=""
            />
          ))}
        </motion.div>

        <div className="relative flex flex-col items-center">
          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            transition={{ ease: [0.22, 1, 0.36, 1] }} // same smooth fade on desktop
            className="relative z-10 mt-20 sm:mt-60 text-green-900 text-center"
          >
            <h1 className="text-[14vw] sm:text-[10vw] font-bold leading-[0.9] tracking-tight mb-0 mt-8 sm:mt-0 text-green-900">
              Nfarms
            </h1>
            <span className="block text-[6vw] sm:text-[5vw] font-semibold text-yellow-600/90 leading-[0.9] mt-[-0.5rem]">
              staycation
            </span>
          </motion.div>

          <motion.div style={{ y: col3Y }} className="flex flex-col gap-4 sm:gap-6 mt-10 sm:mt-40">
            {third_images.map((src, i) => (
              <img
                key={`col3-${i}`}
                src={src}
                className="w-[80vw] sm:w-[28rem] h-[90vw] sm:h-[36rem] object-cover shadow-lg"
                alt=""
              />
            ))}
          </motion.div>
        </div>

        <motion.div style={{ y: col4Y }} className="flex flex-col gap-3 sm:gap-6 max-md:hidden">
          {fourth_images.map((src, i) => (
            <img
              key={`col4-${i}`}
              src={src}
              className="w-28 h-36 sm:w-40 sm:h-56 object-cover shadow-lg"
              alt=""
            />
          ))}
        </motion.div>

        <motion.div style={{ y: col5Y }} className="flex flex-col gap-3 sm:gap-6 max-md:hidden">
          {fifth_images.map((src, i) => (
            <img
              key={`col5-${i}`}
              src={src}
              className="w-28 h-36 sm:w-60 sm:h-56 object-cover shadow-lg"
              alt=""
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
