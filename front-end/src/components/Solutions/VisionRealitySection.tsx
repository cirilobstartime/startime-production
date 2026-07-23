"use client";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { fetchAPI } from "@/lib/api";
import Link from "next/link";

interface VisionRealitySectionProps {
  locale: string;
}

interface EventItem {
  title: string;
  description: string;
}


export default function VisionRealitySection({
  locale,
}: VisionRealitySectionProps) {
  const t = useTranslations("VisionReality");
  const isAr = locale === "ar";

  const [events, setEvents] = useState<EventItem[]>([]);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        // Fetching both APIs: one for events and one for the profile PDF
        const [eventsRes, pdfRes] = await Promise.all([
          fetchAPI<any>("solution-fourth-banners", locale),
          fetchAPI<any>("solution-fifth-banners", locale),
        ]);

        if (eventsRes?.data?.[0]?.event) {
          setEvents(eventsRes.data[0].event);
        }

        // Looking for the PDF in the first item of the data array
        if (pdfRes?.data?.[0]?.Profile_PDF?.url) {
          setPdfUrl(pdfRes.data[0].Profile_PDF.url);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [locale]);

  const renderContent = () => {
    if (loading) {
      return Array(3)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="h-80 bg-white/5 animate-pulse backdrop-blur-md"
          />
        ));
    }

    return events.map((item, index) => {
      return (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ y: -12 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="group relative p-8 bg-white/5 backdrop-blur-md flex flex-col justify-start items-center text-center hover:bg-white/10 transition-all border border-white/5"
        >
          <div className="space-y-6 w-full">
            <h3 className="text-2xl font-bold text-[#5A417F]">{item.title}</h3>
            <p
              className={`text-white text-base md:text-lg leading-relaxed hyphens-auto ${
                isAr
                  ? "text-right md:text-justify"
                  : "text-left md:text-justify"
              }`}
              style={{
                textAlignLast: isAr ? "right" : "left",
                overflowWrap: "break-word",
                wordBreak: "normal",
                direction: isAr ? "rtl" : "ltr",
              }}
            >
              {item.description}
            </p>
          </div>

          <div className="absolute inset-0 bg-gradient-to-br from-[#5A417F]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </motion.div>
      );
    });
  };

  return (
    <section
      className="w-full bg-[#0a0a0a] py-24 text-white overflow-hidden"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {renderContent()}
        </div>

        <motion.div
          className="mt-20 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
            href={pdfUrl || "#"}
            download
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative inline-flex items-center gap-4 py-3 text-white transition-all ${
              !pdfUrl ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <span className="text-2xl font-bold">{t("downloadBtn")}</span>

            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-x-2"
            >
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>

            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-white transition-all duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
