"use client";

import { useMemo, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import AutoScroll from "embla-carousel-auto-scroll";
import { useLocale, useTranslations } from "next-intl";
import {
  Anchor,
  Cable,
  ChevronLeft,
  ChevronRight,
  Container,
  Database,
  Globe,
  Landmark,
  Package,
  Shield,
  Ship,
  TrendingUp,
} from "lucide-react";

type Metric = {
  value: string;
  title: string;
  description: string;
  icon: React.ElementType;
};

function MetricCard({
  value,
  title,
  description,
  icon: Icon,
  isArabic,
}: Metric & { isArabic: boolean }) {
  return (
    <article
      className="
        w-[300px]
        md:w-[330px]
        lg:w-[302px]
        h-[187px]
        shrink-0
        rounded-lg
        border border-slate-200
        bg-white
        p-4
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      {/* Accent Bar */}
      <div
        className={`mb-4 h-[3px] w-12 rounded-full bg-[#E8C060] ${
          isArabic ? "ml-auto" : ""
        }`}
      />

      {/* Value + Icon */}
      {/* Value + Icon */}
      {/* Value + Icon */}
      {/* Value + Icon */}
      <div
        className={`mb-5 flex items-center gap-3 ${
          isArabic ? "justify-end" : "justify-start"
        }`}
      >
        {isArabic ? (
          <>
            <h3 className="text-4xl font-bold text-[#244A77]">
              <bdi dir="ltr">{value}</bdi>
            </h3>

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E6F2FB]">
              <Icon className="h-6 w-6 text-[#244A77]" />
            </div>
          </>
        ) : (
          <>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E6F2FB]">
              <Icon className="h-6 w-6 text-[#244A77]" />
            </div>

            <h3 className="text-4xl font-bold text-[#244A77]">
              <bdi dir="ltr" className="text-[26px]">{value}</bdi>
            </h3>
          </>
        )}
      </div>

      {/* Title */}
      <h4
        dir={isArabic ? "rtl" : "ltr"}
        className="text-start text-sm font-extrabold"
      >
        {title}
      </h4>

      {/* Description */}
      <p
        dir={isArabic ? "rtl" : "ltr"}
        className="mt-2 text-start text-sm leading-6 text-slate-600"
      >
        {description}
      </p>
    </article>
  );
}

export default function MetricsSection() {

  const locale = useLocale();
  const isAr = locale.startsWith("ar");
  console.log({
    locale,
    isAr,
  });
  const t = useTranslations("SIMF.metrics");

const metrics: Metric[] = [
  {
    value: t("cards.0.value"),
    title: t("cards.0.title"),
    description: t("cards.0.description"),
    icon: Cable,
  },
  {
    value: t("cards.1.value"),
    title: t("cards.1.title"),
    description: t("cards.1.description"),
    icon: Landmark,
  },
  {
    value: t("cards.2.value"),
    title: t("cards.2.title"),
    description: t("cards.2.description"),
    icon: Ship,
  },
  {
    value: t("cards.3.value"),
    title: t("cards.3.title"),
    description: t("cards.3.description"),
    icon: Container,
  },
  {
    value: t("cards.4.value"),
    title: t("cards.4.title"),
    description: t("cards.4.description"),
    icon: TrendingUp,
  },
  {
    value: t("cards.5.value"),
    title: t("cards.5.title"),
    description: t("cards.5.description"),
    icon: Anchor,
  },
  {
    value: t("cards.6.value"),
    title: t("cards.6.title"),
    description: t("cards.6.description"),
    icon: Globe,
  },
  {
    value: t("cards.7.value"),
    title: t("cards.7.title"),
    description: t("cards.7.description"),
    icon: Package,
  },
  {
    value: t("cards.8.value"),
    title: t("cards.8.title"),
    description: t("cards.8.description"),
    icon: Database,
  },
  {
    value: t("cards.9.value"),
    title: t("cards.9.title"),
    description: t("cards.9.description"),
    icon: Cable,
  },
  {
    value: t("cards.10.value"),
    title: t("cards.10.title"),
    description: t("cards.10.description"),
    icon: Shield,
  },
  {
    value: t("cards.11.value"),
    title: t("cards.11.title"),
    description: t("cards.11.description"),
    icon: TrendingUp,
  }
  
];

const autoplay = useRef(
  Autoplay({
    delay: 500,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
  })
);
const autoScroll = useRef(
  AutoScroll({
    speed: 0.5,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
  })
);

const [emblaRef, emblaApi] = useEmblaCarousel(
  {
    loop: true,
    dragFree: true,

    // Keep carousel moving left-to-right.
    direction: isAr ? "rtl" : "ltr",
  },
  [autoScroll.current]
);

  return (
    <section className="relative overflow-hidden bg-[#EFF7FD]/70 py-16 lg:py-20"
      style={{
        background:
          "linear-gradient(0deg, rgba(230,242,251,0.64), rgba(230,242,251,0.64)), #FFFFFF",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* ================= HEADER ================= */}

        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-4xl font-bold leading-tight text-black lg:text-[2.2rem] lg:leading-normal font-['Noto Kufi Arabic']">
            {t("title")}
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600 font-['Noto Kufi Arabic']">
            {t("subtitle")}
          </p>
        </div>

        {/* ================= SLIDER ================= */}

        <div className="relative">

          {/* LEFT FADE */}

          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 hidden w-16 bg-gradient-to-r from-[#EFF7FD] to-transparent lg:block" />

          {/* RIGHT FADE */}

          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 hidden w-16 bg-gradient-to-l from-[#EFF7FD] to-transparent lg:block" />

          <div
            ref={emblaRef}
            className="relative overflow-hidden"
            dir="ltr"
          >
            <div
              className={`flex gap-4 px-4 ${
                isAr ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {metrics.map((metric) => (
                <MetricCard
                  key={`${metric.title}-${metric.value}`}
                  {...metric}
                  isArabic={isAr}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ================= FOOTER ================= */}

        <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          <p
            className={`mx-auto max-w-3xl text-base leading-8 text-[#244A77] font-['Noto_Kufi_Arabic'] text-center whitespace-pre-line`}
          >
            {isAr ? "يشهد العالم تحولات غير مسبوقة في أمن البحار،\n ومع تصاعد التهديدات التي تطال سلاسل الإمداد العالمية، يبرز أمن قاع البحار كأولوية دولية ملحة لتعزيز استقرار البحار وضمان استدامة الاقتصاد العالمي" : "The world is witnessing unprecedented transformations in maritime security. \nAs threats to global supply chains intensify, seabed security has emerged as an urgent international priority for strengthening maritime stability and ensuring the sustainability of the global economy."}
            
          </p>

          <div className="hidden flex justify-center gap-4">

            <button
              onClick={() => emblaApi?.scrollPrev()}
              className="
                flex
                h-14
                w-14
                items-center
                justify-center

                rounded-full

                bg-[#D9EBF9]

                transition

                hover:bg-[#c7e3f8]
              "
            >
              <ChevronLeft
                className={`h-6 w-6 text-[#007CD8] ${
                  isAr ? "rotate-180" : ""
                }`}
              />
            </button>

            <button
              onClick={() => emblaApi?.scrollNext()}
              className="
                flex
                h-14
                w-14
                items-center
                justify-center

                rounded-full

                bg-[#D9EBF9]

                transition

                hover:bg-[#c7e3f8]
              "
            >
              <ChevronRight
                className={`h-6 w-6 text-[#007CD8] ${
                  isAr ? "rotate-180" : ""
                }`}
              />
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}