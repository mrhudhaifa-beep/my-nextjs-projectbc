"use client";

import React from "react";
import { motion } from "framer-motion";
import { soundEngine } from "@/components/ui/SoundFx";
import { weddingConfig } from "@/config/wedding.config";

interface CoupleRevealProps {
  onNext: () => void;
}

export const CoupleReveal: React.FC<CoupleRevealProps> = ({ onNext }) => {
  const { groom, bride } = weddingConfig;

  return (
    <div className="relative w-full h-screen bg-[#050507] flex flex-col items-center justify-center overflow-hidden px-6">
      {/* Background ambient lighting */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-radial from-[#D4AF37]/20 to-transparent blur-3xl animate-pulse-glow" />

      {/* Header reveal: "حكايتنا" */}
      <motion.p
        initial={{ opacity: 0, y: -20, filter: "blur(5px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.2 }}
        className="text-sm md:text-base font-serif-arabic text-[#D4AF37] tracking-widest mb-6"
      >
        حكايتنا
      </motion.p>

      {/* Couple Names Reveal Container - Whole Connected Arabic Words */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 my-6">
        {/* Groom: حذيفة (Full connected Arabic word) */}
        <motion.h1
          initial={{ opacity: 0, y: 30, scale: 0.9, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{
            duration: 1.2,
            delay: 0.3,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="text-5xl sm:text-7xl md:text-8xl font-serif-arabic font-bold text-gold-gradient text-gold-glow tracking-normal"
        >
          {groom}
        </motion.h1>

        {/* Minimal Gold Ampersand */}
        <motion.span
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-4xl sm:text-6xl font-serif-arabic text-[#F3E5AB] my-2 sm:my-0"
        >
          &
        </motion.span>

        {/* Bride: حوراء (Full connected Arabic word) */}
        <motion.h1
          initial={{ opacity: 0, y: 30, scale: 0.9, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{
            duration: 1.2,
            delay: 1.6,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="text-5xl sm:text-7xl md:text-8xl font-serif-arabic font-bold text-gold-gradient text-gold-glow tracking-normal"
        >
          {bride}
        </motion.h1>
      </div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 2.5 }}
        className="text-base sm:text-xl font-serif-arabic text-[#F4F1EA]/90 mt-6 text-center max-w-lg leading-relaxed"
      >
        ومن هنا تبدأ حكاية فصلٍ جديد...
      </motion.p>

      {/* Proceed Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.2 }}
        className="mt-12"
      >
        <button
          onClick={() => {
            soundEngine.playClick();
            onNext();
          }}
          className="px-8 py-3 rounded-full glass-gold text-[#F3E5AB] font-medium text-sm hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>استكشف الحكاية</span>
          <span className="text-xs">↓</span>
        </button>
      </motion.div>
    </div>
  );
};
