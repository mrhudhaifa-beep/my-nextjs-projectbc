import type { Metadata } from "next";
import { Amiri, Alexandria } from "next/font/google";
import "./globals.css";

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

const alexandria = Alexandria({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-alexandria",
  display: "swap",
});

export const metadata: Metadata = {
  title: "حذيفة & حوراء | دعوة خطوبة سينمائية فاخرة",
  description: "دعوة تفاعلية سينمائية فاخرة لحفل خطوبة حذيفة وحوراء - الخميس 27 أغسطس 2026",
  keywords: ["حذيفة", "حوراء", "خطوبة", "دعوة إلكترونية", "دعوة سينمائية"],
  openGraph: {
    title: "دعوة خطوبة حذيفة & حوراء",
    description: "كل حكاية جميلة تبدأ بلحظة... لكن بعض اللحظات تصبح بداية العمر.",
    locale: "ar_AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${amiri.variable} ${alexandria.variable}`}>
      <body className="bg-[#050507] text-[#F4F1EA] antialiased selection:bg-[#d4af37]/30 selection:text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
