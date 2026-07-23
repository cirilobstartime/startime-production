"use client";

import React from "react";
import { useTranslations } from "next-intl";

/**
 * SIMF "Evolution Timeline" section (Figma node 9485:4346, "06 · Evolution Timeline").
 *
 * Centered header + horizontal 4-step timeline of past/current editions + archive link.
 *
 * Tokens: eyebrow/link violet #5b4180, current accent #7d23ce, pill bg #f2e9fa,
 * heading #111827, body/year gray #4b5563. Roboto — H2 Bold 40px.
 */

interface Milestone {
  year: string;
  location: string;
  title: string;
  current?: boolean;
}

interface EvolutionTimelinePart1Props {
  locale?: string;
  eyebrow?: string;
  heading?: string;
  lead?: string;
  milestones?: Milestone[];
  archiveLabel?: string;
  archiveHref?: string;
}

/** Year + current-edition flag; location/title text comes from translations. */
const MILESTONE_YEARS: { year: string; current?: boolean }[] = [
  { year: "2019" },
  { year: "2022" },
  { year: "2024" },
  { year: "2026", current: true },
];

function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export default function EvolutionTimelinePart1({
  locale = "en",
  eyebrow,
  heading,
  lead,
  milestones,
  archiveLabel,
  archiveHref = "#archive",
}: EvolutionTimelinePart1Props) {
  const isAr = locale === "ar";
  const t = useTranslations("SIMF.evolutiontimelinepart1");

  const eyebrowText = eyebrow ?? t("eyebrow");
  const headingText = heading ?? t("heading");
  const leadText = lead ?? t("lead");
  const archiveLabelText = archiveLabel ?? t("archiveLabel");

  const resolvedMilestones: Milestone[] =
    milestones ??
    MILESTONE_YEARS.map(({ year, current }) => ({
      year,
      current,
      location: t(`milestones.${year}.location`),
      title: t(`milestones.${year}.title`),
    }));

  return (
    <section dir={isAr ? "rtl" : "ltr"} className="w-full bg-[#FAF9FB]" style={{ backgroundColor: "#FAF9FB" }}>
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:px-20 md:py-24">
        {/* Header */}
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          {/* <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5b4180]">
            {eyebrowText}
          </p> */}
          <h2 className="mt-3 text-3xl font-bold leading-tight text-[#111827] md:text-[40px]">
            {headingText}
          </h2>
          {/* <p className="mt-4 max-w-2xl text-base leading-8 text-[#4b5563] md:text-lg">
            {leadText}
          </p> */}
        </div>

        {/* Timeline */}
        <div className="mt-16">
          {/* Stepper (desktop) */}
          <div className="mb-8 hidden grid-cols-4 lg:grid" aria-hidden="true">
            {resolvedMilestones.map((m, i) => (
              <div key={m.year} className="relative flex justify-center">
                {i < resolvedMilestones.length - 1 && (
                  <span
                    className={`absolute top-1/2 h-px w-full -translate-y-1/2 bg-[#d7bbf0] ${
                      isAr ? "right-1/2" : "left-1/2"
                    }`}
                  />
                )}
                <span
                  className={`relative z-10 h-3 w-3 rounded-full ${
                    m.current
                      ? "bg-[#7d23ce]"
                      : "border-2 border-[#d7bbf0] bg-white"
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Milestone blocks */}
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
            {resolvedMilestones.map((m) => (
              <div key={m.year} className="flex flex-col items-center text-center">
                <span
                  className={`text-4xl font-bold leading-none md:text-[40px] ${
                    m.current ? "text-[#7d23ce]" : "text-[#4b5563]"
                  }`}
                >
                  {m.year}
                </span>

                <span className="mt-4 inline-flex items-center gap-1.5 text-xs text-[#6b7280]">
                  <PinIcon />
                  {m.location}
                </span>

                <p className="mt-3 max-w-[224px] text-sm leading-4 text-[#4b5563]">
                  {m.title}
                </p>

                {m.current && (
                  <span className="mt-3 inline-flex items-center rounded-full bg-[#f2e9fa] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#7d23ce]">
                    {t("currentEdition")}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Archive link */}
        <div className="mt-12 flex justify-center">
          <a
            href={archiveHref}
            className="inline-flex items-center gap-2 text-base font-medium text-[#5b4180] transition-colors hover:text-[#7d23ce]"
          >
            {archiveLabelText}
            <ArrowUpRightIcon className={isAr ? "-scale-x-100" : ""} />
          </a>
        </div>
      </div>
    </section>
  );
}
