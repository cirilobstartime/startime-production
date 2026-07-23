import { ContactHeader } from '@/components/JoinUs/ContactHeader'
import { Hero } from '@/components/JoinUs/hero'
import { JoinUsSection } from '@/components/JoinUs/JoinUsSection'
import { FeatureSection } from '@/components/JoinUs/SubHero'
import { TeamSection } from '@/components/JoinUs/TeamSection'
import React from 'react'
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title:
      locale === "ar"
        ? "انضم إلينا | ستارتايم"
        : "Join Us | Startime",

    description:
      locale === "ar"
        ? "استكشف الفرص المهنية المتاحة وانضم إلى فريق ستارتايم."
        : "Explore career opportunities and join the Startime team.",

    alternates: {
      canonical: `https://startime.sa/${locale}/join-us`,

      languages: {
        en: "https://startime.sa/en/join-us",
        ar: "https://startime.sa/ar/join-us",

        "x-default":
          "https://startime.sa/en/join-us",
      },
    },
  };
}

export default function JoinusPage() {
  return (
    <div>
      <Hero/>
      <FeatureSection/>
      {/* <ContactHeader/> */}
<TeamSection/>
      <JoinUsSection/>
    </div>
  )
}
