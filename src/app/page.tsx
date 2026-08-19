"use client";

import React, { useState, useEffect } from "react";
import Lenis from "lenis";
import { SceneId } from "@/types/wedding";
import { ProgressIndicator } from "@/components/ui/ProgressIndicator";
import { MusicController } from "@/components/media/MusicController";
import { EasterEggModal } from "@/components/ui/EasterEggModal";

import { IntroScene } from "@/components/cinematic/IntroScene";
import { StarScene } from "@/components/cinematic/StarScene";
import { CoupleReveal } from "@/components/cinematic/CoupleReveal";
import { StoryTimeline } from "@/components/cinematic/StoryTimeline";
import { PhotoStory } from "@/components/cinematic/PhotoStory";
import { EnvelopeScene } from "@/components/cinematic/EnvelopeScene";
import { InvitationCard } from "@/components/invitation/InvitationCard";
import { EventDetails } from "@/components/invitation/EventDetails";
import { Countdown } from "@/components/invitation/Countdown";
import { LocationCard } from "@/components/invitation/LocationCard";
import { FinalScene } from "@/components/cinematic/FinalScene";

export default function Home() {
  const [currentScene, setCurrentScene] = useState<SceneId>("intro");
  const [isEasterEggOpen, setIsEasterEggOpen] = useState<boolean>(false);

  // Initialize Lenis smooth scroll engine
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleSelectScene = (scene: SceneId) => {
    setCurrentScene(scene);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="relative min-h-screen bg-[#050507] text-[#F4F1EA] overflow-x-hidden selection:bg-[#D4AF37]/30">
      {/* Top Scene Progress & Navigation Bar */}
      <ProgressIndicator
        currentScene={currentScene}
        onSelectScene={handleSelectScene}
      />

      {/* Ambient Music & Sound Controller */}
      <MusicController audioSrc="/audio/music.mp3" />

      {/* Secret Easter Egg Modal */}
      <EasterEggModal
        isOpen={isEasterEggOpen}
        onClose={() => setIsEasterEggOpen(false)}
      />

      {/* Scene Orchestrator */}
      {currentScene === "intro" && (
        <IntroScene onComplete={() => setCurrentScene("stars")} />
      )}

      {currentScene === "stars" && (
        <StarScene
          onComplete={() => setCurrentScene("reveal")}
          onOpenEasterEgg={() => setIsEasterEggOpen(true)}
        />
      )}

      {currentScene === "reveal" && (
        <CoupleReveal onNext={() => setCurrentScene("story")} />
      )}

      {currentScene === "story" && (
        <div className="space-y-12">
          <StoryTimeline onNext={() => setCurrentScene("envelope")} />
          <PhotoStory />
        </div>
      )}

      {currentScene === "envelope" && (
        <EnvelopeScene onOpen={() => setCurrentScene("invitation")} />
      )}

      {currentScene === "invitation" && (
        <div className="py-24 px-6 space-y-16 max-w-5xl mx-auto">
          <InvitationCard />
          <Countdown />
          <EventDetails />
          <LocationCard />

          <div className="text-center pt-8">
            <button
              onClick={() => setCurrentScene("final")}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-black font-bold text-sm hover:scale-105 transition-all shadow-xl shadow-[#D4AF37]/30"
            >
              عرض المشهد الختامي ✨
            </button>
          </div>
        </div>
      )}

      {currentScene === "final" && <FinalScene />}
    </main>
  );
}
