"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { galleryImages } from "@/lib/images";
import { Lightbox } from "./Lightbox";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 100, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.9, ease: [0.23, 1, 0.32, 1] },
  },
};

export function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <motion.section
        ref={containerRef}
        className="w-full py-32 px-4 md:px-8 bg-gradient-to-b from-[#050810] to-[#0a0e27]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-150px" }}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div className="mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-3">
              Featured <span className="neon-text">Work</span>
            </h2>
            <motion.div
              className="w-24 h-1 bg-[#CCFF00]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ originX: 0 }}
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {galleryImages.map((image, index) => (
              <GalleryItem
                key={index}
                image={image}
                index={index}
                onClick={() => setSelectedIndex(index)}
                variants={itemVariants}
              />
            ))}
          </div>
        </div>
      </motion.section>

      {selectedIndex !== null && (
        <Lightbox
          images={galleryImages}
          currentIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          onNavigate={setSelectedIndex}
        />
      )}
    </>
  );
}

interface GalleryItemProps {
  image: (typeof galleryImages)[0];
  index: number;
  onClick: () => void;
  variants: any;
}

function GalleryItem({ image, index, onClick, variants }: GalleryItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });

  // Premium parallax: different easing per axis for depth
  const y = useTransform(scrollYProgress, [0, 1], [120, -120], {
    clamp: true,
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.5]);
  const rotateZ = useTransform(scrollYProgress, [0, 1], [-2, 2]);

  return (
    <motion.div
      ref={ref}
      variants={variants}
      className="group cursor-pointer h-full"
      onClick={onClick}
    >
      <motion.div
        ref={containerRef}
        className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#1a1f3a] shadow-2xl border border-[#CCFF00]/10 hover:border-[#CCFF00]/30 transition-colors"
        style={{ opacity }}
        whileHover={{ y: -8, transition: { duration: 0.3 } }}
      >
        {/* Parallax image wrapper */}
        <motion.div
          className="absolute inset-0"
          style={{
            y,
            scale,
            rotateZ,
          }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            unoptimized
            priority={index < 3}
          />
        </motion.div>

        {/* Vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 pointer-events-none" />

        {/* Neon border glow on hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg shadow-[#CCFF00]/20" />

        {/* Overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8"
          initial={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-white mb-2">
              {image.title}
            </h3>
            <p className="text-sm text-[#CCFF00]">Click to view</p>
          </motion.div>
        </motion.div>

        {/* Border accent */}
        <motion.div
          className="absolute inset-0 rounded-2xl border border-[#CCFF00]/10 pointer-events-none"
          whileHover={{ borderColor: "rgba(204,255,0,0.3)" }}
        />
      </motion.div>
    </motion.div>
  );
}
