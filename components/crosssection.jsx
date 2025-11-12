"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function XBanner() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // starts when banner enters view
  });

  // Move ribbons in opposite directions based on scroll
  const orangeX = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const greenX = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);

  const orangeTags = ["#Scheduling", "#Consulting", "#Support", "#Travel", "#Experience", "#Scheduling", "#Consulting", "#Support", "#Travel", "#Experience"];
  const greenTags = ["#Rooms", "#Booking", "#Reservation", "#Hotel", "#Luxury, #Rooms", "#Booking", "#Reservation", "#Hotel", "#Luxury"];

  return (
    <section
      ref={ref}
      className="relative w-full h-[180px] sm:h-[250px] overflow-hidden bg-white dark:bg-[#0d0d0d]"
    >
      {/* Orange diagonal strip — scrolls left */}
      <div
        className="absolute top-[40%] left-[-10%] w-[130%] 
        h-12 sm:h-20 bg-orange-500 rotate-[-8deg] overflow-hidden 
        shadow-lg flex items-center"
      >
        <motion.div
          style={{ x: orangeX }}
          className="flex whitespace-nowrap text-white font-semibold 
          text-sm sm:text-lg absolute"
        >
          {[...orangeTags, ...orangeTags].map((tag, i) => (
            <span key={i} className="mx-6 sm:mx-10">
              {tag}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Green diagonal strip — scrolls right */}
      <div
        className="absolute bottom-[30%] left-[-10%] w-[130%] 
        h-12 sm:h-20 bg-green-700 rotate-[8deg] overflow-hidden 
        shadow-lg flex items-center"
      >
        <motion.div
          style={{ x: greenX }}
          className="flex whitespace-nowrap text-white font-semibold 
          text-sm sm:text-lg absolute"
        >
          {[...greenTags, ...greenTags].map((tag, i) => (
            <span key={i} className="mx-6 sm:mx-10">
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
