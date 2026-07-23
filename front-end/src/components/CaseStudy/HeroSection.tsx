"use client";
import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";

const STRAPI_BASE_URL = "https://startime.sa";

interface BannerData {
  title: string;
  description: string;
}

const HeroSection = () => {
  const locale = useLocale();
  const isAr = locale === "ar";
  const [data, setData] = useState<BannerData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        // طلب البيانات مع الـ locale والـ populate
        const res = await fetch(
          `${STRAPI_BASE_URL}/api/portfolio-second-banners?populate=*&locale=${locale}`
        );
        const result = await res.json();

        if (result?.data?.[0]?.element) {
          const element = result.data[0].element;
          setData({
            title: element.title,
            description: element.description,
          });
        }
      } catch (error) {
        console.error("Error fetching HeroSection data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBannerData();
  }, [locale]);

  if (loading || !data) return null; // أو يمكنك وضع Skeleton Loader هنا

  return (
    <section className="relative h-[661px] w-full bg-[#050505] overflow-hidden" dir={isAr ? "rtl" : "ltr"}>
      
      {/* Overlay التدريجي الفخم */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent z-10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 h-full flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center max-w-4xl"
        >
          {/* العنوان (Title) القادم من Strapi */}
          <h1 className="text-white text-4xl md:text-6xl font-black mb-8 leading-tight drop-shadow-2xl">
            {data.title}
          </h1>
          
          {/* الوصف (Description) القادم من Strapi */}
          <p className="text-gray-300 text-lg md:text-2xl leading-relaxed drop-shadow-md font-medium">
            {data.description}
          </p>
        </motion.div>
      </div>

      {/* ملاحظة: يمكنك هنا إضافة فيديو خلفية أو صورة لو كانت موجودة في الـ API */}
    </section>
  );
};

export default HeroSection;