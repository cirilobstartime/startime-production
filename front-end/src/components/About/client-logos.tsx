"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import Image from "next/image";

interface JourneyBannerProps {
  locale: string;
}

interface JourneyData {
  title?: string;
  description?: string;
  imageUrl?: string;
}

export default function JourneyBanner({ locale }: JourneyBannerProps) {
  const t = useTranslations("AboutPage");
  const isAr = locale === "ar";
  const [data, setData] = useState<JourneyData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = "https://staging.startime.sa";
        const response = await fetch(`${baseUrl}/api/discover-banner-thirds?populate=*`, { cache: 'no-store' });
        const result = await response.json();
        const rawData = result?.data?.[0];

        if (rawData) {
          if (locale === "en") {
            setData({
              title: rawData.title,
              description: rawData.description,
              imageUrl: rawData.banner?.url ? `${baseUrl}${rawData.banner.url}` : undefined,
            });
          } else {
            // هنا تم تصحيح اسم المتغير من arData إلى arLocalization ليتطابق مع الاستخدام بالأسفل
            const arLocalization = rawData.localizations?.find((item: any) => item.locale === "ar");
            
            setData({
              title: arLocalization?.title || rawData.title,
              description: arLocalization?.description || rawData.description,
              // محاولة أخذ الصورة من الترجمة العربية أولاً، وإذا لم توجد نأخذها من الأساسي
              imageUrl: (arLocalization?.banner?.url || rawData.banner?.url) 
                ? `${baseUrl}${arLocalization?.banner?.url || rawData.banner.url}` 
                : undefined,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching journey data:", error);
      }
    };

    fetchData();
  }, [locale]);

  return (
    <section className="w-full bg-white py-24 overflow-hidden" dir={isAr ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-16">
          
          {/* الجانب الأيسر: الصورة */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2"
          >
            <div className="relative aspect-square md:aspect-video bg-[#f0f0f0] rounded-2xl overflow-hidden border border-gray-100 shadow-xl">
              {data?.imageUrl ? (
                <Image 
                  src={data.imageUrl}
                  alt={data.title || "Journey Banner"}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  {t("hero.teamPhotoPlaceholder")}
                </div>
              )}
            </div>
          </motion.div>

          {/* الجانب الأيمن: النصوص */}
          <motion.div 
            initial={{ opacity: 0, x: isAr ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-1/2 flex flex-col space-y-6 text-center md:text-start"
          >
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#5b4180] leading-tight whitespace-pre-line">
                {data?.title }
              </h2>
              
              <div className="w-20 h-1.5 bg-[#7B7CBB] rounded-full mx-auto md:mx-0" />
            </div>

            <p className="text-gray-600 text-lg md:text-xl leading-relaxed whitespace-pre-line">
              {data?.description || t("sec3.text")}
            </p>

            {/* خطوط ديكورية */}
           
          </motion.div>

        </div>
      </div>
    </section>
  );
}