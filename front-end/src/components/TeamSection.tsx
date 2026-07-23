"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { TeamMember } from "@/types/team";
import { getTeam } from "@/lib/get-team";

export default function TeamSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [currentProgress, setCurrentProgress] = useState(0);
  const [showCursor, setShowCursor] = useState(false);

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  const t = useTranslations("TeamSection");
  const locale = useLocale();
  const isAr = locale === "ar";
  const STRAPI_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "";

  useEffect(() => {
    const loadTeam = async () => {
      const data = await getTeam(locale);
      setTeamMembers(data);
    };
    loadTeam();
  }, [locale]);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 250 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
  };

  const onSelect = useCallback((api: CarouselApi) => {
    if (!api) return;
    const totalSnaps = api.scrollSnapList().length;
    const currentSnap = api.selectedScrollSnap();
    const progress = ((currentSnap + 1) / totalSnaps) * 100;
    setCurrentProgress(progress);
  }, []);

  useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("select", () => onSelect(api));
    api.on("reInit", () => onSelect(api));
  }, [api, onSelect]);

  return (
    <section
      className={`bg-background py-20 overflow-hidden select-none relative ${isAr ? "text-right" : "text-left"}`}
      dir={isAr ? "rtl" : "ltr"}
      onMouseMove={handleMouseMove}
    >
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center text-[10px] font-bold uppercase pointer-events-none z-50 tracking-[0.1em] shadow-xl text-center px-2"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          display: showCursor ? "flex" : "none",
        }}
      >
        {t("cursorText")}
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 mb-24 md:mb-32">
        <div className="max-w-6xl">
          <h2 className="text-[5vw] md:text-[3.5vw] font-bold leading-[1.3] tracking-tighter text-primary mb-16">
            {t("mainQuote")}
          </h2>

          <div className={`flex ${isAr ? "justify-start" : "justify-end"}`}>
            <div className="max-w-lg">
              <p className="text-[16px] md:text-[18px] leading-[1.6] font-normal text-primary/70">
                {t("subText")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="relative px-6 md:px-16 lg:px-24"
        onMouseEnter={() => setShowCursor(true)}
        onMouseLeave={() => setShowCursor(false)}
      >
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: false,
            direction: isAr ? "rtl" : "ltr",
          }}
          className="w-full cursor-none"
        >
          <CarouselContent
            className={isAr ? "-mr-4 md:-mr-8" : "-ml-4 md:-ml-8"}
          >
            {teamMembers.map((member) => {
              const imagePath =
                member.teamImage?.formats?.small?.url || member.teamImage?.url;
              const fullImageUrl = imagePath
                ? `${STRAPI_BASE_URL}${imagePath}`
                : "/avatar.png";

              return (
                <CarouselItem
                  key={member.id}
                  className={
                    isAr
                      ? "pr-4 md:pr-8 basis-[280px] md:basis-[400px]"
                      : "pl-4 md:pl-8 basis-[280px] md:basis-[400px]"
                  }
                >
                  <div className="group">
                    <div className="bg-secondary/10 rounded-[10px] md:rounded-[14px] aspect-square overflow-hidden mb-6 relative border border-secondary/20">
                      <Image
                        src={fullImageUrl}
                        alt={member.teamName}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>

                    <div
                      className={`flex justify-between items-baseline px-1 ${isAr ? "flex-row-reverse" : "flex-row"}`}
                    >
                      <h3 className="text-xl md:text-2xl font-bold text-primary">
                        {member.teamName}
                      </h3>
                      <p className="text-[11px] md:text-[13px] text-secondary font-bold uppercase tracking-[0.1em]">
                        {member.teamRole}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 mt-16">
        <div className="relative w-full h-[2px] bg-secondary/20">
          <motion.div
            className={`absolute top-0 h-full bg-primary ${isAr ? "right-0" : "left-0"}`}
            initial={{ width: 0 }}
            animate={{ width: `${currentProgress}%` }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
          />
        </div>
      </div>
    </section>
  );
}
