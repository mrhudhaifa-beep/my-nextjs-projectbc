"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { weddingConfig } from "@/config/wedding.config";

interface EasterEggModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EasterEggModal: React.FC<EasterEggModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative max-w-md w-full glass-gold p-8 rounded-2xl text-center border border-[#D4AF37]/40 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 left-4 p-2 text-[#A3A19B] hover:text-white rounded-full bg-white/5 transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-[#F3E5AB] animate-pulse" />
            </div>

            <h3 className="text-xl font-serif-arabic text-[#F3E5AB] mb-3 font-bold">
              رسالة خاصة 🤍
            </h3>

            <p className="text-sm md:text-base leading-relaxed text-[#F4F1EA]/90 font-sans-arabic mb-6">
              {weddingConfig.easterEgg.secretMessage}
            </p>

            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-black font-semibold text-sm hover:brightness-110 transition-all shadow-lg shadow-[#D4AF37]/20"
            >
              إغلاق
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
