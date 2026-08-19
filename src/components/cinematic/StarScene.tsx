"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { soundEngine } from "@/components/ui/SoundFx";

interface StarSceneProps {
  onComplete: () => void;
  onOpenEasterEgg?: () => void;
}

export const StarScene: React.FC<StarSceneProps> = ({ onComplete, onOpenEasterEgg }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [progress, setProgress] = useState<number>(0); // 0 (separated) to 1 (merged)
  const [isMerged, setIsMerged] = useState<boolean>(false);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Mouse move parallax listener
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseRef.current = {
        x: (e.clientX - innerWidth / 2) / (innerWidth / 2),
        y: (e.clientY - innerHeight / 2) / (innerHeight / 2),
      };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // HTML5 Canvas Starfield rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Background static stars
    const backgroundStars = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.02 + 0.005,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Deep space gradient
      const bgGrad = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        50,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height)
      );
      bgGrad.addColorStop(0, "#0a0a14");
      bgGrad.addColorStop(1, "#050507");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render background stars with subtle parallax
      const mx = mouseRef.current.x * 15;
      const my = mouseRef.current.y * 15;

      backgroundStars.forEach((star) => {
        star.alpha += star.speed;
        if (star.alpha > 1 || star.alpha < 0.2) star.speed = -star.speed;

        ctx.fillStyle = `rgba(244, 241, 234, ${Math.max(0.1, star.alpha)})`;
        ctx.beginPath();
        ctx.arc(star.x + mx * 0.3, star.y + my * 0.3, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Calculate position of Star 1 (Huzeyfa) & Star 2 (Hawraa)
      const centerY = canvas.height / 2;
      const initialDistance = Math.min(canvas.width * 0.3, 220);
      const currentDistance = initialDistance * (1 - progress);

      const star1X = canvas.width / 2 + currentDistance + mx * 0.8;
      const star1Y = centerY + my * 0.8;

      const star2X = canvas.width / 2 - currentDistance + mx * 0.8;
      const star2Y = centerY + my * 0.8;

      // Draw Light Trails between stars
      if (progress > 0.1 && progress < 1) {
        ctx.strokeStyle = `rgba(212, 175, 55, ${progress * 0.4})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(star1X, star1Y);
        ctx.bezierCurveTo(
          canvas.width / 2,
          centerY - 40 * progress,
          canvas.width / 2,
          centerY + 40 * progress,
          star2X,
          star2Y
        );
        ctx.stroke();
      }

      // Draw Star 1 Glow (Huzeyfa)
      const grad1 = ctx.createRadialGradient(star1X, star1Y, 0, star1X, star1Y, 35);
      grad1.addColorStop(0, "rgba(255, 245, 212, 1)");
      grad1.addColorStop(0.3, "rgba(212, 175, 55, 0.8)");
      grad1.addColorStop(1, "rgba(212, 175, 55, 0)");
      ctx.fillStyle = grad1;
      ctx.beginPath();
      ctx.arc(star1X, star1Y, 35, 0, Math.PI * 2);
      ctx.fill();

      // Draw Star 2 Glow (Hawraa)
      const grad2 = ctx.createRadialGradient(star2X, star2Y, 0, star2X, star2Y, 35);
      grad2.addColorStop(0, "rgba(255, 245, 212, 1)");
      grad2.addColorStop(0.3, "rgba(212, 175, 55, 0.8)");
      grad2.addColorStop(1, "rgba(212, 175, 55, 0)");
      ctx.fillStyle = grad2;
      ctx.beginPath();
      ctx.arc(star2X, star2Y, 35, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, [progress]);

  // Handle Merging Progress Animation
  const triggerMerge = useCallback(() => {
    soundEngine.playBurst();
    let current = 0;
    const interval = setInterval(() => {
      current += 0.03;
      if (current >= 1) {
        current = 1;
        clearInterval(interval);
        setIsMerged(true);
        soundEngine.playChime();
        setTimeout(() => {
          onComplete();
        }, 2200);
      }
      setProgress(current);
    }, 30);
  }, [onComplete]);

  return (
    <div className="relative w-full h-screen bg-[#050507] overflow-hidden flex flex-col items-center justify-between py-12 px-6">
      {/* Interactive HTML5 Canvas Starfield */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Header Info */}
      <div className="relative z-10 text-center mt-8">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs uppercase tracking-widest text-[#D4AF37] font-medium mb-2"
        >
          حكاية أرواح
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl sm:text-2xl font-serif-arabic text-[#F4F1EA]"
        >
          نجمتان في السماء تتقاربان... لتضيئا درباً واحداً
        </motion.h2>
      </div>

      {/* Center Infinity Symbol & Merger Trigger */}
      <div className="relative z-10 my-auto text-center">
        {progress > 0.4 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: isMerged ? 1.5 : 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            onClick={onOpenEasterEgg}
            className="cursor-pointer group"
            title="انقر لفتح السر"
          >
            <span className="text-5xl sm:text-7xl font-serif-arabic text-gold-gradient text-gold-glow select-none inline-block group-hover:scale-110 transition-transform">
              ∞
            </span>
          </motion.div>
        )}

        {!isMerged && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <button
              onClick={triggerMerge}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-[#D4AF37]/30 to-[#AA820A]/30 border border-[#D4AF37] text-[#F3E5AB] font-medium text-sm hover:scale-105 hover:bg-[#D4AF37]/40 transition-all shadow-xl shadow-[#D4AF37]/20"
            >
              دع النجمتين تلتقيان ✨
            </button>
          </motion.div>
        )}
      </div>

      {/* Footer Instructions */}
      <div className="relative z-10 text-center mb-4">
        <p className="text-xs text-[#A3A19B] font-sans-arabic">
          حذيفة & حوراء
        </p>
      </div>
    </div>
  );
};
