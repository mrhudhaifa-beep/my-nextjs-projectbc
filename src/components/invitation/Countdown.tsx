"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { weddingConfig } from "@/config/wedding.config";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export const Countdown: React.FC = () => {
  const targetDateStr = weddingConfig.event.date; // "2026-08-27"

  const calculateTimeLeft = (): TimeLeft => {
    const target = new Date(`${targetDateStr}T20:00:00`).getTime();
    const now = new Date().getTime();
    const difference = target - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isExpired: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTwoDigits = (num: number) => String(num).padStart(2, "0");

  if (timeLeft.isExpired) {
    return (
      <div className="max-w-md w-full mx-auto my-8 glass-gold p-6 rounded-2xl text-center">
        <h3 className="text-2xl font-serif-arabic text-gold-gradient font-bold">
          بدأت حكايتنا... 🤍✨
        </h3>
      </div>
    );
  }

  const items = [
    { label: "يوم", value: formatTwoDigits(timeLeft.days) },
    { label: "ساعة", value: formatTwoDigits(timeLeft.hours) },
    { label: "دقيقة", value: formatTwoDigits(timeLeft.minutes) },
    { label: "ثانية", value: formatTwoDigits(timeLeft.seconds) },
  ];

  return (
    <div className="max-w-2xl w-full mx-auto my-12 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-6"
      >
        <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-medium">
          العد التنازلي للحدث
        </span>
        <h3 className="text-xl sm:text-2xl font-serif-arabic text-[#F4F1EA] mt-1 font-bold">
          المتبقي على يوم الخطوبة
        </h3>
      </motion.div>

      <div className="grid grid-cols-4 gap-3 sm:gap-6">
        {items.map((item, idx) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="glass-gold p-3 sm:p-5 rounded-2xl text-center border border-[#D4AF37]/30 shadow-lg flex flex-col items-center justify-center"
          >
            <span className="text-2xl sm:text-4xl md:text-5xl font-mono font-bold text-gold-gradient text-gold-glow">
              {item.value}
            </span>
            <span className="text-xs sm:text-sm text-[#A3A19B] font-sans-arabic mt-1">
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
