"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { SquareCheckBig, ChevronRight, ChevronLeft } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import AutoScroll from "embla-carousel-auto-scroll";


/**
 * SIMF "Metrics Dashboard" section (Figma node 9485:6015, "05 · Metrics Dashboard").
 *
 * Centered header + an auto-sliding, drag-to-scroll carousel of metric cards
 * with edge fade masks and a caption.
 *
 * Tokens: eyebrow/caption violet #5a4280, accent #7d23ce, icon badge bg #f2e9fa,
 * heading #111827, body gray #4b5563. Roboto — H2 Bold 40px, value H3 Bold 32px.
 */

interface Metric {
  value: string;
  valueArabic: string;
  label: string;
  labelArabic: string;
  imgSrc: string;
  website: string;
}

interface MetricsDashboardProps {
  locale?: string;
  eyebrow?: string;
  heading?: string;
  lead?: string;
  caption?: string;
  metrics?: Metric[];
}

const DEFAULT_METRICS: Metric[] = [
  // { value: "1.4M km", label: "SAMI", imgSrc: "/sponsors-partners-icon-1.webp" },

  // { value: "Under the Supervision of", valueArabic: "تحت اشراف", label: "Ministry of Defense", labelArabic: "وزارة الدفاع", imgSrc: "/sponsors-partners-icon-9.webp", website: "https://mod.gov.sa/en/Pages/default.aspx" },
  // { value: "Organized by", valueArabic: "تنظيم", label: "Royal Saudi Naval Forces", labelArabic: "القوات البحرية", imgSrc: "/sponsors-partners-icon-7.webp", website: "https://mod.gov.sa/en/Sectors/Arkan/Navy/Pages/default.aspx" },
  { value: "Licensed to", valueArabic: "مرخص لـ", label: "Startime Ultimate Impact", labelArabic: "ستارتايم ", imgSrc: "/sponsors-partners-icon-8.webp", website: "https://startime.sa/en/" },
  { value: "Strategic Partner", valueArabic: "شريك استراتيجي", label: "General Authority for Military Industries", labelArabic: "الهيئة العامة للصناعات العسكرية", imgSrc: "/sponsors-partners-icon-2.webp", website: "https://www.gami.gov.sa/en" },
  { value: "Gold Sponsor", valueArabic: "راعي ذهبي", label: "Navantia", labelArabic: "نافانتيا ", imgSrc: "/sponsors-partners-icon-6.webp", website: "https://www.navantia.es/en/" },
  { value: "Gold Sponsor", valueArabic: "راعي ذهبي", label: "Fincantieri Arabia", labelArabic: "فينكانتيري العربية ", imgSrc: "/fincantieri-arabia.webp", website: "https://www.fincantieri.com/en/group/company/subsidiaries-and-associates/Fincantieri-Arabia-for-Naval-Services" },
  { value: "Media Partner", valueArabic: "شريك اعلامي", label: "Unmanned Systems Technology", labelArabic: "UST", imgSrc: "/sponsors-partners-icon-3.webp", website: "https://www.unmannedsystemstechnology.com/" },
  { value: "Media Partner", valueArabic: "شريك اعلامي", label: "Defense Advancement", labelArabic: "DA", imgSrc: "/sponsors-partners-icon-4.webp", website: "https://www.defenseadvancement.com/" },
  { value: "Media Partner", valueArabic: "شريك اعلامي", label: "Ocean Science and Technology", labelArabic: "Ocean Science and Technology", imgSrc: "/sponsors-partners-icon-10.webp", website: "https://www.oceansciencetechnology.com/" },
  { value: "Official Contractor", valueArabic: "المقاول الرسمي", label: "Impact Event Production", labelArabic: "امباكت", imgSrc: "/sponsors-partners-icon-5.webp", website: "" },
  { value: "Event Management Consultant", valueArabic: "استشاري التنظيم", label: "United Advisory Chamber", labelArabic: "يونايتد ", imgSrc: "/sponsors-partners-icon-11.svg", website: "" },
  
  
];

// function CheckCircleIcon() {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
//       <circle cx="12" cy="12" r="9" />
//       <path d="m8.5 12 2.5 2.5 4.5-5" />
//     </svg>
//   );
// }

export default function LeadingPurposeExpertise({
  locale = "en",
  eyebrow,
  heading,
  lead,
  caption,
  metrics = DEFAULT_METRICS,
}: MetricsDashboardProps) {
  const isAr = locale === "ar";
  const t = useTranslations("SIMF.leadingpurposeexpertise");

  const eyebrowText = eyebrow ?? t("eyebrow");
  const headingText = heading ?? t("heading");
  const leadText = lead ?? t("lead");
  const captionText = caption ?? t("caption");

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      direction: isAr ? "rtl" : "ltr",
      align: "start",
      dragFree: true,
      skipSnaps: true,
    },
    [
      AutoScroll({
        speed: 1.25,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

  const scrollPrev = useCallback(() => {
      emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
      emblaApi?.scrollNext();
  }, [emblaApi]);

  

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className="w-full"
      style={{
        // background:
        //   "linear-gradient(125deg, #f7f4fb 0%, #faf9fc 45%, #f3e6fb 100%)",
        backgroundColor: "rgb(237, 245, 247)"
        //background: "linear-gradient(#080c18b8 0%, #0a0f1e73 45%, #080c18c7 100%)",
        //background: "linear-gradient(#080c18b8 0%, #0a0f1e73 45%, #080c18c7 100%)", position: "absolute", inset: "0"
      }}
    >
      
      <div className="mx-auto max-w-[1440px] py-20 md:py-24">
        {/* Header */}
        <div className="hidden mx-auto flex max-w-3xl flex-col items-center px-5 text-center sm:px-8">
          {/* <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5a4280]">
            {eyebrowText}
          </p> */}
          <h2 className="mt-3 text-3xl font-bold leading-tight text-[#111827] md:text-[40px]">
            {headingText}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-[#4b5563] md:text-lg">
            {leadText}
          </p>
        </div>

        {/* new position of logos */}
        {/* new  */}
        {/* Supervising & Organizing Organizations */}
        <div className="mb-12 flex flex-col items-center gap-8 md:flex-row md:justify-center md:gap-24">

          {/* Supervised by */}
          <div className="flex flex-col items-center">
            <p className="mb-3 text-sm font-medium text-gray-500">
              {isAr ? "تحت اشراف" : "Under the Supervision of"}
            </p>

            <a
              href="..."
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-300 hover:scale-105 rounded-[10px] text-black"
            >
              <img
                src="/sponsors-partners-icon-9.webp"
                alt="Under the Supervision of"
                className="h-[6rem] w-auto object-contain"
              />
            </a>
          </div>

          {/* Organized by */}
          <div className="flex flex-col items-center">
            <p className="mb-3 text-sm font-medium text-gray-500">
              {isAr ? "تنظيم" : "Organized by"}
            </p>

            <a
              href="..."
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-300 hover:scale-105  rounded-[10px] text-black"
            >
              <img
                src="/sponsors-partners-icon-7.webp"
                alt="Organized By"
                className="h-[6rem] w-auto object-contain"
              />
            </a>
          </div>

        </div>

        <div className="mx-auto flex max-w-3xl flex-col items-center px-5 text-center sm:px-8">
          {/* Heading */}
          <h2 className="max-w-[720px] text-center font-['Noto Kufi Arabic'] text-[40px] font-bold leading-[45px] text-black">
            
            {isAr ? "الشركاء والرعاة" : "Partners and Sponsors"}
          </h2>
          {/* Description */}
          <p className="max-w-[680px] text-center font-['Noto Kufi Arabic'] text-lg leading-8 text-slate-600 text-black">
            {/* Lead text */}
           
            {isAr ? "يحظى الملتقى بدعم ومشاركة جهات حكومية ومؤسسات وطنية ودولية تسهم بخبراتها في تعزيز حضور المملكة العربية السعودية ضمن منظومة الأمن البحري العالمي، وتأكيد أهمية العمل المشترك لمواكبة التحولات المتسارعة في هذا القطاع الحيوي. " : "The Forum is supported by government entities and national and international organizations whose expertise strengthens the Kingdom of Saudi Arabia’s position within the global maritime security landscape and underscores the importance of collective action in responding to the rapid transformations shaping this vital sector "}
          </p>
        </div>

        

        {/* Carousel */}
        <div className="relative mt-12 mb-12">
          {/* edge fade masks */}
          {/* <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r from-[#f7f4fb] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-[#f3e6fb] to-transparent" /> */}
          {/* <div className="absolute right-0 top-[50%] h-[12rem] w-14 -translate-y-1/2 bg-gradient-to-l from-[#EFF7FD] via-[#EFF7FD]/0 to-transparent" />
          <div className="pointer-events-none absolute left-0 top-[50%] h-[12rem] w-14 -translate-y-1/2 bg-gradient-to-r from-[#EFF7FD] via-[#EFF7FD]/0 to-transparent" /> */}
          <div className="absolute right-0 top-[50%] h-[12rem] w-14 -translate-y-1/2 bg-gradient-to-l from-[#0a0f1c] via-[#0a0f1c]/0 to-transparent" />
          <div className="pointer-events-none absolute left-0 top-[50%] h-[12rem] w-14 -translate-y-1/2 bg-gradient-to-r from-[#0a0f1c] via-[#0a0f1c]/0 to-transparent" />

          <div className="overflow-hidden px-14" ref={emblaRef}>
            <div className="flex">
                {metrics.map((m) => (
                <article
                    key={m.label}
                    className="min-w-0 flex-[0_0_240px] ml-6 bg-white rounded-lg items-center rtl:pt-[2rem] ltr:pt-[2rem]"
                >
                  {/* <span className="hidden h-1 w-10 rounded-full bg-[#7d23ce]" /> */}
                  <p className="text-sm leading-snug text-[#4b5563] text-center">{isAr ? m.valueArabic : m.value }</p>
                  <div className="mt-2 mb-6 flex items-center gap-3 rtl:justify-center ltr:justify-center">
                    {/* <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-transparent text-[#c7c3ca] invisible">
                      <SquareCheckBig />
                    </span> */}
                    
                    <a
                      href={m.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={isAr ? m.labelArabic : m.label}
                      aria-label={isAr ? m.labelArabic : m.label}
                      className="group inline-flex rounded-md focus:outline-none focus:ring-2 focus:ring-[#244A77] focus:ring-offset-2"
                    >
                      <img
                        src={m.imgSrc}
                        alt={isAr ? m.labelArabic : m.label}
                        width={150}
                        height={48}
                        className="
                          cursor-pointer
                          transition-all
                          duration-300
                          ease-out
                          group-hover:scale-105
                          group-hover:-translate-y-0.5
                          group-hover:drop-shadow-[0_8px_20px_rgba(36,74,119,0.15)]
                        "
                      />
                    </a>
                    {/* Elegant hover label */}
                    <div
                      className="
                        pointer-events-none
                        absolute
                        -bottom-7
                        left-1/2
                        -translate-x-1/2
                        whitespace-nowrap
                        rounded-full
                        bg-[#244A77]
                        px-3
                        py-1
                        text-xs
                        font-medium
                        text-white
                        opacity-0
                        translate-y-1
                        transition-all
                        duration-200
                        group-hover:opacity-100
                        group-hover:translate-y-0
                      "
                    >
                      {isAr ? m.labelArabic : m.label}
                    </div>
                    <span className="hidden text-2xl font-bold text-[#111827]">{m.value}</span>
                  </div>
                  <p className="hidden mt-4 text-sm leading-snug text-[#4b5563] rtl:justify-start ltr:justify-center">{isAr ? m.valueArabic : m.value }</p>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* prevnext buttons */}
        <div className="hidden flex h-14 w-full items-center justify-end gap-16 self-stretch">
          <button
            onClick={scrollPrev}
            type="button"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E6F2FB] transition-colors hover:bg-[#d6eaf9]"
          >
            {/* <ChevronLeft
              className="h-6 w-6 text-[#007CD8]"
              strokeWidth={1.5}
            /> */}
            <ChevronLeft
                className={`h-6 w-6 text-[#007CD8] ${
                  isAr ? "rotate-180" : ""
                }`}
              />
          </button>

          <button
            onClick={scrollNext}
            type="button"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E6F2FB] transition-colors hover:bg-[#d6eaf9]"
          >
            {/* <ChevronRight
              className="h-6 w-6 text-[#007CD8]"
              strokeWidth={1.5}
            /> */}
            <ChevronRight
              className={`h-6 w-6 text-[#007CD8] ${
                isAr ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Startime Links */}
        {/* <div className="hidden startimelinksdiv"></div> */}

        {/* Caption */}
        {/* <p className="mt-10 px-5 text-center text-sm font-medium text-[#5a4280]">
          {captionText}
        </p> */}
      </div>
    </section>
  );
}
