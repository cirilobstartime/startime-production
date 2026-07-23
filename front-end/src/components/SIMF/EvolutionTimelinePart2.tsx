"use client";

import React from "react";
import { useTranslations } from "next-intl";

/**
 * SIMF "Target Audience" section (Figma node 9485:4391, "06 · Evolution Timeline" pt.2).
 *
 * Centered header + 4-stat icon row + three alternating audience cards.
 *
 * Tokens: eyebrow/icon violet #5a4280, number accent #7d23ce, icon badge bg #efecf2,
 * heading navy #244a77, body gray #4b5563, section bg #FAF9FB. Roboto — H2/H3 Bold.
 */

interface Stat {
  value: string;
  label: string;
  Icon: React.FC;
}

interface AudienceCard {
  title: string;
  bullets: string[];
  imageSrc?: string;
  imageAlt?: string;
}

interface EvolutionTimelinePart2Props {
  locale?: string;
  eyebrow?: string;
  heading?: string;
  lead?: string;
  stats?: Stat[];
  cards?: AudienceCard[] ;
}

/* --- stat icons (40px, currentColor) --- */

function GlobeIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3Z" />
    </svg>
  );
}

function AwardIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="6" />
      <path d="m8.2 13.4-1.7 6.1L12 17l5.5 2.5-1.7-6.1" />
    </svg>
  );
}

function MegaphoneIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m3 11 15-6v14l-15-6v-2ZM3 11H2a1 1 0 0 0-1 1v0a1 1 0 0 0 1 1h1M7 12.5V18a1 1 0 0 0 1 1h2" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M2 13h20" />
    </svg>
  );
}

/** Icon + value + stat key; label text comes from translations. */
const STAT_DEFS: { value: string; key: string; Icon: React.FC }[] = [
  { value: "+40", key: "countries", Icon: GlobeIcon },
  { value: "+100", key: "leaders", Icon: AwardIcon },
  { value: "+220", key: "speakers", Icon: MegaphoneIcon },
  { value: "+500", key: "sponsors", Icon: BriefcaseIcon },
];

/** Card keys; title/bullets text comes from translations. */
const CARD_KEYS = ["government", "organizations", "military"] as const;

export default function EvolutionTimelinePart2({
  locale = "en",
  eyebrow,
  heading,
  lead,
  stats,
  cards,
}: EvolutionTimelinePart2Props) {
  const isAr = locale === "ar";
  const t = useTranslations("SIMF.evolutiontimelinepart2");

  const eyebrowText = eyebrow ?? t("eyebrow");
  const headingText = heading ?? t("heading");
  const leadText = lead ?? t("lead");

  const resolvedStats: Stat[] =
    stats ??
    STAT_DEFS.map(({ value, key, Icon }) => ({
      value,
      Icon,
      label: t(`stats.${key}`),
    }));

  const CARD_IMAGES: Record<string, string> = {
    government: "/evotimelinep1-image1.webp",
    organizations: "/evotimelinep1-image2.webp",
    military: "/evotimelinep1-image3.webp",
  };

  const resolvedCards: AudienceCard[] =
    cards ??
    CARD_KEYS.map((key) => ({
      title: t(`cards.${key}.title`),
      bullets: t.raw(`cards.${key}.bullets`) as string[],
      imageSrc: CARD_IMAGES[key],
    }));

  

  return (
    <section dir={isAr ? "rtl" : "ltr"} className="w-full bg-[#FAF9FB]" style={{ backgroundColor: "#FAF9FB" }}>
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:px-20 md:py-24">
        {/* Header */}
        <div className="mx-auto flex max-w-4xl rtl:max-w-[63rem] flex-col items-center text-center">
          <p className="rtl:hidden text-xs font-bold uppercase tracking-[0.2em] text-[#5a4280]">
            {eyebrowText}
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-[#111827] md:text-[40px]">
            {headingText}
          </h2>
          <p className="mt-6 text-base leading-8 text-[#4b5563] md:text-lg">
            {leadText}
          </p>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-y-10 md:grid-cols-4">
          {resolvedStats.map(({ value, label, Icon }, i) => (
            <div key={label} className="relative flex flex-col items-center text-center">
              <div className="relative flex h-20 w-full items-center justify-center">
                {i < resolvedStats.length - 1 && (
                  <span
                    className={`absolute top-10 hidden h-px w-full -translate-y-1/2 bg-[#e2dcec] md:block ${
                      isAr ? "right-1/2" : "left-1/2"
                    }`}
                  />
                )}
                <span className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-[#efecf2] text-[#5a4280]">
                  <Icon />
                </span>
              </div>
              <span className="mt-5 text-4xl font-bold text-[#007cd8] md:text-[40px]">
                {value}
              </span>
              <span className="mt-2 text-base text-[#4b5563] md:text-lg">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Audience cards */}
        <div className="mt-16 flex flex-col gap-8 bg-[#FAF9FB] rounded-xl">
          {resolvedCards.map((card, i) => (
            <article
              key={card.title}
              className={`flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ${
                i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              {/* Text side */}
              <div className="flex flex-col p-8 md:w-3/5 md:p-12">
                <h3 className="text-2xl font-bold text-[#244a77] md:text-[32px]">
                  {card.title}
                </h3>
                <ul className="mt-6 space-y-3">
                  {card.bullets.map((b) => (
                    <li
                      key={b}
                      className="relative text-base leading-relaxed text-[#4b5563] ps-5"
                    >
                      <span className="absolute top-2.5 h-1.5 w-1.5 rounded-full bg-[#4b5563] start-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Image side */}
              <div className="relative min-h-[220px] bg-gradient-to-br from-[#f2e9fa] via-[#faf9fb] to-[#fdf9ef] md:min-h-0 md:w-2/5">
                {card.imageSrc && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={card.imageSrc}
                    alt={card.imageAlt ?? card.title}
                    className="absolute inset-0 h-full w-full"
                  />
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
