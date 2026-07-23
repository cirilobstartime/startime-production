"use client";
import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Quote } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Reviewer } from "@/types/reviewer";
import { getReviewers } from "@/lib/get-reviewers";

const Testimonials = () => {
  const t = useTranslations("Testimonials");
  const locale = useLocale();
  const isAr = locale === "ar";
  const STRAPI_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

  const [reviewers, setReviewers] = useState<Reviewer[]>([]);
  const [api, setApi] = useState<CarouselApi>();
  const [currentProgress, setCurrentProgress] = useState(0);
  const [showCursor, setShowCursor] = useState(false);

  // fetch data
  useEffect(() => {
    const loadData = async () => {
      const data = await getReviewers(locale);
      setReviewers(data);
    };
    loadData();
  }, [locale]);

  // Custom Cursor Motion Values
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

  const testimonialIndices = [0, 1, 2, 3, 4, 5];

  return (
    <section
      className="bg-background py-20 border-t border-secondary/20 overflow-hidden select-none relative"
      onMouseMove={handleMouseMove}
      style={{ direction: isAr ? "rtl" : "ltr" }}
    >
      {/* Interactive Cursor Overlay */}
      <motion.div
        className="fixed top-0 left-0 w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-[10px] font-bold uppercase pointer-events-none z-50 tracking-[0.1em] shadow-lg text-center px-2"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          display: showCursor ? "flex" : "none",
        }}
      >
        {t("pullMe")}
      </motion.div>

      {/* Section Header */}
      <div className="max-w-[1200px] mx-auto px-10 md:px-24 mb-12">
        <h2 className="text-[7vw] md:text-[3.8vw] font-bold leading-[1.1] tracking-tighter italic text-primary">
          {t.rich("title", {
            br: () => <br className="hidden md:block" />,
          })}
        </h2>
      </div>

      {/* Carousel Container */}
      <div
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
          className="w-full cursor-none px-10 md:px-24"
        >
          <CarouselContent className={isAr ? "-mr-2" : "-ml-2"}>
            {reviewers.map((reviewer) => {
              const avatarPath =
                reviewer.clientAvatar?.formats?.thumbnail?.url ||
                reviewer.clientAvatar?.url;
              const fullAvatarUrl = avatarPath
                ? `${STRAPI_BASE_URL}${avatarPath}`
                : "/placeholder-user.png";

              return (
                <CarouselItem
                  key={reviewer.id}
                  className={`${isAr ? "pr-6" : "pl-6"} md:basis-[550px] lg:basis-[600px]`}
                >
                  <div className="bg-white p-8 md:p-10 rounded-[1rem] shadow-sm min-h-[320px] flex flex-col justify-between border border-secondary/10 transition-shadow hover:shadow-md">
                    <div
                      className={`flex flex-col md:flex-row gap-6 items-start ${isAr ? "text-right" : "text-left"}`}
                    >
                      <Quote
                        className={`w-5 h-5 text-primary fill-primary shrink-0 opacity-80 ${isAr ? "rotate-180" : ""}`}
                      />
                      <p className="text-primary/70 text-[0.95rem] md:text-[1.05rem] leading-[1.6] font-normal italic">
                        {reviewer.clientQuote}
                      </p>
                    </div>

                    <div
                      className={`flex items-center justify-between border-t border-secondary/10 pt-6 mt-8 ${isAr ? "flex-row-reverse" : "flex-row"}`}
                    >
                      <div
                        className={`flex items-center gap-3 ${isAr ? "flex-row-reverse text-right" : "flex-row text-left"}`}
                      >
                        <div className="w-11 h-11 rounded-full overflow-hidden relative border border-secondary/20 grayscale hover:grayscale-0 transition-all">
                          <Image
                            src={fullAvatarUrl}
                            alt={reviewer.clientName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-col">
                          <h4 className="text-[0.9rem] font-bold text-primary tracking-tight">
                            {reviewer.clientName}
                          </h4>
                          <span className="text-[0.75rem] text-secondary font-bold uppercase">
                            {reviewer.clientPosition}
                          </span>
                        </div>
                      </div>

                      <div
                        className={`flex flex-col ${isAr ? "items-start" : "items-end"}`}
                      >
                        <p className="text-[0.75rem] font-black text-primary tracking-[0.15em] uppercase italic">
                          {reviewer.companyName}
                        </p>
                        <p className="text-[0.65rem] text-secondary font-bold uppercase tracking-tighter">
                          {t("client")}
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Progress Bar */}
      <div className="max-w-[1300px] mx-auto px-10 md:px-24 mt-16">
        <div className="relative w-full h-[1px] bg-secondary/20">
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
};

export default Testimonials;
