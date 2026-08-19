"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { soundEngine } from "@/components/ui/SoundFx";
import { weddingConfig } from "@/config/wedding.config";
import { Mail, Sparkles } from "lucide-react";

interface EnvelopeSceneProps {
  onOpen: () => void;
}

export const EnvelopeScene: React.FC<EnvelopeSceneProps> = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenEnvelope = () => {
    if (isOpen) return;
    setIsOpen(true);
    soundEngine.playEnvelopeOpen();

    setTimeout(() => {
      onOpen();
    }, 1800);
  };

  return (
    <div className="relative w-full h-screen bg-[#050507] flex flex-col items-center justify-center overflow-hidden px-6">
      {/* Ambient background aura */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-radial from-[#D4AF37]/15 via-[#3D272A]/20 to-transparent blur-3xl" />

      {/* Header Prompt */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 z-10"
      >
        <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-medium">
          لحظة الدعوة
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif-arabic text-[#F4F1EA] mt-1 font-bold">
          والآن... افتح دعوتنا 🤍
        </h2>
      </motion.div>

      {/* 3D Envelope Container */}
      <div className="relative z-10 perspective-1000 my-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative w-[300px] sm:w-[420px] h-[200px] sm:h-[270px] bg-[#12121c] rounded-2xl border border-[#D4AF37]/40 shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex items-center justify-center cursor-pointer group"
          onClick={handleOpenEnvelope}
        >
          {/* Top Flap */}
          <motion.div
            animate={{
              rotateX: isOpen ? 180 : 0,
              zIndex: isOpen ? 0 : 20,
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ transformOrigin: "top center" }}
            className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-[#1c1c2b] to-[#12121c] rounded-t-2xl border-b border-[#D4AF37]/30 flex items-end justify-center pb-2 shadow-md"
          >
            {/* Flap fold pattern */}
            <div className="w-0 h-0 border-l-[150px] sm:border-l-[210px] border-l-transparent border-r-[150px] sm:border-r-[210px] border-r-transparent border-t-[100px] sm:border-t-[135px] border-t-[#181826]/80 absolute top-0" />
          </motion.div>

          {/* Golden Wax Seal */}
          <AnimatePresence>
            {!isOpen && (
              <motion.div
                initial={{ scale: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute z-30 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#D4AF37] via-[#AA820A] to-[#604905] border-2 border-[#FFF5D4] shadow-[0_0_25px_rgba(212,175,55,0.6)] flex flex-col items-center justify-center text-black font-serif-arabic font-bold text-sm sm:text-base group-hover:scale-110 transition-transform"
              >
                <span>H & H</span>
                <Sparkles className="w-3 h-3 text-white mt-0.5 animate-spin" style={{ animationDuration: "4s" }} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Inside Card Preview sliding up */}
          <motion.div
            animate={{
              y: isOpen ? -120 : 0,
              scale: isOpen ? 1.05 : 0.95,
              opacity: isOpen ? 1 : 0.8,
            }}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute z-10 w-[88%] h-[85%] glass-gold rounded-xl p-4 flex flex-col items-center justify-center text-center border border-[#D4AF37]/50 shadow-2xl"
          >
            <Mail className="w-8 h-8 text-[#D4AF37] mb-2" />
            <p className="text-xs text-[#D4AF37] font-semibold">بطاقة الدعوة الرسمية</p>
            <h3 className="text-lg font-serif-arabic text-[#F4F1EA] font-bold mt-1">
              {weddingConfig.groom} & {weddingConfig.bride}
            </h3>
          </motion.div>

          {/* Envelope Bottom Front Flap */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#0E0E17] rounded-b-2xl border-t border-[#D4AF37]/20 z-20 pointer-events-none" />
        </motion.div>
      </div>

      {/* Trigger Button */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 z-10"
        >
          <button
            onClick={handleOpenEnvelope}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA820A] text-black font-bold text-sm hover:scale-105 transition-all shadow-xl shadow-[#D4AF37]/30 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>افتح الدعوة</span>
          </button>
        </motion.div>
      )}
    </div>
  );
};
