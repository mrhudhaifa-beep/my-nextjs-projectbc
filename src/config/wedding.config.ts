import { WeddingConfig } from "@/types/wedding";

export const weddingConfig: WeddingConfig = {
  groom: "حذيفة",
  bride: "حوراء",
  initials: "ح & ح",

  event: {
    type: "حفلة الخطوبة الفاخرة",
    date: "2026-08-27",
    day: "الخميس",
    dateArabic: "الخميس، 27 أغسطس 2026 (27 آب 2026)",
    time: "", // يمكن إضافته لاحقاً، مثال: "08:00 مساءً"
    venue: "", // يمكن إضافته لاحقاً، مثال: "قاعة رويال الفاخرة"
    address: "", // يمكن إضافته لاحقاً
    mapsUrl: "", // يمكن إضافته لاحقاً
  },

  music: {
    enabled: true,
    src: "/audio/music.mp3",
  },

  invitation: {
    intro: "كل حكاية جميلة تبدأ بلحظة...",
    subtitle: "لكن بعض اللحظات... تصبح بداية العمر.",
    cardHeader: "بكل حب وسعادة",
    cardSubheader: "نتشرف بدعوتكم لمشاركتنا فرحة خطوبتنا",
  },

  story: {
    enabled: true,
    milestones: [
      {
        id: "m1",
        stage: "البداية",
        title: "كل شيء بدأ من لحظة...",
        description: "همسة قدر هادئة غيّرت ملامح الطريق ورسمت نسيج الحكاية."
      },
      {
        id: "m2",
        stage: "اللقاء",
        title: "ثم جاءت اللحظة التي أصبح فيها شخصان... حكاية واحدة.",
        description: "تلاقت الأرواح قبل الكلمات، ليتجلّى الوعد الصادق."
      },
      {
        id: "m3",
        stage: "اليوم",
        title: "واليوم نصل إلى لحظة جديدة.",
        description: "لحظة نتوج فيها حكايتنا بأعذب العهود وأجمل الأماني."
      },
      {
        id: "m4",
        stage: "الفصل القادم",
        title: "فصل نريد أن يبدأ بمشاركتكم فرحتنا.",
        description: "أنتم الجمال الذي يكتمل به هذا اليوم والاستثناء في حكايتنا."
      }
    ],
    photos: [
      {
        id: "p1",
        src: "/images/photo1.jpg",
        caption: "تلاقي النور والروح",
        alt: "حذيفة وحوراء"
      },
      {
        id: "p2",
        src: "/images/photo2.jpg",
        caption: "بداية الأبدية",
        alt: "تفاصيل خطوبة حذيفة وحوراء"
      },
      {
        id: "p3",
        src: "/images/photo3.jpg",
        caption: "لحظات لا تُنسى",
        alt: "ذكريات حذيفة وحوراء"
      }
    ]
  },

  easterEgg: {
    enabled: true,
    hint: "انقر على رمز المالانهاية ∞ لفتح الرسالة السرية",
    secretMessage: "إذا وصلت إلى هنا... فربما كنت من الأشخاص الذين نحب وجودهم في هذه الحكاية. وجودكم يكمل فرحتنا ويسعد أرواحنا 🤍✨"
  }
};
