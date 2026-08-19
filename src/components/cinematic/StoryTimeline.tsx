"use client";

import React from "react";
import { motion } from "framer-motion";
import { weddingConfig } from "@/config/wedding.config";
import { soundEngine } from "@/components/ui/SoundFx";

interface StoryTimelineProps {
  onNext: () => void;
}

export const StoryTimeline: React.FC<StoryTimelineProps> = ({ onNext }) => {
  const { milestones } = weddingConfig.story;

  return (
    <div className="relative w-full min-h-screen bg-[#050507] py-20 px-6 flex flex-col items-center justify-center">
      {/* Background Lighting */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-3xl pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-medium">
          رحلة القلوب
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif-arabic text-[#F4F1EA] mt-2 font-bold">
          محطات حكايتنا
        </h2>
        <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-4" />
      </motion.div>

      {/* Timeline Container */}
      <div className="relative max-w-2xl w-full">
        {/* Central Vertical Gold Line */}
        <div className="absolute right-1/2 translate-x-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#D4AF37]/20 via-[#D4AF37]/60 to-[#D4AF37]/20 hidden sm:block" />

        <div className="space-y-10 sm:space-y-12">
          {milestones.map((m, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className={`relative flex flex-col sm:flex-row items-center gap-6 ${
                  isEven ? "sm:flex-row-reverse text-right" : "sm:flex-row text-right"
                }`}
              >
                {/* Timeline Card */}
                <div className="w-full sm:w-1/2 glass-panel p-6 rounded-2xl border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all shadow-xl">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#D4AF37]/15 text-[#F3E5AB] text-xs font-semibold mb-3">
                    {m.stage}
                  </span>
                  <h3 className="text-lg sm:text-xl font-serif-arabic text-[#F4F1EA] mb-2 font-bold leading-snug">
                    {m.title}
                  </h3>
                  {m.description && (
                    <p className="text-sm text-[#A3A19B] font-sans-arabic leading-relaxed">
                      {m.description}
                    </p>
                  )}
                </div>

                {/* Center Node Dot */}
                <div className="absolute right-1/2 translate-x-1/2 w-4 h-4 rounded-full bg-[#D4AF37] border-4 border-[#050507] shadow-[0_0_12px_rgba(212,175,55,0.8)] hidden sm:block" />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Next Scene Button */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-16 text-center"
      >
        <button
          onClick={() => {
            soundEngine.playClick();
            onNext();
          }}
          className="px-8 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-black font-semibold text-sm hover:scale-105 transition-all shadow-lg shadow-[#D4AF37]/20"
        >
          انتقل إلى معرض الصور والظرف ✉️
        </button>
      </motion.div>
    </div>
  );
};
