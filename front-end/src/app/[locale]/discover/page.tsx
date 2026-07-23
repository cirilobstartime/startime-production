import React from "react";
import HeroSection from "@/components/About/hero-section";
import MissionSection from "@/components/About/mission-section";
import JourneyBanner from "@/components/About/client-logos";
import TimelineSection from "@/components/About/Timeline";
import CEOSection from "@/components/About/team-section";
import GovernanceSection from "@/components/About/values-section";
import type { Metadata } from "next";

interface PageProps {
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
        ? "اكتشف | ستارتايم"
        : "Discover | Startime",

    description:
      locale === "ar"
        ? "تعرف على رحلة ستارتايم."
        : "Learn more about Startime's journey.",

    alternates: {
      canonical: `https://startime.sa/${locale}/discover`,

      languages: {
        en: "https://startime.sa/en/discover",
        ar: "https://startime.sa/ar/discover",

        "x-default":
          "https://startime.sa/en/discover",
      },
    },
  };
}

export default function AboutPage({ params }: PageProps) {
  const { locale } = React.use(params);

  const isAr = locale === "ar";

  return (
    <main
      className={`bg-black min-h-screen relative selection:bg-primary selection:text-white
      }`}
      dir={isAr ? "rtl" : "ltr"}
    >
      <HeroSection locale={locale} />
      <MissionSection locale={locale}/>
      <JourneyBanner locale={locale}/>
      <TimelineSection locale={locale}/>
      
      <CEOSection locale={locale}/>
      <GovernanceSection />
    </main>
  );
}
