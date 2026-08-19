"use client";

import React from "react";
import { motion } from "framer-motion";
import { weddingConfig } from "@/config/wedding.config";
import { Heart, Sparkles } from "lucide-react";

export const InvitationCard: React.FC = () => {
  const { invitation, groom, bride, event } = weddingConfig;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative max-w-xl w-full mx-auto glass-gold p-8 sm:p-12 rounded-3xl text-center border-2 border-[#D4AF37]/50 shadow-[0_20px_80px_rgba(212,175,55,0.25)] overflow-hidden"
    >
      {/* Decorative Golden Corner Accents */}
      <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]" />
      <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37]" />
      <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#D4AF37]" />
      <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37]" />

      {/* Header Icon */}
      <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center mx-auto mb-6">
        <Heart className="w-6 h-6 text-[#F3E5AB] fill-[#D4AF37]" />
      </div>

      {/* Subtitles */}
      <p className="text-base sm:text-lg font-serif-arabic text-[#D4AF37] font-medium tracking-wide mb-1">
        {invitation.cardHeader}
      </p>

      <p className="text-sm sm:text-base font-sans-arabic text-[#A3A19B] mb-6">
        {invitation.cardSubheader}
      </p>

      {/* Groom & Bride Calligraphy Title */}
      <div className="my-8 py-4 border-y border-[#D4AF37]/20">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif-arabic font-bold text-gold-gradient text-gold-glow leading-tight">
          {groom} <span className="text-3xl sm:text-4xl text-[#F3E5AB] font-normal">&</span> {bride}
        </h1>
      </div>

      {/* Event Date Section */}
      <div className="mt-6 space-y-2">
        <span className="inline-block px-4 py-1 rounded-full bg-[#D4AF37]/15 text-[#F3E5AB] text-xs font-semibold uppercase tracking-widest">
          موعدنا المميز
        </span>
        <h3 className="text-2xl sm:text-3xl font-serif-arabic text-[#F4F1EA] font-bold">
          {event.day}
        </h3>
        <p className="text-xl sm:text-2xl font-serif-arabic text-gold-gradient font-semibold">
          27 أغسطس 2026
        </p>
        <p className="text-xs text-[#A3A19B] font-sans-arabic">
          (27 آب 2026)
        </p>
      </div>

      <div className="mt-8 flex items-center justify-center gap-2 text-xs text-[#D4AF37]">
        <Sparkles className="w-3.5 h-3.5" />
        <span>يسعدنا حضوركم لتكتمل فرحتنا</span>
        <Sparkles className="w-3.5 h-3.5" />
      </div>
    </motion.div>
  );
};
