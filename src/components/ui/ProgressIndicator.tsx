"use client";

import React from "react";
import { SceneId } from "@/types/wedding";

interface ProgressIndicatorProps {
  currentScene: SceneId;
  onSelectScene: (scene: SceneId) => void;
}

const scenes: { id: SceneId; label: string; indexStr: string }[] = [
  { id: "intro", label: "البداية", indexStr: "01" },
  { id: "stars", label: "النجمتان", indexStr: "02" },
  { id: "reveal", label: "الأسماء", indexStr: "03" },
  { id: "story", label: "حكايتنا", indexStr: "04" },
  { id: "envelope", label: "الظرف", indexStr: "05" },
  { id: "invitation", label: "الدعوة والتفاصيل", indexStr: "06" },
];

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentScene,
  onSelectScene,
}) => {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 md:gap-3 bg-[#0A0A0F]/80 backdrop-blur-md px-4 py-2 rounded-full border border-[#D4AF37]/20 shadow-2xl transition-all duration-300">
      <div className="flex items-center gap-1.5 md:gap-2">
        {scenes.map((s) => {
          const isActive = currentScene === s.id;
          return (
            <button
              key={s.id}
              onClick={() => onSelectScene(s.id)}
              title={s.label}
              className={`flex items-center gap-1 text-xs md:text-sm px-2 py-1 rounded-full transition-all duration-300 ${
                isActive
                  ? "bg-[#D4AF37]/20 text-[#F3E5AB] border border-[#D4AF37]/40 font-medium scale-105"
                  : "text-[#A3A19B] hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="opacity-70 text-[10px] md:text-xs font-mono">{s.indexStr}</span>
              <span className="hidden sm:inline">{s.label}</span>
            </button>
          );
        })}
      </div>

      <div className="w-[1px] h-4 bg-[#D4AF37]/20 mx-1" />

      {/* Skip Button */}
      {currentScene !== "invitation" && currentScene !== "final" && (
        <button
          onClick={() => onSelectScene("invitation")}
          className="text-xs text-[#D4AF37] hover:text-[#F3E5AB] underline underline-offset-4 font-medium transition-all px-2 py-1"
        >
          تخطي للبطاقة
        </button>
      )}
    </div>
  );
};
