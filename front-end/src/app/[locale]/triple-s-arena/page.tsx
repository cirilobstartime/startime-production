import FeaturesGrid from "@/components/triple-s-arena/FeaturesGrid";
import ArenaHero from "@/components/triple-s-arena/HeroSection";
import ArenaSection from "@/components/triple-s-arena/ArenaSection";
import LoginBanners from "@/components/triple-s-arena/LoginBanners";
import ArenaFooter from "@/components/triple-s-arena/ArenaFooter";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title:
      locale === "ar"
        ? "تريبل إس أرينا | ستارتايم"
        : "Triple S Arena | Startime",

    description:
      locale === "ar"
        ? "اكتشف تريبل إس أرينا، الوجهة المتميزة للفعاليات والتجارب الاستثنائية."
        : "Discover Triple S Arena, a premier destination for events and unforgettable experiences.",

    alternates: {
      canonical: `https://startime.sa/${locale}/triple-s-arena`,

      languages: {
        en: "https://startime.sa/en/triple-s-arena",
        ar: "https://startime.sa/ar/triple-s-arena",

        "x-default":
          "https://startime.sa/en/triple-s-arena",
      },
    },
  };
}

export default async function TripleSArenaPage({ params }: Props) {
  const { locale } = await params;

  return (
    <main className="min-h-screen bg-white">
      <ArenaHero locale={locale} />
      <FeaturesGrid locale={locale} />
      <ArenaSection locale={locale} />
      <LoginBanners locale={locale} />
      <ArenaFooter locale={locale} />
    </main>
  );
}
