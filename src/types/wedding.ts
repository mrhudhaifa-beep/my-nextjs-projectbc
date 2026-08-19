export interface StoryMilestone {
  id: string;
  stage: string;       // e.g., "البداية"
  title: string;       // e.g., "كل شيء بدأ من لحظة..."
  description?: string;
  dateStr?: string;
}

export interface PhotoItem {
  id: string;
  src: string;
  caption: string;
  alt: string;
}

export interface WeddingConfig {
  groom: string;
  bride: string;
  initials: string;

  event: {
    type: string;
    date: string;          // YYYY-MM-DD
    day: string;           // e.g., "الخميس"
    dateArabic: string;    // e.g., "27 أغسطس 2026" / "27 آب 2026"
    time: string;          // e.g., "08:00 مساءً" (can be empty)
    venue: string;         // e.g., "قاعة الأسطورة" (can be empty)
    address: string;       // e.g., "بغداد، العراق" (can be empty)
    mapsUrl: string;       // Google Maps link (can be empty)
  };

  music: {
    enabled: boolean;
    src: string;           // e.g., "/audio/music.mp3"
  };

  invitation: {
    intro: string;
    subtitle: string;
    cardHeader: string;
    cardSubheader: string;
  };

  story: {
    enabled: boolean;
    milestones: StoryMilestone[];
    photos: PhotoItem[];
  };

  easterEgg: {
    enabled: boolean;
    hint: string;
    secretMessage: string;
  };
}

export type SceneId = 
  | "intro"
  | "stars"
  | "reveal"
  | "story"
  | "envelope"
  | "invitation"
  | "final";
