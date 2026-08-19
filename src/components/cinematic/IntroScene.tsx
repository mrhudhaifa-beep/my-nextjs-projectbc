"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { soundEngine } from "@/components/ui/SoundFx";

interface IntroSceneProps {
  onComplete: () => void;
}

export const IntroScene: React.FC<IntroSceneProps> = ({ onComplete }) => {
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    // Step 0: Initial light dot
    const timer1 = setTimeout(() => {
      setStep(1); // "كل حكاية جميلة تبدأ بلحظة..."
      soundEngine.playChime();
    }, 1500);

    const timer2 = setTimeout(() => {
      setStep(2); // "لكن بعض اللحظات... تصبح بداية العمر."
    }, 5500);

    const timer3 = setTimeout(() => {
      setStep(3); // Complete transition
    }, 9500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  useEffect(() => {
    if (step === 3) {
      onComplete();
    }
  }, [step, onComplete]);

  return (
    <div className="relative w-full h-screen bg-[#050507] flex items-center justify-center overflow-hidden px-6">
      {/* Background ambient light point */}
      <div className="absolute w-[400px] h-[400px] rounded-full bg-radial from-[#D4AF37]/15 to-transparent blur-3xl animate-pulse-glow" />

      {/* Central light dot */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0.8, 1.2, 1], opacity: [0.3, 1, 0.7] }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
        className="absolute w-3 h-3 rounded-full bg-[#FFF5D4] shadow-[0_0_25px_8px_rgba(212,175,55,0.8)]"
      />

      {/* Ambient Stardust Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * 100 - 50 + "%",
              y: Math.random() * 100 - 50 + "%",
              opacity: 0,
              scale: Math.random() * 0.5 + 0.3,
            }}
            animate={{
              y: ["-10px", "10px", "-10px"],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            className="absolute left-1/2 top-1/2 w-1 h-1 rounded-full bg-[#F3E5AB]"
          />
        ))}
      </div>

      {/* Cinematic Text Container */}
      <div className="relative z-10 text-center max-w-2xl">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.h1
              key="intro-line-1"
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
              transition={{ duration: 1.8, ease: "easeOut" }}
              className="text-2xl sm:text-3xl md:text-4xl font-serif-arabic text-[#F4F1EA] tracking-wide leading-relaxed font-semibold"
            >
              "كل حكاية جميلة تبدأ بلحظة..."
            </motion.h1>
          )}

          {step === 2 && (
            <motion.h1
              key="intro-line-2"
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
              transition={{ duration: 1.8, ease: "easeOut" }}
              className="text-2xl sm:text-3xl md:text-4xl font-serif-arabic text-gold-gradient tracking-wide leading-relaxed font-bold"
            >
              "لكن بعض اللحظات... تصبح بداية العمر."
            </motion.h1>
          )}
        </AnimatePresence>

        {/* Skip / Next Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          onClick={() => {
            soundEngine.playClick();
            onComplete();
          }}
          className="mt-12 text-xs md:text-sm text-[#A3A19B] hover:text-[#F3E5AB] transition-colors border-b border-[#D4AF37]/30 pb-1 cursor-pointer"
        >
          انتقل إلى المشهد التالي ↵
        </motion.button>
      </div>
    </div>
  );
};
