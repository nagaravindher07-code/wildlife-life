"use client";

import { ParallaxScroll } from "./ui/parallax-scroll";
import { galleryImages } from "@/lib/images";

export function ParallaxSection() {
  const images = galleryImages.map((img) => img.src);

  return (
    <section style={{ background: "#050810" }} className="py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-6 h-px" style={{ background: "#CCFF00" }} />
          <span
            className="text-xs font-bold tracking-[0.3em] uppercase"
            style={{ color: "#CCFF00" }}
          >
            Portfolio
          </span>
        </div>
        <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, color: "#fff", margin: 0 }}>
          The <span className="neon-text">Collection</span>
        </h2>
      </div>

      <ParallaxScroll images={images} />
    </section>
  );
}
