"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { weddingConfig } from "@/config/wedding.config";
import { Sparkles, Heart } from "lucide-react";

export const PhotoStory: React.FC = () => {
  const { photos } = weddingConfig.story;
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);

  return (
    <div className="relative w-full py-16 px-6 bg-[#050507] flex flex-col items-center">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-medium">
          معرض الذكريات
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif-arabic text-[#F4F1EA] mt-1 font-bold">
          مشاهد من الحكاية
        </h2>
      </motion.div>

      {/* Photo Showcase Container */}
      <div className="relative max-w-4xl w-full">
        {photos && photos.length > 0 ? (
          <div className="space-y-12">
            {/* Active Highlight Photo */}
            <motion.div
              key={photos[activePhotoIndex].id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full h-[320px] sm:h-[450px] rounded-3xl overflow-hidden glass-gold border border-[#D4AF37]/30 shadow-2xl flex items-center justify-center p-2"
            >
              {/* Ken Burns Animated Overlay Background */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10" />

              {/* Placeholder / Image element */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br from-[#12121c] via-[#0A0A0F] to-[#201618]">
                <div className="absolute inset-0 bg-radial from-[#D4AF37]/10 to-transparent animate-pulse-glow" />

                <Heart className="w-16 h-16 text-[#D4AF37]/40 mb-4 animate-bounce" />
                <p className="text-lg font-serif-arabic text-[#F3E5AB] font-semibold z-20">
                  {photos[activePhotoIndex].caption}
                </p>
                <p className="text-xs text-[#A3A19B] mt-1 z-20 font-sans-arabic">
                  حذيفة & حوراء
                </p>
              </div>

              {/* Caption Overlay */}
              <div className="absolute bottom-6 right-8 z-20 max-w-md">
                <span className="text-xs text-[#D4AF37] tracking-widest font-mono">
                  0{activePhotoIndex + 1} / 0{photos.length}
                </span>
                <h4 className="text-xl font-serif-arabic text-white font-bold mt-1">
                  {photos[activePhotoIndex].caption}
                </h4>
              </div>
            </motion.div>

            {/* Thumbnails */}
            <div className="flex items-center justify-center gap-4">
              {photos.map((photo, idx) => (
                <button
                  key={photo.id}
                  onClick={() => setActivePhotoIndex(idx)}
                  className={`relative px-4 py-2 rounded-full border text-xs font-medium transition-all ${
                    activePhotoIndex === idx
                      ? "border-[#D4AF37] bg-[#D4AF37]/20 text-[#F3E5AB] scale-105"
                      : "border-white/10 bg-white/5 text-[#A3A19B] hover:text-white"
                  }`}
                >
                  {photo.caption}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="glass-panel p-8 rounded-2xl text-center">
            <Sparkles className="w-8 h-8 text-[#D4AF37] mx-auto mb-2" />
            <p className="text-sm text-[#A3A19B]">معرض الصور قيد التجهيز</p>
          </div>
        )}
      </div>
    </div>
  );
};
