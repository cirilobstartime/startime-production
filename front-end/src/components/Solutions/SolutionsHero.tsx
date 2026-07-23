import React from "react";
import Image from "next/image";
import { fetchAPI } from "@/lib/api";
import SolutionsStats from "./SolutionsStats"; // هنكريته في الخطوة الجاية

interface SolutionsHeroProps {
  locale: string;
}

export default async function SolutionsHero({ locale }: SolutionsHeroProps) {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_BASE_URL;

  // Fetch البيانات مباشرة في السيرفر
  const [heroRes, statsRes] = await Promise.all([
    fetchAPI<any>("soulation-banner-headers", locale),
    fetchAPI<any>("solution-second-banners", locale),
  ]);

  const heroData = heroRes?.data?.[0];
  const statsData = statsRes?.data?.[0];

  const bgUrl = heroData?.background?.url
    ? `${STRAPI_URL}${heroData.background.url}`
    : null;

  return (
    <>
      {/* Section 1: Banner  */}
      <section className="relative w-full min-h-[60vh] flex items-center justify-center bg-black overflow-hidden">
        <div className="absolute inset-0 z-0">
          {bgUrl && (
            <Image
              src={bgUrl}
              alt="Banner"
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl text-white leading-tight tracking-tight">
            {heroData?.title || ""}
          </h1>
        </div>
      </section>

      {/* Section 2: Stats */}
      <SolutionsStats
        description={statsData?.title || ""}
        items={statsData?.cointiner || []}
      />
    </>
  );
}
