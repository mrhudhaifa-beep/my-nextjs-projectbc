"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronDown, Download, ExternalLink } from "lucide-react";
import { weddingConfig } from "@/config/wedding.config";
import { generateGoogleCalendarUrl, downloadIcsFile } from "@/lib/utils";
import { soundEngine } from "@/components/ui/SoundFx";

export const CalendarButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const title = `حفل خطوبة ${weddingConfig.groom} و ${weddingConfig.bride}`;
  const description = `نتشرف بدعوتكم لمشاركتنا فرحة خطوبتنا في هذا اليوم المميز ✨🤍`;
  const location = weddingConfig.event.venue || "سيتم التأكيد قريباً";

  const handleGoogleCalendar = () => {
    soundEngine.playClick();
    const url = generateGoogleCalendarUrl(
      title,
      description,
      location,
      weddingConfig.event.date
    );
    window.open(url, "_blank");
    setIsOpen(false);
  };

  const handleIcsDownload = () => {
    soundEngine.playClick();
    downloadIcsFile(title, description, location);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-center my-6">
      <button
        onClick={() => {
          soundEngine.playClick();
          setIsOpen(!isOpen);
        }}
        className="px-6 py-3 rounded-full glass-gold border border-[#D4AF37]/50 text-[#F3E5AB] font-semibold text-sm hover:scale-105 transition-all shadow-xl shadow-[#D4AF37]/20 flex items-center gap-2 mx-auto"
      >
        <Calendar className="w-4 h-4 text-[#D4AF37]" />
        <span>أضف الموعد إلى التقويم</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute left-1/2 -translate-x-1/2 mt-3 w-56 glass-panel rounded-2xl p-2 border border-[#D4AF37]/40 shadow-2xl z-40 space-y-1"
          >
            <button
              onClick={handleGoogleCalendar}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-right text-xs font-medium text-[#F4F1EA] hover:bg-[#D4AF37]/20 hover:text-[#F3E5AB] transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-[#D4AF37]" />
              <span>Google Calendar</span>
            </button>

            <button
              onClick={handleIcsDownload}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-right text-xs font-medium text-[#F4F1EA] hover:bg-[#D4AF37]/20 hover:text-[#F3E5AB] transition-colors"
            >
              <Download className="w-4 h-4 text-[#D4AF37]" />
              <span>Apple / Outlook (iCal .ics)</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
