"use client";

import GlobeCaseStudy from "@/components/CaseStudy/GlobeCaseStudy";
import dynamic from "next/dynamic";

const HeroSection = dynamic(
  () => import("@/components/CaseStudy/HeroSection")
);

const CaseStudiesGrid = dynamic(
  () => import("@/components/CaseStudy/CaseCard")
);

const PortfolioGrid = dynamic(
  () =>
    import("@/components/CaseStudy/CategoryGrid").then(
      (mod) => mod.PortfolioGrid
    )
);

import { useState } from "react";

export default function PortfolioClient() {
  const [isIntroFinished, setIsIntroFinished] = useState(false);

  return (
    <div className="bg-dark-bg min-h-screen">
      <GlobeCaseStudy onComplete={() => setIsIntroFinished(true)} />

      {isIntroFinished && (
        <div className="animate-in fade-in duration-1000">
          <HeroSection />
          <CaseStudiesGrid />
          <PortfolioGrid />
        </div>
      )}
    </div>
  );
}