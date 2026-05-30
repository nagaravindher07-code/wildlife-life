"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { heroImage } from "@/lib/images";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.45, 0.85]);

  return (
    <div
      ref={ref}
      style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}
    >
      {/* Parallax image */}
      <motion.div
        style={{
          position: "absolute", inset: 0,
          transform: "scale(1.1)",
          y: imageY,
        }}
      >
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          style={{ objectFit: "cover" }}
          priority
          unoptimized
        />
      </motion.div>

      {/* Darkening overlay */}
      <motion.div
        style={{
          position: "absolute", inset: 0,
          background: "#000",
          opacity: overlayOpacity,
        }}
      />

      {/* Bottom fade */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 160,
        background: "linear-gradient(to top, #050810, transparent)",
        pointerEvents: "none",
      }} />

      {/* Scroll indicator */}
      <motion.div
        style={{
          position: "absolute", bottom: 40,
          left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom, transparent, #CCFF00)" }} />
        <svg width="16" height="16" fill="none" stroke="#CCFF00" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </motion.div>
    </div>
  );
}
