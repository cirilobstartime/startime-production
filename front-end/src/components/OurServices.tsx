"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Service } from "@/types/service";
import { getServices } from "@/lib/get-service";

export default function OurServices() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [services, setServices] = useState<Service[]>([]);

  const t = useTranslations("OurServices");
  const locale = useLocale();
  const isAr = locale === "ar";
  const STRAPI_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "";

  // fetch data
  useEffect(() => {
    const loadData = async () => {
      const data = await getServices(locale);
      setServices(data);
    };
    loadData();
  }, [locale]);

  return (
    <section
      className={`bg-background pt-20 pb-10 md:pt-32 md:pb-16 px-6 md:px-12 lg:px-24 relative overflow-visible ${
        isAr ? "text-right" : "text-left"
      }`}
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="max-w-[1100px] mx-auto">
        {/* Header Section */}
        <h2 className="text-[6vw] md:text-[3.2vw] font-bold leading-[1.1] tracking-tighter text-primary mb-10 max-w-3xl">
          {t("title")}
        </h2>

        <div
          className={`flex flex-col md:flex-row justify-between items-start gap-12 mb-14`}
        >
          <Button className="bg-primary text-white border border-primary rounded-xl px-8 py-7 text-lg hover:bg-white hover:text-primary transition-all duration-500 shadow-none active:scale-95 uppercase font-bold">
            {t("hireUs")}
          </Button>
          <p className="max-w-sm text-[14px] leading-[1.6] font-normal text-primary/60">
            {t("description")}
          </p>
        </div>

        <div className="w-full h-[1px] bg-secondary/20"></div>

        {/* Services List - Dynamic Rendering */}
        <div className="relative">
          {services.map((service, index) => {
            const imageUrl = service.serviceMedia_image?.url
              ? `${STRAPI_BASE_URL}${service.serviceMedia_image.url}`
              : "/web-design.webp";

            return (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group border-b border-secondary/20 py-14 flex flex-col md:flex-row justify-between items-center cursor-pointer relative"
              >
                <div className="flex-1 z-20">
                  <h3
                    className={`text-3xl md:text-5xl font-bold text-primary tracking-tight group-hover:text-secondary transition-all duration-500 ${
                      isAr
                        ? "group-hover:-translate-x-2"
                        : "group-hover:translate-x-2"
                    }`}
                  >
                    {service.title}
                  </h3>
                </div>

                {/* Hover Image Animation */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30">
                  <AnimatePresence>
                    {hoveredIndex === index && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          scale: 0.3,
                          y: 20,
                          rotate: isAr ? 5 : -5,
                        }}
                        animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.3, y: 20 }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                        }}
                        className="w-[140px] h-[220px] md:w-[190px] md:h-[300px] overflow-hidden rounded-2xl shadow-2xl bg-secondary p-[2px]"
                      >
                        <div className="relative w-full h-full overflow-hidden rounded-md">
                          <Image
                            src={imageUrl}
                            alt={service.title}
                            fill
                            className="object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div
                  className={`max-w-xs z-20 mt-6 md:mt-0 flex flex-col items-start gap-4 ${
                    isAr ? "md:text-right" : "md:text-left"
                  }`}
                >
                  <p className="text-[13px] text-primary/50 font-normal leading-relaxed">
                    {service.description}
                  </p>
                  <Button
                    variant="outline"
                    className={`w-full md:w-fit rounded-[12px] px-6 py-4 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 group text-[14px] bg-transparent font-bold h-auto flex items-center justify-between uppercase ${
                      isAr ? "flex-row-reverse" : ""
                    }`}
                  >
                    <span className={`${isAr ? "ml-4" : "mr-4"}`}>
                      {t("viewMore")}
                    </span>
                    <ArrowUpRight
                      className={`w-5 h-5 transition-transform duration-300 ${
                        isAr
                          ? "group-hover:-rotate-45"
                          : "group-hover:rotate-45"
                      }`}
                    />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
