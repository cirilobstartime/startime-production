"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

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
  label: string;
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
  { value: "1.4M km", label: "Subsea cables on the seabed" },
  { value: "$19T / yr", label: "Financial data flowing across the seas" },
  { value: "+350%", label: "Rise in shipping costs in recent years" },
  { value: "80%", label: "Of global goods are transported by sea" },
  { value: "+100M", label: "Containers moved annually" },
  { value: "30–50%", label: "Delays in major shifting corridors" },
  { value: "+50%", label: "Global oil trade moves through maritime corridors" },
  { value: "+30%", label: "LNG transported by sea" },
  { value: "900K+ km", label: "LNG transported by the sea" },
  { value: "900K+ km", label: "Subsea pipelines worldwide" },
  { value: "400+", label: "Active cables connecting continents" },
  { value: "200%", label: "Increase in maritime cyber threats (5 years)" },
  { value: "300%", label: "Surge in attacks on maritime infrastructure" },
];

const DEFAULT_METRICS_AR: Metric[] = [
  { value: "1.4 مليون كم", label: "الكابلات البحرية في قاع البحر" },
  { value: "19 تريليون دولار / سنة", label: "البيانات المالية تتدفق عبر البحار" },
  { value: "+350%", label: "ارتفاع تكاليف الشحن في السنوات الأخيرة" },
  { value: "80%", label: "من البضائع العالمية يتم نقلها عن طريق البحر" },
  { value: "100 م", label: "الحاويات تتحرك عبر الموانئ سنويا" },
  { value: "30-50%", label: "التأخير في ممرات التحول الرئيسية" },
  { value: "+50%", label: "وتتحرك تجارة النفط العالمية عبر الممرات البحرية" },
  { value: "+30%", label: "الغاز الطبيعي المسال المنقول بحرا" },
  { value: "900 ألف+ كم", label: "الغاز الطبيعي المسال المنقول بحرا." },
  { value: "900 ألف+ كم", label: "خطوط الأنابيب تحت سطح البحر في جميع أنحاء العالم" },
  { value: "400+ ألف+ كم", label: "الكابلات النشطة التي تربط القارات" },
  { value: "200% ألف+ كم", label: "زيادة التهديدات السيبرانية البحرية (5 سنوات)" },
  { value: "300% ألف+ كم", label: "تصاعد الهجمات على البنية التحتية البحرية" },
];

function CheckCircleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </svg>
  );
}

export default function MetricsDashboard({
  locale = "en",
  eyebrow,
  heading ,
  lead,
  caption,
  metrics,
}: MetricsDashboardProps) {
  const isAr = locale === "ar";
  const t = useTranslations("SIMF.metricsdashboard");

  const eyebrowText = eyebrow ?? t("eyebrow");
  const headingText = heading ?? t("heading");
  const leadText = lead ?? t("lead");
  const captionText = caption ?? t("caption");

  const resolvedMetrics = metrics ?? (isAr ? DEFAULT_METRICS_AR : DEFAULT_METRICS);

  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const dragRef = useRef({ down: false, startX: 0, startScroll: 0, moved: false });

  // Auto-slide
  useEffect(() => {
    const id = setInterval(() => {
      const track = trackRef.current;
      if (!track || pausedRef.current) return;
      const max = track.scrollWidth - track.clientWidth;
      const step = Math.max(240, track.clientWidth * 0.5);
      const dir = isAr ? -1 : 1;
      const atEnd = isAr ? track.scrollLeft <= -(max - 4) : track.scrollLeft >= max - 4;
      if (atEnd) {
        track.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        track.scrollBy({ left: step * dir, behavior: "smooth" });
      }
    }, 3500);
    return () => clearInterval(id);
  }, [isAr]);

  // Drag-to-scroll
  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;
    pausedRef.current = true;
    dragRef.current = { down: true, startX: e.clientX, startScroll: track.scrollLeft, moved: false };
    track.setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    const drag = dragRef.current;
    if (!track || !drag.down) return;
    const dx = e.clientX - drag.startX;
    if (Math.abs(dx) > 4) drag.moved = true;
    track.scrollLeft = drag.startScroll - dx;
  }, []);

  const endDrag = useCallback(() => {
    dragRef.current.down = false;
    pausedRef.current = false;
  }, []);

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className="w-full"
      style={{
        background:
          "linear-gradient(125deg, #f7f4fb 0%, #faf9fc 45%, #f3e6fb 100%)",
      }}
    >
      <div className="mx-auto max-w-[1440px] py-20 md:py-24">
        {/* Header */}
        <div className="mx-auto flex max-w-3xl flex-col items-center px-5 text-center sm:px-8">
          <p className="text-m font-bold uppercase tracking-[0.2em] text-[#007cd8]">
            {eyebrowText}
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-[#111827] md:text-[40px]">
            {headingText}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-[#4b5563] md:text-lg">
            {leadText}
          </p>
        </div>

        {/* Carousel */}
        <div className="relative mt-12">
          {/* edge fade masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r from-[#f7f4fb] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-[#f3e6fb] to-transparent" />

          <div
            ref={trackRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onPointerEnter={() => (pausedRef.current = true)}
            onPointerLeave={() => {
              if (!dragRef.current.down) pausedRef.current = false;
            }}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-14 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ cursor: "grab", touchAction: "pan-y" }}
          >
            {resolvedMetrics.map((m) => (
              <article
                key={m.label}
                className="flex w-60 shrink-0 snap-start flex-col rounded-2xl bg-white p-6 shadow-[0_10px_30px_-12px_rgba(90,66,128,0.25)]"
              >
                <span className="h-1 w-10 rounded-full bg-[#7d23ce]" />
                <div className="mt-5 flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f2e9fa] text-[#7d23ce]">
                    <CheckCircleIcon />
                  </span>
                  <span className="text-2xl font-bold text-[#111827]">{m.value}</span>
                </div>
                <p className="mt-4 text-sm leading-snug text-[#4b5563]">{m.label}</p>
              </article>
            ))}
          </div>
        </div>

        {/* Caption */}
        <p className="mt-10 px-5 text-center text-sm font-medium text-[#5a4280]">
          { captionText }
        </p>
      </div>
    </section>
  );
}
