"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

/**
 * SIMF Video Banner + registration countdown ("section 9", Figma node 9485:4319).
 *
 * Tokens: bg white, numbers #001640, labels #007cd8, "closes in" #b5b6b6,
 * primary CTA #007cd8, secondary CTA #e8c060. Roboto ExtraBold type.
 */

interface VideoBannerProps {
  locale?: string;
  /** ISO date the registration countdown targets. */
  targetDate?: string;
  videoSrc?: string;
  poster?: string;
  tempImgSrc?: string;
}

interface TimeLeft {
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const EMPTY: TimeLeft = { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };

function getTimeLeft(target: number): TimeLeft {
  let diff = Math.max(0, target - Date.now());
  const sec = Math.floor(diff / 1000);
  const months = Math.floor(sec / (30 * 24 * 3600));
  const days = Math.floor((sec % (30 * 24 * 3600)) / (24 * 3600));
  const hours = Math.floor((sec % (24 * 3600)) / 3600);
  const minutes = Math.floor((sec % 3600) / 60);
  const seconds = sec % 60;
  return { months, days, hours, minutes, seconds };
}

const pad = (n: number) => String(n).padStart(2, "0");

function PlayIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5.14v13.72a1 1 0 0 0 1.52.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14Z" />
    </svg>
  );
}

export default function VideoBanner({
  locale = "en",
  targetDate = "2026-11-16T09:00:00",
  videoSrc = "/final-web-2.mp4",
  poster = "/sim-video-poster.webp",
  tempImgSrc,
}: VideoBannerProps) {
  const isAr = locale === "ar";
  const t = useTranslations("SIMF.videobanner");
  const target = new Date(targetDate).getTime();
  const resolvedTempImgSrc = tempImgSrc ?? (isAr ? "/SIM-banner-ENG.png" : "/SIM-banner-AR.png");

  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState<TimeLeft>(EMPTY);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(getTimeLeft(target));
    const id = setInterval(() => setTime(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const handlePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play();
    setPlaying(true);
  }, []);

  const units: { value: number; key: string }[] = [
    { value: time.months, key: "months" },
    { value: time.days, key: "days" },
    { value: time.hours, key: "hours" },
    { value: time.minutes, key: "minutes" },
    { value: time.seconds, key: "seconds" },
  ];

  return (
    <section dir={isAr ? "rtl" : "ltr"} className="w-full bg-white">
      <div className="videodiv mx-auto max-w-[1440px] px-5 sm:px-8 md:px-20 md:mt[-4rem]">
        {/* Video */}
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl shadow-2xl md:aspect-[1280/520] md:rounded-[24px]">
          <video
            ref={videoRef}
            src={videoSrc}
            poster={poster}
            loop
            muted
            playsInline
            autoPlay
            className="h-full w-full object-cover"
            title="Saudi International Maritime Forum introduction video"
            aria-label="Saudi International Maritime Forum introduction video"
          />
          {/* <img src={resolvedTempImgSrc} alt="Saudi International Maritime Forum" className="h-full w-full object-cover" /> */}
          {!playing && (
            <button
              type="button"
              onClick={handlePlay}
              aria-label={t("playVideo")}
              className="group absolute inset-0 flex items-center justify-center bg-black/10 transition-colors hover:bg-black/20"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/40 backdrop-blur-sm transition-transform group-hover:scale-105 md:h-20 md:w-20">
                <span className={isAr ? "-scale-x-100" : ""}>
                  <PlayIcon />
                </span>
              </span>
            </button>
          )}
        </div>

        {/* Countdown */}
        <div className="mt-12 flex flex-col items-center md:mt-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#b5b6b6]">
            {t("registrationClosesIn")}
          </p>

          <div className="mt-5 flex items-start justify-center gap-4 sm:gap-6 md:gap-8">
            {units.map(({ value, key }) => (
              <div key={key} className="flex w-14 flex-col items-center sm:w-[86px]">
                <span
                  className="text-3xl font-extrabold leading-none tabular-nums text-[#001640] sm:text-4xl"
                  suppressHydrationWarning
                >
                  {mounted ? pad(value) : "00"}
                </span>
                <span className="mt-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#007cd8] sm:text-[11px]">
                  {t(`units.${key}`)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Row */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 pb-4 sm:flex-row">
          <a
            href="tel:920010500"
            aria-label={t("registerNow")}
            className="inline-flex h-12 min-w-[145px] items-center justify-center rounded-full bg-[#007cd8] px-6 text-base font-extrabold text-white transition-colors hover:bg-[#0069b6]"
          >
            {t("registerNow")}
          </a>
          <a
            href="tel:920010500"
            aria-label={t("contactUs")}
            className="inline-flex h-12 min-w-[142px] items-center justify-center rounded-full bg-[#e8c060] px-6 text-base font-extrabold text-[#001640] transition-colors hover:bg-[#dcb24c]"
          >
            {t("contactUs")}
          </a>
        </div>
      </div>
    </section>
  );
}
