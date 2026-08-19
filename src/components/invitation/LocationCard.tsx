"use client";

import React from "react";
import { motion } from "framer-motion";
import { weddingConfig } from "@/config/wedding.config";
import { MapPin, ExternalLink } from "lucide-react";
import { soundEngine } from "@/components/ui/SoundFx";

export const LocationCard: React.FC = () => {
  const { event } = weddingConfig;
  const hasLocation = Boolean(event.mapsUrl || event.venue);

  return (
    <div className="max-w-xl w-full mx-auto my-12 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#D4AF37]/30 shadow-xl text-center"
      >
        <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center mx-auto mb-4">
          <MapPin className="w-6 h-6 text-[#F3E5AB]" />
        </div>

        <h3 className="text-xl font-serif-arabic text-[#F4F1EA] font-bold mb-2">
          موقع الحفل
        </h3>

        {hasLocation ? (
          <div>
            <p className="text-base font-serif-arabic text-gold-gradient font-bold mb-1">
              {event.venue}
            </p>
            {event.address && (
              <p className="text-sm text-[#A3A19B] font-sans-arabic mb-6">
                {event.address}
              </p>
            )}

            {event.mapsUrl && (
              <a
                href={event.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundEngine.playClick()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-black font-semibold text-sm hover:scale-105 transition-all shadow-lg shadow-[#D4AF37]/20"
              >
                <span>افتح الموقع في Google Maps</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        ) : (
          <div className="py-4">
            <p className="text-sm text-[#A3A19B] font-sans-arabic">
              سيتم الإعلان عن اسم القاعة ورابط الموقع الدقيق قريباً 📍
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};
