"use client";
import CaseStudiesGrid from "@/components/CaseStudy/CaseCard";
import {PortfolioGrid } from "@/components/CaseStudy/CategoryGrid";
import GlobeCaseStudy from "@/components/CaseStudy/GlobeCaseStudy";
import HeroSection from "@/components/CaseStudy/HeroSection";
import type { Metadata } from "next";

import { useState } from "react";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title:
      locale === "ar"
        ? "أعمالنا | ستارتايم"
        : "Portfolio | Startime",

    description:
      locale === "ar"
        ? "استعرض مشاريع ستارتايم وأبرز الأعمال التي نفذناها لعملائنا."
        : "Explore Startime's portfolio and discover the projects we have delivered for our clients.",

    alternates: {
      canonical: `https://startime.sa/${locale}/portfolio`,

      languages: {
        en: "https://startime.sa/en/portfolio",
        ar: "https://startime.sa/ar/portfolio",

        "x-default":
          "https://startime.sa/en/portfolio",
      },
    },
  };
}

export default function Home() {
  const [isIntroFinished, setIsIntroFinished] = useState(false);
  return (
    <div className="bg-dark-bg min-h-screen">
      <GlobeCaseStudy onComplete={() => setIsIntroFinished(true)} />
    
      {isIntroFinished && (
        <div className="animate-in fade-in duration-1000">
            <HeroSection/>
          <CaseStudiesGrid />
          <PortfolioGrid  />
        </div>
      )}
    </div>
  );
}
