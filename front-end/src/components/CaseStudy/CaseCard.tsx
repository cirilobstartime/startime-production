"use client";
import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";

const STRAPI_BASE_URL = "https://startime.sa";

interface FocusElement {
  id: number;
  title: string;
  description: string;
}

interface FocusData {
  mainTitle: string;
  shortDescription: string;
  elements: FocusElement[];
}

export default function FocusGrid() {
  const locale = useLocale();
  const isAr = locale === "ar";

  const [data, setData] = useState<FocusData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFocusData = async () => {
      try {
        const res = await fetch(
          `${STRAPI_BASE_URL}/api/portfolio-third-banners?populate=*&locale=${locale}`
        );
        const result = await res.json();
        if (result?.data?.[0]) {
          const item = result.data[0];
          setData({
            mainTitle: item.title,
            shortDescription: item.shortDescription,
            elements: item.focus_element || [],
          });
        }
      } catch (error) {
        console.error("Error fetching Focus data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFocusData();
  }, [locale]);

  if (loading || !data) return null;

  return (
    <section
      className="bg-white py-12 md:py-24 border-b border-gray-100"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className={`flex flex-col mb-12 space-y-3 ${isAr ? "items-start text-right" : "items-start text-left"}`}>
          <h2 className="text-3xl md:text-5xl font-black text-[#5b4180] uppercase tracking-tighter">
            {data.mainTitle}
          </h2>
          {data.shortDescription && (
            <p className="text-gray-600 text-base md:text-lg max-w-2xl leading-relaxed">
              {data.shortDescription}
            </p>
          )}
          <div className="h-[4px] bg-black w-48" />
        </div>

        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.elements.map((element, idx) => (
            <motion.div
              key={element.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 4) * 0.05 }}
              className="bg-gray-50 p-5 border-2 border-transparent hover:border-black transition-all group"
            >
              <h3 className="text-[#5b4180] font-black text-base md:text-lg leading-tight mb-2">
                {element.title}
              </h3>
              <div className="h-[3px] bg-black w-10 mb-3 transition-all group-hover:w-16" />
              <p className="text-black text-sm leading-relaxed line-clamp-3">
                {element.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
