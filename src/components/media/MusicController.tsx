"use client";

import React, { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";
import { soundEngine } from "@/components/ui/SoundFx";

interface MusicControllerProps {
  audioSrc?: string;
}

export const MusicController: React.FC<MusicControllerProps> = ({
  audioSrc = "/audio/music.mp3",
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create background audio element
    const audio = new Audio(audioSrc);
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, [audioSrc]);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Audio autoplay prevented fallback
          setIsPlaying(false);
        });
    }
  };

  const toggleSoundFx = (e: React.MouseEvent) => {
    e.stopPropagation();
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Sound FX Mute Toggle */}
      <button
        onClick={toggleSoundFx}
        className="w-10 h-10 rounded-full bg-[#0A0A0F]/80 backdrop-blur-md border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:border-[#D4AF37] hover:scale-105 transition-all shadow-lg"
        title={isMuted ? "تفعيل الأصوات التفاعلية" : "كتم الأصوات التفاعلية"}
      >
        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>

      {/* Main Music Toggle */}
      <button
        onClick={toggleMusic}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-full backdrop-blur-md border transition-all duration-300 shadow-xl ${
          isPlaying
            ? "bg-[#D4AF37]/20 border-[#D4AF37] text-[#F3E5AB] shadow-[#D4AF37]/20"
            : "bg-[#0A0A0F]/80 border-[#D4AF37]/30 text-[#A3A19B] hover:text-white"
        }`}
      >
        <Music className={`w-4 h-4 ${isPlaying ? "animate-spin" : ""}`} style={{ animationDuration: "6s" }} />
        <span className="text-xs font-medium">
          {isPlaying ? "إيقاف الموسيقى" : "تشغيل الموسيقى"}
        </span>

        {/* Animated Sound Waves */}
        {isPlaying && (
          <div className="flex items-end gap-0.5 h-3 mr-1">
            <span className="w-0.5 h-3 bg-[#D4AF37] animate-pulse" style={{ animationDelay: "0ms" }} />
            <span className="w-0.5 h-2 bg-[#D4AF37] animate-pulse" style={{ animationDelay: "150ms" }} />
            <span className="w-0.5 h-3.5 bg-[#D4AF37] animate-pulse" style={{ animationDelay: "300ms" }} />
          </div>
        )}
      </button>
    </div>
  );
};
