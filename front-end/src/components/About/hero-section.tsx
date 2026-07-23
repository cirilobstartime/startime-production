"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { fetchAPI } from "@/lib/api";

interface HeroSectionProps {
  locale: string;
}

interface DiscoverHeader {
  title: string;
  description: string;
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_BASE_URL;

export default function HeroSection({ locale }: HeroSectionProps) {
  const t = useTranslations("AboutPage");
  const isAr = locale === "ar";

  const [headerData, setHeaderData] = useState<DiscoverHeader | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const [headerRes, videoRes] = await Promise.all([
          fetchAPI<any>("discover-headers", locale),
          fetchAPI<any>("discover-videos", locale),
        ]);

        if (headerRes?.data?.[0]?.header) {
          setHeaderData(headerRes.data[0].header);
        }

        const videoPath = videoRes?.data?.[0]?.about_video?.url;
        if (videoPath) {
          setVideoUrl(videoPath);
        }
      } catch (error) {
        console.error("Error fetching discover data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [locale]);

  return (
    <section className="bg-black relative w-full mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20 pb-10 md:pb-16">
      <div className="flex flex-col gap-6 md:gap-10">
        {/* Video Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          // التعديل هنا: aspect-video للموبايل و aspect-[21/9] للشاشات الكبيرة
className="relative w-full mt-12 md:mt-8 aspect-video md:aspect-[21/9] rounded-xl md:rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-2xl"        >
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900 animate-pulse">
              <div className="w-16 md:w-20 h-2 bg-gray-700 rounded" />
            </div>
          ) : videoUrl ? (
            <video
              src={videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <span className="text-gray-600 text-sm md:text-xl text-center">
                {t("hero.teamPhotoPlaceholder")}
              </span>
            </div>
          )}
        </motion.div>

        {/* Hero Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          {loading ? (
            <div className="space-y-4">
              <div className="h-8 md:h-12 bg-gray-800 animate-pulse w-1/2 rounded" />
              <div className="h-8 md:h-12 bg-gray-800 animate-pulse w-full rounded" />
            </div>
          ) : (
            <h1 
  className={`text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-white leading-[1.4] md:leading-[1.3] ${isAr ? 'text-right' : 'text-left'}`}
            >
              <span className="text-[#7B7CBB] block md:inline  leading-[1.4]">{headerData?.title}</span>
              <span className="hidden md:inline"> </span>
              <br className="hidden md:block" />
              <span className="text-white block md:inline  leading-[1.4]">{headerData?.description}</span>
            </h1>
          )}
        </motion.div>
      </div>
    </section>
  );
}