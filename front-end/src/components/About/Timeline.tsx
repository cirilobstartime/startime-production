"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface TimelineElement {
  year: string;
  title: string;
  shortDescription: string;
}

interface TimelineSectionProps {
  locale: string;
}

export default function TimelineSection({ locale }: TimelineSectionProps) {
  const t = useTranslations("AboutPage");
  const isAr = locale === "ar";
  const baseUrl = "https://startime.sa";

  const [timelineItems, setTimelineItems] = useState<TimelineElement[]>([]);
  const [ambition, setAmbition] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [timelineRes, ambitionRes] = await Promise.all([
          fetch(`${baseUrl}/api/discover-time-lines?populate=*&locale=${locale}`, { cache: "no-store" }),
          fetch(`${baseUrl}/api/discover-ambitions?populate=*&locale=${locale}`, { cache: "no-store" }),
        ]);

        const timelineResult = await timelineRes.json();
        const ambitionResult = await ambitionRes.json();

        if (timelineResult?.data) {
          const mappedData = timelineResult.data.map((item: any) => {
            const content = item.timeline_element?.[0];
            return {
              year: content?.year || "",
              title: content?.title || "",
              shortDescription: content?.shortDescription || "",
            };
          });
          setTimelineItems(mappedData.sort((a: any, b: any) => parseInt(a.year) - parseInt(b.year)));
        }

        const ambRaw = ambitionResult?.data?.[0];
        if (ambRaw) {
          setAmbition({
            mainTitle: ambRaw?.main_title || "",
            description: ambRaw?.description || "",
            secondTitle: ambRaw?.second_title || "",
          });
        }

      } catch (error) {
        console.error("API Error:", error);
      }
    };

    fetchData();
  }, [locale]);

  return (
    <section className="w-full bg-black py-16 border-b border-secondary/20 overflow-hidden" dir={isAr ? "rtl" : "ltr"}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">

        {/* GIF Section before timeline */}
        <div className="w-full flex flex-col items-center mb-10">
          <img
            src={isAr ? "/discover/heritage.gif" : "/A renewed legacy ignited from the roots.gif"}
            alt={isAr ? "إرث متجدد اشتعل من الجذور" : "A renewed legacy ignited from the roots"}
            className="w-full max-w-2xl h-auto rounded-xl"
          />
        </div>

        <h3 className="text-white text-xl mb-8 font-light tracking-[0.2em] uppercase">
          {t("story.title")}
        </h3>

        {/* Timeline Container */}
        <div className="relative w-full mb-32">
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/30 -translate-x-1/2 hidden md:block" />
          <div className="space-y-16 md:space-y-0">
            {timelineItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex flex-col md:flex-row items-center justify-between w-full md:mb-16 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="w-full md:w-[42%] aspect-[4/3] bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl relative group overflow-hidden flex flex-col items-center justify-center p-8 text-center hover:border-[#7B7CBB]/50 transition-colors">
                  <span className="text-[#7B7CBB] text-3xl mb-2">{item.year}</span>
                  <h4 className="text-white font-bold text-lg md:text-xl mb-3">{item.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.shortDescription}</p>
                  <div className={`hidden md:block absolute top-1/2 w-3 h-3 bg-[#7B7CBB] rounded-full -translate-y-1/2 ${
                    index % 2 === 0 ? "-left-[10.5%]" : "-right-[10.5%]"
                  }`} />
                </div>
                <div className="hidden md:block md:w-[42%]" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* سكشن الطموح والفيديو المدمج */}
        <div className="w-full max-w-2xl text-center space-y-10">
          <div className="space-y-6">
            <h2 className="text-white text-2xl md:text-4xl font-medium mb-6">
              {ambition?.mainTitle || t("story.titleVideo")}
            </h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed whitespace-pre-line">
              {ambition?.description}
            </p>
            <h3 className="text-[#7B7CBB] text-lg md:text-2xl font-semibold">
              {ambition?.secondTitle}
            </h3>
          </div>

        </div>

      </div>
    </section>
  );
}