"use client";

import React from "react";

import { useTranslations } from "next-intl";

/**
 * SIMF "Services / The Agenda" section (Figma node 9485:6014, "Services Section").
 *
 * Dark section: centered header + a rounded bordered container split into five
 * pillars (icon + title + description) divided by vertical rules.
 *
 * Tokens: bg Ebony #111827, card border #d2d6db@10%, white headings, gray body.
 * Roboto (Latin) / Almarai (Arabic) — H2 Bold 40px, pillar title 18px Bold.
 */

interface Pillar {
  Icon: React.FC;
  title: string;
  description: string;
}

interface ServicesProps {
  locale?: string;
  eyebrow?: string;
  heading?: string;
  lead?: string;
  pillars?: Pillar[];
  learnMore?: string;
}

/* --- pillar icons (20px, currentColor) --- */

function GearIcon() {
  return (
    // <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    //   <circle cx="12" cy="12" r="3" />
    //   <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
    // </svg>
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24Z" fill="#E6F2FB" fillOpacity="0.12"/>
    <path d="M34 24H30M18 24H14M24 18V14M24 34V30M32 24C32 28.4183 28.4183 32 24 32C19.5817 32 16 28.4183 16 24C16 19.5817 19.5817 16 24 16C28.4183 16 32 19.5817 32 24ZM27 24C27 25.6569 25.6569 27 24 27C22.3431 27 21 25.6569 21 24C21 22.3431 22.3431 21 24 21C25.6569 21 27 22.3431 27 24Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>

  );
}

function GovernanceIcon() {
  return (
    // <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    //   <circle cx="12" cy="8" r="4" />
    //   <path d="M4 21a8 8 0 0 1 16 0" />
    // </svg>
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24Z" fill="#E6F2FB" fillOpacity="0.12"/>
    <path d="M14.6611 30.3391L19.255 25.7452M30.2175 14.7827C33.9275 18.4927 33.9275 24.5078 30.2175 28.2177C26.5075 31.9277 20.4924 31.9277 16.7825 28.2177M29 34.0002H19M24 34.0002V31.0002M29.5 21.5002C29.5 24.8139 26.8137 27.5002 23.5 27.5002C20.1863 27.5002 17.5 24.8139 17.5 21.5002C17.5 18.1865 20.1863 15.5002 23.5 15.5002C26.8137 15.5002 29.5 18.1865 29.5 21.5002Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>

  );
}

function ShieldIcon() {
  return (
    // <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    //   <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1Z" />
    // </svg>
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24Z" fill="#E6F2FB" fillOpacity="0.12"/>
    <path d="M23.302 33.6147C23.5234 33.7439 23.6341 33.8085 23.7903 33.842C23.9116 33.868 24.0884 33.868 24.2097 33.842C24.3659 33.8085 24.4766 33.7439 24.698 33.6147C26.646 32.4783 32 28.9083 32 23.9999V19.2175C32 18.418 32 18.0182 31.8692 17.6746C31.7537 17.371 31.566 17.1001 31.3223 16.8854C31.0465 16.6423 30.6722 16.5019 29.9236 16.2212L24.5618 14.2105C24.3539 14.1326 24.25 14.0936 24.143 14.0782C24.0482 14.0644 23.9518 14.0644 23.857 14.0782C23.75 14.0936 23.6461 14.1326 23.4382 14.2105L18.0764 16.2212C17.3278 16.5019 16.9535 16.6423 16.6777 16.8854C16.434 17.1001 16.2463 17.371 16.1308 17.6746C16 18.0182 16 18.418 16 19.2175V23.9999C16 28.9083 21.354 32.4783 23.302 33.6147Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>

  );
}

function BoltIcon() {
  return (
    // <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    //   <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />
    // </svg>
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24Z" fill="#E6F2FB" fillOpacity="0.12"/>
    <path d="M24.9999 14L16.0933 24.6879C15.7445 25.1064 15.5701 25.3157 15.5674 25.4925C15.5651 25.6461 15.6336 25.7923 15.7531 25.8889C15.8906 26 16.163 26 16.7079 26H23.9999L22.9999 34L31.9064 23.3121C32.2552 22.8936 32.4296 22.6843 32.4323 22.5075C32.4346 22.3539 32.3661 22.2077 32.2466 22.1111C32.1091 22 31.8367 22 31.2918 22H23.9999L24.9999 14Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>

  );
}

function GlobeIcon() {
  return (
    // <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    //   <circle cx="12" cy="12" r="9" />
    //   <path d="M3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3Z" />
    // </svg>
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24Z" fill="#E6F2FB" fillOpacity="0.12"/>
    <path d="M15.076 19.4828L19.364 22.5457C19.5872 22.705 19.6987 22.7847 19.8155 22.8031C19.9182 22.8192 20.0234 22.8029 20.1165 22.7565C20.2222 22.7037 20.3045 22.594 20.469 22.3747L21.3751 21.1665C21.4216 21.1045 21.4449 21.0735 21.4722 21.0467C21.4965 21.023 21.5232 21.0017 21.5517 20.9834C21.5839 20.9627 21.6193 20.947 21.6902 20.9155L25.5588 19.1961C25.7192 19.1248 25.7993 19.0892 25.8598 19.0335C25.9133 18.9843 25.9554 18.924 25.9832 18.8568C26.0146 18.7809 26.0204 18.6934 26.0321 18.5183L26.3154 14.2694M25.5 25.5L28.116 26.6211C28.4195 26.7512 28.5713 26.8163 28.6517 26.9243C28.7222 27.0191 28.7569 27.1358 28.7496 27.2537C28.7413 27.3881 28.6497 27.5255 28.4665 27.8002L27.2375 29.6438C27.1507 29.774 27.1072 29.8391 27.0499 29.8863C26.9991 29.928 26.9406 29.9593 26.8777 29.9784C26.8067 30 26.7284 30 26.5719 30H24.5766C24.3693 30 24.2656 30 24.1774 29.9653C24.0995 29.9347 24.0305 29.885 23.9768 29.8208C23.916 29.7481 23.8832 29.6497 23.8177 29.453L23.1048 27.3144C23.0661 27.1983 23.0468 27.1403 23.0417 27.0814C23.0372 27.0291 23.0409 26.9764 23.0528 26.9253C23.0662 26.8677 23.0935 26.813 23.1482 26.7036L23.6897 25.6206C23.7997 25.4005 23.8547 25.2905 23.9395 25.2222C24.0141 25.162 24.1046 25.1246 24.1999 25.1143C24.3081 25.1027 24.4248 25.1416 24.6582 25.2194L25.5 25.5ZM34 24C34 29.5228 29.5228 34 24 34C18.4772 34 14 29.5228 14 24C14 18.4772 18.4772 14 24 14C29.5228 14 34 18.4772 34 24Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>

  );
}

const PILLARS_EN: Pillar[] = [
  {
    Icon: GearIcon,
    title: "Advanced Technologies for Seabed & Supply Chain Security ",
    description: " The role of advanced technologies and innovation in protecting the seabed and enhancing supply chain security. ",
  },
  {
    Icon: GovernanceIcon,
    title: "International Governance of Seabed Security",
    description: " International efforts to strengthen the governance and security of the seabed. ",
  },
  {
    Icon: ShieldIcon,
    title: "Seabed Security & International Security ",
    description: "Protecting critical seabed infrastructure and its role in safeguarding international security. ",
  },
  {
    Icon: BoltIcon,
    title: "Energy Supply Threats & Their Economic Impact ",
    description: "Threats to global energy supply chains and their implications for the world economy. ",
  },
  {
    Icon: GlobeIcon,
    title: "Global Strategic Environment & Maritime Supply Chain Security",
    description: "The evolving global strategic landscape and its impact on maritime supply chain security. ",
  },
];

const PILLARS_AR: Pillar[] = [
  {
    Icon: GearIcon,
    title: "البيئة الاستراتيجية العالمية وأمن سلاسل الإمداد البحرية",
    description: "المتغيرات في البيئة الاستراتيجية العالمية وتأثيرها على أمن سلاسل الإمداد البحرية",
  },
  {
    Icon: GovernanceIcon,
    title: "تهديدات إمداد الطاقة وتداعياتها الاقتصادية",
    description: "التهديدات على سلاسل إمداد الطاقة وأثرها على الاقتصاد العالمي",
  },
  {
    Icon: ShieldIcon,
    title: "أمن قاع البحار والأمن الدولي",
    description: "حماية قاع البحار وأثره على الأمن الدولي",
  },
  {
    Icon: BoltIcon,
    title: "الحوكمة الدولية لأمن قاع البحار",
    description: "الجهود الدولية في حوكمة أمن وقاع البحار",
  },
  {
    Icon: GlobeIcon,
    title: "التقنيات الحديثة وتأمين قاع البحار وسلاسل الإمداد",
    description: "دور التقنيات الحديثة والابتكار في أمن قاع البحار وسلاسل الإمداد",
  },
];

export default function Services({
  locale = "en",
  eyebrow,
  heading,
  lead,
  pillars,
  learnMore,
}: ServicesProps) {
  const isAr = locale === "ar";

  const resolvedEyebrow = eyebrow ?? (isAr ? "المحاور الرئيسية" : "THE AGENDA");
  const resolvedHeading = heading ?? (isAr ? "المحاور الرئيسية" : "Key Themes");
  const resolvedLead =
    lead ??
    (isAr
      ? "لصياغة رؤية استراتيجية شاملة تعالج منظومات الطاقة والتجارة والاتصال بين السطح والأعماق عبر خمسة محاور رئيسية تشكل ركائز الأمن البحري واستقرار الاقتصاد العالمي"
      : " A comprehensive strategic vision addressing the interconnected systems of energy, trade, and communications—from the surface to the seabed—through five key pillars that strengthen maritime security and support global economic stability. ");
  const resolvedPillars = pillars ?? (isAr ? PILLARS_AR : PILLARS_EN);

  const resolvedLearnMore = learnMore ?? (isAr ? "المزيد" : "Learn More");
  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className="servicesection w-full bg-[#111827]"
      style={{ backgroundColor: "#111827", ...(isAr ? { fontFamily: "Almarai, sans-serif" } : {}) }}
    >
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:px-20 md:py-24">
        {/* Header */}
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          {/* <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c7cacf]">
            {resolvedEyebrow}
          </p> */}
          <h2 className="mt-3 text-3xl font-bold leading-tight text-white md:text-[40px]">
            {resolvedHeading}
          </h2>
          <p className="mt-4 text-base leading-8 text-[#9aa2b1] md:text-lg">
            {resolvedLead}
          </p>
        </div>

        {/* Pillars container */}
        <div className="mt-14 grid grid-cols-1 divide-y divide-white/10 overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.02] lg:grid-cols-5 lg:divide-x lg:divide-y-0 rtl:lg:divide-x-reverse">
          {resolvedPillars.map(({ Icon, title, description }) => (
            <div key={title} className="flex flex-col items-center p-8 text-center">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/90">
                <Icon />
              </span>
              <h3 className="mt-6 text-lg font-bold text-white">{title}</h3>
              <p className="mt-3 text-base leading-6 text-[#9aa2b1]">{description}</p>
            </div>
          ))}
        </div>
        {/* CTA Row */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 pb-4 sm:flex-row">
          
          <a
            href="tel:920010500"
            aria-label={resolvedLearnMore}
            className="inline-flex h-12 min-w-[142px] items-center justify-center rounded-full bg-[#e8c060] px-6 text-base font-extrabold text-[#001640] transition-colors hover:bg-[#dcb24c]"
          >
            {resolvedLearnMore}
          </a>
        </div>
      </div>
    </section>
  );
}
