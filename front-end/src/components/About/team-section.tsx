"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";

const STRAPI_BASE_URL = "https://staging.startime.sa";

interface CEOData {
  title: string;
  description: string;
  imageUrl: string;
}

// الهيكل الجديد للبيانات المضافة
interface MethodologyData {
  mainTitle: string;
  subTitle: string;
  description: string;
}

export default function CEOSection({ locale }: { locale: string }) {
  const t = useTranslations("AboutPage");
  const isAr = locale === "ar";
  const [ceoData, setCeoData] = useState<CEOData | null>(null);
  const [methodology, setMethodology] = useState<MethodologyData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. جلب بيانات CEO
        const ceoRes = await fetch(`${STRAPI_BASE_URL}/api/discover-ceos?populate=*&locale=${locale}`, { cache: "no-store" });
        const ceoResult = await ceoRes.json();
        if (ceoResult?.data?.[0]) {
          const item = ceoResult.data[0];
          setCeoData({
            title: item.title || "",
            description: item.description || "",
            imageUrl: item.ceo_image?.url ? `${STRAPI_BASE_URL}${item.ceo_image.url}` : "",
          });
        }

        // 2. جلب بيانات Methodology (الجزء المضاف)
        const methRes = await fetch(`${STRAPI_BASE_URL}/api/discover-methodologies?populate=*&locale=${locale}`, { cache: "no-store" });
        const methResult = await methRes.json();
        if (methResult?.data?.[0]) {
          const mItem = methResult.data[0];
          setMethodology({
            mainTitle: mItem.main_title || "",
            subTitle: mItem.sub_title || "",
            description: mItem.description || "",
          });
        }
      } catch (err) {
        console.error("Fetch Error:", err);
      }
    };

    fetchData();
  }, [locale]);

  if (!ceoData) return <div className="bg-white py-10 text-center">Loading...</div>;

  return (
    <section className="w-full overflow-hidden">
      {/* الجزء العلوي - (بدون تغيير كما طلبت) */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex flex-col md:flex-row items-center justify-between gap-12 ${isAr ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2 flex justify-center"
            >
              <div className="relative w-72 h-96 md:w-[500px] md:h-[600px] transition-all duration-700">
                {ceoData.imageUrl && (
                  <Image src={ceoData.imageUrl} alt="CEO" fill className="object-contain"/>
                )}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: isAr ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`w-full md:w-1/2 ${isAr ? 'text-right' : 'text-left'}`}
              dir={isAr ? "rtl" : "ltr"}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-[#5b4180] mb-8 leading-tight">{ceoData.title}</h2>
              <p className="text-gray-800 text-lg md:text-xl leading-relaxed whitespace-pre-line font-light">{ceoData.description}</p>
             
            </motion.div>
          </div>
        </div>
      </div>

      {/* --- الجزء الذي تم تعديله فقط (الجزء الأسود) --- */}
      <div className="bg-black py-24 text-center">
        <div className="max-w-5xl mx-auto px-4 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* عرض الـ Methodology من الـ API */}
            {methodology ? (
              <>
                <p className="text-[#7B7CBB] text-base md:text-lg font-medium mb-4 italic">
                  {methodology.subTitle}
                </p>
                <h2 className="text-white text-2xl md:text-4xl font-bold mb-8 leading-snug">
                  {methodology.mainTitle}
                </h2>
                <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-4xl mx-auto whitespace-pre-line font-light">
                  {methodology.description}
                </p>
              </>
            ) : (
              // Fallback في حالة عدم وجود داتا
              <h3 className="text-white text-xl md:text-2xl font-light italic">
                {isAr ? "“نهج يجسد الرؤية ويخلد الأثر”" : "“A vision that embodies purpose and immortalizes impact”"}
              </h3>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}