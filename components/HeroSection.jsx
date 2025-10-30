"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // detect if mobile
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // scale factor for motion intensity
  const scale = isMobile ? 0.4 : 1;

  // Text fade and movement
  const textOpacity = useTransform(scrollYProgress, [0, 0.1, 0.45], [1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.45], [0, -60 * scale]);

  // Column scrolls (scaled down for mobile)
  const col1Y = useTransform(scrollYProgress, [0, 1], [-125 * scale, 1000 * scale]);
  const col2Y = useTransform(scrollYProgress, [0, 1], [250 * scale, 250 * scale]);
  const col3Y = useTransform(scrollYProgress, [0.45, 1], [0, -600 * scale]);
  const col4Y = useTransform(scrollYProgress, [0, 1], [250 * scale, 245 * scale]);
  const col5Y = useTransform(scrollYProgress, [0, 1], [-125 * scale, 1000 * scale]);

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

  return (
    <section
      ref={ref}
      className="relative flex items-center justify-center 
      bg-[url('https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1600')]
      bg-cover bg-center bg-fixed before:absolute before:inset-0 
      before:bg-white/60 before:backdrop-blur-sm overflow-hidden
      min-h-screen sm:min-h-[200vh]"
    >
      {/* Columns Container */}
      <div
        className="absolute inset-0 flex justify-center gap-4 px-4 
        sm:gap-6 sm:px-10 
        max-md:flex-wrap max-md:justify-center"
      >
        {/* Column 1 */}
        <motion.div style={{ y: col1Y }} className="flex flex-col gap-3 sm:gap-6 max-md:hidden">
          {first_images.map((src, i) => (
            <img
              key={`col1-${i}`}
              src={src}
              className="w-28 h-36 sm:w-60 sm:h-56 object-cover shadow-lg rounded-lg"
              alt=""
            />
          ))}
        </motion.div>

        {/* Column 2 */}
        <motion.div style={{ y: col2Y }} className="flex flex-col gap-3 sm:gap-6 max-md:hidden">
          {second_images.map((src, i) => (
            <img
              key={`col2-${i}`}
              src={src}
              className="w-28 h-36 sm:w-40 sm:h-56 object-cover shadow-lg rounded-lg"
              alt=""
            />
          ))}
        </motion.div>

        {/* Center Column */}
        <div className="relative flex flex-col items-center">
          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className="relative z-10 mt-20 sm:mt-60 text-green-900 text-center"
          >
<h1 className="text-[14vw] sm:text-[10vw] font-bold leading-[0.9] tracking-tight mb-0 mt-8 sm:mt-0">
  Nfarms
</h1>

            <span className="block text-[6vw] sm:text-[5vw] font-semibold text-yellow-600/90 leading-[0.9] mt-[-0.5rem]">
              staycation
            </span>
          </motion.div>

          {/* Center Images */}
          <motion.div
            style={{ y: col3Y }}
            className="flex flex-col gap-4 sm:gap-6 mt-10 sm:mt-40"
          >
            {third_images.map((src, i) => (
              <img
                key={`col3-${i}`}
                src={src}
                className="w-[80vw] sm:w-[28rem] h-[90vw] sm:h-[36rem] object-cover shadow-lg rounded-xl"
                alt=""
              />
            ))}
          </motion.div>
        </div>

        {/* Column 4 */}
        <motion.div style={{ y: col4Y }} className="flex flex-col gap-3 sm:gap-6 max-md:hidden">
          {fourth_images.map((src, i) => (
            <img
              key={`col4-${i}`}
              src={src}
              className="w-28 h-36 sm:w-40 sm:h-56 object-cover shadow-lg rounded-lg"
              alt=""
            />
          ))}
        </motion.div>

        {/* Column 5 */}
        <motion.div style={{ y: col5Y }} className="flex flex-col gap-3 sm:gap-6 max-md:hidden">
          {fifth_images.map((src, i) => (
            <img
              key={`col5-${i}`}
              src={src}
              className="w-28 h-36 sm:w-60 sm:h-56 object-cover shadow-lg rounded-lg"
              alt=""
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
