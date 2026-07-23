"use client";
import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";

const STRAPI_BASE_URL = "https://startime.sa";

export const Hero = () => {
  const locale = useLocale();
  const isAr = locale === "ar";
  
  const [bannerUrl, setBannerUrl] = useState<string>("");
  const [mainTitle, setMainTitle] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        // 1. جلب صورة البانر
        const bannerRes = await fetch(
          `${STRAPI_BASE_URL}/api/join-us-header-banners?populate=*&locale=${locale}`
        );
        const bannerResult = await bannerRes.json();

        if (bannerResult?.data?.[0]?.background?.url) {
          setBannerUrl(`${STRAPI_BASE_URL}${bannerResult.data[0].background.url}`);
        }

        // 2. جلب العنوان الرئيسي (الرابط الجديد اللي بعته)
        const titleRes = await fetch(
          `${STRAPI_BASE_URL}/api/join-us-main-titles?populate=*&locale=${locale}`
        );
        const titleResult = await titleRes.json();

        if (titleResult?.data?.[0]?.main_title) {
          setMainTitle(titleResult.data[0].main_title);
        }
      } catch (error) {
        console.error("Error fetching Join Us Hero data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, [locale]);

  return (
    <section className="w-full bg-black pt-[70px] md:pt-[90px]" dir={isAr ? "rtl" : "ltr"}>
      
      {/* منطقة الـ BANNER الرئيسية كصورة ديناميكية */}
      <div className="w-full h-[400px] md:h-[600px] relative overflow-hidden bg-[#1a1a1a]">
        {bannerUrl ? (
          <Image
            src={bannerUrl} 
            alt="Hero Banner"
            fill
            priority
            className="object-cover"
          />
        ) : !loading && (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            No Banner Image Found
          </div>
        )}
        
        <div className="absolute inset-0 bg-black/20 z-10" />
      </div>

      {/* منطقة العنوان السفلي الديناميكي */}
      <div className="w-full bg-black py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2 
            key={mainTitle} // إعادة التشغيل عند تغيير النص
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-white text-3xl md:text-5xl font-extrabold tracking-tight"
          >
            {/* عرض العنوان من الـ API أو Fallback في حالة التأخير */}
            {mainTitle || (isAr ? "كن جزءًا من عائلة استثنائية" : "Be part of an exceptional family")}
          </motion.h2>
          
          {/* الخط الزخرفي الأبيض */}
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: isAr ? "200px" : "240px" }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1 }}
            className="h-[6px] bg-white mx-auto mt-8"
          />
        </div>
      </div>
    </section>
  );
};