"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { weddingConfig } from "@/config/wedding.config";
import { CalendarButton } from "@/components/invitation/CalendarButton";
import { soundEngine } from "@/components/ui/SoundFx";
import { MapPin, Share2, Check, Sparkles } from "lucide-react";

export const FinalScene: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    soundEngine.playClick();
    const shareData = {
      title: `دعوة خطوبة ${weddingConfig.groom} & ${weddingConfig.bride}`,
      text: "دعوة سينمائية خاصة لحفل خطوبة حذيفة وحوراء ✨🤍",
      url: typeof window !== "undefined" ? window.location.href : "",
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // Fallback to clipboard
      }
    } else {
      navigator.clipboard.writeText(shareData.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#050507] py-20 px-6 flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Ambient Radial Lighting */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-radial from-[#D4AF37]/15 via-[#3D272A]/15 to-transparent blur-3xl" />

      {/* Merged Single Star Glowing Light */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: [1, 1.2, 1], opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2 }}
        className="w-4 h-4 rounded-full bg-[#FFF5D4] shadow-[0_0_35px_12px_rgba(212,175,55,0.9)] mb-8"
      />

      {/* Narrative Quotes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="space-y-4 max-w-xl"
      >
        <p className="text-xl sm:text-2xl font-serif-arabic text-[#F4F1EA]/80 font-medium">
          "وهذه ليست نهاية الحكاية..."
        </p>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-arabic font-bold text-gold-gradient text-gold-glow py-2">
          "إنها بداية العمر."
        </h2>
      </motion.div>

      {/* Groom & Bride Title */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
        className="my-8"
      >
        <h3 className="text-3xl sm:text-4xl font-serif-arabic text-[#F4F1EA] font-bold">
          {weddingConfig.groom} & {weddingConfig.bride}
        </h3>
        <p className="text-sm sm:text-base font-sans-arabic text-[#F3E5AB] mt-2">
          ننتظركم لنشارككم فرحة يومنا 🤍✨
        </p>
      </motion.div>

      {/* Action Buttons Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="flex flex-wrap items-center justify-center gap-4 max-w-lg w-full mt-6"
      >
        {/* Calendar Dropdown */}
        <CalendarButton />

        {/* Location Button (If available) */}
        {weddingConfig.event.mapsUrl && (
          <a
            href={weddingConfig.event.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundEngine.playClick()}
            className="px-6 py-3 rounded-full glass-panel border border-[#D4AF37]/30 text-[#F3E5AB] font-semibold text-sm hover:scale-105 transition-all shadow-lg flex items-center gap-2"
          >
            <MapPin className="w-4 h-4 text-[#D4AF37]" />
            <span>افتح الموقع</span>
          </a>
        )}

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-black font-bold text-sm hover:scale-105 transition-all shadow-xl shadow-[#D4AF37]/20 flex items-center gap-2"
        >
          {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
          <span>{copied ? "تم نسخ الرابط!" : "شارك الدعوة"}</span>
        </button>
      </motion.div>

      {/* Footer watermark */}
      <div className="mt-16 text-xs text-[#A3A19B] font-sans-arabic flex items-center gap-1">
        <Sparkles className="w-3 h-3 text-[#D4AF37]" />
        <span>دعوة سينمائية خاصة لحذيفة & حوراء - 2026</span>
      </div>
    </div>
  );
};
