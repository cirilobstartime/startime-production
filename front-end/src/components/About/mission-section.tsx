"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface MissionSectionProps {
  locale: string;
}

interface BannerData {
  bannerTitle?: string;
  bannerSubtitle?: string;
  description?: string;
  imageUrl?: string;
}

export default function MissionSection({ locale }: MissionSectionProps) {
  const t = useTranslations("AboutPage");
  const isAr = locale === "ar";

  const [bannerData, setBannerData] = useState<BannerData | null>(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const baseUrl = "https://startime.sa";
        const apiUrl = `${baseUrl}/api/discover-second-banners?populate=*&locale=${locale}`;

        const response = await fetch(apiUrl, { cache: 'no-store' });
        const result = await response.json();

        const mainData = result?.data?.[0];

        if (mainData) {
          setBannerData({
            bannerTitle: mainData.banner_header?.title,
            bannerSubtitle: mainData.banner_header?.description,
            description: mainData.description,
            imageUrl: mainData.background?.url ? `${baseUrl}${mainData.background.url}` : undefined,
          });
        }
      } catch (error) {
        console.error("Error fetching mission banner:", error);
      }
    };

    fetchBanner();
  }, [locale]);

  return (
    <section
      className="relative w-full h-[70vh] md:h-[90vh] flex items-center justify-center overflow-hidden bg-black px-4 md:px-0"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        {bannerData?.imageUrl ? (
          <Image
            src={bannerData.imageUrl}
            alt="Mission Background"
            fill
            priority
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-[#1a1a1a]" />
        )}
        <div className="absolute inset-0 bg-black/55" />
      </div>

      {/* Text content directly over image */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 md:px-12 gap-6 max-w-6xl mx-auto"
      >
        {bannerData?.bannerTitle && (
          <p className="text-white/80 text-base sm:text-lg md:text-xl font-normal">
            {bannerData.bannerTitle}
          </p>
        )}

<h2
  className={`text-white font-bold text-center ${
    isAr
      ? "text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-normal max-w-5xl"
      : "text-2xl sm:text-3xl md:text-5xl lg:text-6xl leading-relaxed max-w-5xl"
  }`}
  style={{
    fontFamily: isAr
      ? "var(--font-noto-kufi), sans-serif"
      : "var(--font-roboto), sans-serif",
    lineHeight: isAr ? "1.60" : undefined,
  }}
>
  {bannerData?.bannerSubtitle || t("mission.text")}
</h2>

        {bannerData?.description && (
          <p className="text-white/70 text-sm sm:text-base md:text-lg leading-relaxed whitespace-pre-line max-w-3xl">
            {bannerData.description}
          </p>
        )}
      </motion.div>
    </section>
  );
}