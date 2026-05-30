"use client";

import { useScroll, useTransform, useSpring, motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface ParallaxScrollProps {
  images: string[];
}

export const ParallaxScroll = ({ images }: ParallaxScrollProps) => {
  const gridRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ["start end", "end start"],
  });

  // Spring-smoothed parallax — eliminates jank, feels buttery
  const springConfig = { stiffness: 60, damping: 20, mass: 0.8 };

  const rawFirst  = useTransform(scrollYProgress, [0, 1], [0, -280]);
  const rawSecond = useTransform(scrollYProgress, [0, 1], [0,  280]);
  const rawThird  = useTransform(scrollYProgress, [0, 1], [0, -280]);

  const translateFirst  = useSpring(rawFirst,  springConfig);
  const translateSecond = useSpring(rawSecond, springConfig);
  const translateThird  = useSpring(rawThird,  springConfig);

  const third = Math.ceil(images.length / 3);
  const col1  = images.slice(0,       third);
  const col2  = images.slice(third,   2 * third);
  const col3  = images.slice(2 * third);

  return (
    <div ref={gridRef} style={{ width: "100%", overflow: "hidden" }}>
      <div
        style={{
          display: "grid",
          // 1 col on mobile, 2 on tablet, 3 on desktop
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem",
          padding: "1.5rem 1.25rem",
          alignItems: "start",
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        {/* Col 1 — drifts up */}
        <motion.div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", y: translateFirst }}>
          {col1.map((src, i) => (
            <div key={i} style={{ borderRadius: 16, overflow: "hidden", background: "#1a1f3a" }}>
              <Image
                src={src} alt={`photo ${i + 1}`} width={600} height={600}
                style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
                unoptimized
              />
            </div>
          ))}
        </motion.div>

        {/* Col 2 — drifts down */}
        <motion.div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", y: translateSecond }}>
          {col2.map((src, i) => (
            <div key={i} style={{ borderRadius: 16, overflow: "hidden", background: "#1a1f3a" }}>
              <Image
                src={src} alt={`photo ${i + 1}`} width={600} height={600}
                style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
                unoptimized
              />
            </div>
          ))}
        </motion.div>

        {/* Col 3 — drifts up */}
        <motion.div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", y: translateThird }}>
          {col3.map((src, i) => (
            <div key={i} style={{ borderRadius: 16, overflow: "hidden", background: "#1a1f3a" }}>
              <Image
                src={src} alt={`photo ${i + 1}`} width={600} height={600}
                style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
                unoptimized
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
