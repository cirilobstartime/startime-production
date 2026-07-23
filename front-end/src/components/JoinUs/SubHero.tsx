"use client";
import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";

const STRAPI_BASE_URL = "https://startime.sa";

interface FeatureData {
  bannerTitle: string;
  descriptionTitle: string;
  descriptionBody: string;
  imageUrl: string;
}

export const FeatureSection = () => {
  const locale = useLocale();
  const isAr = locale === "ar";
  
  const [data, setData] = useState<FeatureData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatureData = async () => {
      try {
        const res = await fetch(
          `${STRAPI_BASE_URL}/api/join-us-second-banner-with-descriptions?populate=*&locale=${locale}`
        );
        const result = await res.json();

        if (result?.data?.[0]) {
          const item = result.data[0];
          setData({
            bannerTitle: item.banner_title,
            descriptionTitle: item.description_title,
            descriptionBody: item.description_body,
            imageUrl: item.banner_background?.url 
              ? `${STRAPI_BASE_URL}${item.banner_background.url}` 
              : "/image11.jpeg", // Fallback
          });
        }
      } catch (error) {
        console.error("Error fetching Feature data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatureData();
  }, [locale]);

  if (loading || !data) return null;

  return (
    <section className="w-full bg-black py-20 px-6 overflow-hidden" dir={isAr ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        
        {/* النصوص والمحتوى الوظيفي */}
        <div className="w-full md:w-1/2 space-y-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex flex-col"
          >
            <h2 className="text-white text-4xl md:text-7xl font-black mb-4 uppercase tracking-tighter leading-none">
              {data.bannerTitle}
            </h2>
            <h3 className="text-[#999999] text-xl md:text-3xl font-bold italic tracking-tight">
              {data.descriptionTitle}
            </h3>
          </motion.div>

          <div className="space-y-8">
            
              {/* نص المحتوى الرئيسي القادم من Strapi */}
              <p className="text-gray-300 text-lg md:text-2xl font-medium leading-relaxed pl-6 py-2 transition-all group-hover:border-[#00e6c8]">
                {data.descriptionBody}
              </p>

            {/* خط زخرفي يعكس هوية الموقع */}
          </div>
        </div>

        {/* مساحة الصورة الديناميكية */}
        <div className="w-full md:w-1/2">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8 }}
            className="aspect-square relative overflow-hidden rounded-sm shadow-2xl border border-white/10"
          >
            <Image
              src={data.imageUrl} 
              alt={data.bannerTitle} 
              fill
              className="object-cover  transition-all duration-700"
            />
            {/* Overlay تأثير جمالي */}
          </motion.div>
        </div>

      </div>
    </section>
  );
};