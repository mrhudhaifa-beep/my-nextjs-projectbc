"use client";

import React from "react";
import { motion } from "framer-motion";
import { weddingConfig } from "@/config/wedding.config";
import { Calendar, Clock, MapPin, Sparkles } from "lucide-react";

export const EventDetails: React.FC = () => {
  const { event, groom, bride } = weddingConfig;

  return (
    <div className="max-w-2xl w-full mx-auto my-12 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#D4AF37]/30 shadow-xl"
      >
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-[#D4AF37]" />
          <h3 className="text-xl font-serif-arabic text-[#F4F1EA] font-bold">
            تفاصيل الحفل
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-right">
          {/* Item: المناسبة */}
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-[#A3A19B] font-sans-arabic">المناسبة</p>
              <p className="text-base font-serif-arabic text-[#F4F1EA] font-semibold mt-0.5">
                {event.type}
              </p>
            </div>
          </div>

          {/* Item: العروسان */}
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-[#A3A19B] font-sans-arabic">العروسان</p>
              <p className="text-base font-serif-arabic text-[#F4F1EA] font-semibold mt-0.5">
                {groom} & {bride}
              </p>
            </div>
          </div>

          {/* Item: التاريخ */}
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-[#A3A19B] font-sans-arabic">التاريخ</p>
              <p className="text-base font-serif-arabic text-[#F4F1EA] font-semibold mt-0.5">
                {event.day}، 27 أغسطس 2026
              </p>
            </div>
          </div>

          {/* Item: الوقت (إذا تم تحديده) */}
          {event.time ? (
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
              <div className="w-10 h-10 rounded-full bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-[#A3A19B] font-sans-arabic">الوقت</p>
                <p className="text-base font-serif-arabic text-[#F4F1EA] font-semibold mt-0.5">
                  {event.time}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
              <div className="w-10 h-10 rounded-full bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-[#A3A19B] font-sans-arabic">التوقيت</p>
                <p className="text-sm font-sans-arabic text-[#F3E5AB] mt-0.5">
                  سيتم التأكيد قريباً
                </p>
              </div>
            </div>
          )}

          {/* Item: المكان (إذا تم تحديده) */}
          {event.venue && (
            <div className="sm:col-span-2 flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
              <div className="w-10 h-10 rounded-full bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-[#A3A19B] font-sans-arabic">المكان والعرينة</p>
                <p className="text-base font-serif-arabic text-[#F4F1EA] font-semibold mt-0.5">
                  {event.venue} {event.address ? `- ${event.address}` : ""}
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
