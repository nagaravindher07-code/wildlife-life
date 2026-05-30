"use client";

import { motion, AnimatePresence, useMotionValue, animate } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { galleryImages } from "@/lib/images";

const TRANSITION = { duration: 0.5, ease: [0.25, 1, 0.35, 1] };

export function Carousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const dragX = useMotionValue(0);
  const total = galleryImages.length;

  const go = (next: number) => {
    setDirection(next > current ? 1 : -1);
    setCurrent((next + total) % total);
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  go(current - 1);
      if (e.key === "ArrowRight") go(current + 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current]);

  const handleDragEnd = (_: any, info: { offset: { x: number } }) => {
    if (info.offset.x < -50) go(current + 1);
    else if (info.offset.x > 50) go(current - 1);
    animate(dragX, 0, { duration: 0.3 });
  };

  const img = galleryImages[current];

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0, scale: 0.96 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit:  (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0, scale: 0.96 }),
  };

  return (
    <section style={{ background: "#050810", padding: "5rem 0", overflow: "hidden" }}>
      {/* Heading */}
      <div style={{ padding: "0 1.25rem 3rem", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.75rem" }}>
          <div style={{ width: 24, height: 1, background: "#CCFF00" }} />
          <span style={{ color: "#CCFF00", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.3em" }}>BROWSE ALL</span>
        </div>
        <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, color: "#fff", margin: 0 }}>
          Every <span className="neon-text">Frame</span>
        </h2>
      </div>

      {/* Main carousel */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 1.25rem" }}>
        {/* Counter + arrows */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
          <span style={{ color: "#666", fontSize: "0.9rem" }}>
            <span style={{ color: "#CCFF00", fontSize: "1.4rem", fontWeight: 700 }}>
              {String(current + 1).padStart(2, "0")}
            </span>
            {" / "}{String(total).padStart(2, "0")}
          </span>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <motion.button
              onClick={() => go(current - 1)}
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              style={{
                width: 44, height: 44, borderRadius: "50%",
                border: "1.5px solid rgba(204,255,0,0.3)",
                background: "transparent", color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
              }}
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            <motion.button
              onClick={() => go(current + 1)}
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              style={{
                width: 44, height: 44, borderRadius: "50%",
                background: "#CCFF00", border: "none", color: "#000",
                display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
              }}
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Image frame */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.08}
          style={{ x: dragX, cursor: "grab" }}
          onDragEnd={handleDragEnd}
          whileTap={{ cursor: "grabbing" }}
        >
          <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", background: "#1a1f3a", paddingTop: "56.25%" }}>
            <AnimatePresence custom={direction} mode="wait" initial={false}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={TRANSITION}
                style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  draggable={false}
                />
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  padding: "1.5rem 1.5rem 1.25rem",
                  background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                }}>
                  <p style={{ color: "#fff", fontSize: "clamp(1rem, 3vw, 1.4rem)", fontWeight: 700, margin: 0 }}>
                    {img.title}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Dot strip */}
        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "1.25rem" }}>
          {galleryImages.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => go(i)}
              animate={{ width: i === current ? 28 : 8, backgroundColor: i === current ? "#CCFF00" : "#2a2f50" }}
              transition={{ duration: 0.3 }}
              style={{ height: 8, borderRadius: 4, border: "none", cursor: "pointer", padding: 0 }}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail strip */}
      <div style={{ marginTop: "2.5rem", overflowX: "auto", padding: "0 1.25rem 0.5rem", scrollbarWidth: "none" }}>
        <div style={{ display: "flex", gap: "0.75rem", width: "max-content", margin: "0 auto" }}>
          {galleryImages.map((img, i) => (
            <motion.button
              key={i}
              onClick={() => go(i)}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              style={{
                position: "relative", flexShrink: 0, borderRadius: 10, overflow: "hidden",
                width: 80, height: 56, border: "none", cursor: "pointer", padding: 0,
                opacity: i === current ? 1 : 0.45,
                outline: i === current ? "2px solid #CCFF00" : "none",
                outlineOffset: 3,
                transition: "opacity 0.3s",
              }}
            >
              <Image src={img.src} alt={img.alt} fill style={{ objectFit: "cover" }} unoptimized />
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
