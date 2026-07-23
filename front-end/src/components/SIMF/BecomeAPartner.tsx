import React from "react";

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
  ctaBtn1?: string;
  ctaBtn2?: string;
}

/* --- pillar icons (20px, currentColor) --- */

function GearIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
    </svg>
  );
}

function GovernanceIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1Z" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3Z" />
    </svg>
  );
}

const PILLARS_EN: Pillar[] = [
  {
    Icon: GearIcon,
    title: "Modern Technologies & Securing the Seabed and Supply Chains",
    description: "The role of modern technologies and innovation in seabed security and supply chains.",
  },
  {
    Icon: GovernanceIcon,
    title: "International Governance for Seabed Security",
    description: "International efforts in governing seabed security and protection.",
  },
  {
    Icon: ShieldIcon,
    title: "Seabed Security & International Security",
    description: "Protecting the seabed and its impact on international security.",
  },
  {
    Icon: BoltIcon,
    title: "Energy Supply Threats & Economic Implications",
    description: "Threats to energy supply chains and their impact on the global economy.",
  },
  {
    Icon: GlobeIcon,
    title: "Global Strategic Environment & Maritime Supply Chain Security",
    description: "Shifts in the global strategic environment and their impact on maritime supply chain security.",
  },
];

const PILLARS_AR: Pillar[] = [
  {
    Icon: GearIcon,
    title: "التقنيات الحديثة وتأمين قاع البحار وسلاسل الإمداد",
    description: "دور التقنيات الحديثة والابتكار في أمن قاع البحار وسلاسل الإمداد.",
  },
  {
    Icon: GovernanceIcon,
    title: "الحوكمة الدولية لأمن قاع البحار",
    description: "الجهود الدولية في حوكمة أمن وحماية قاع البحار.",
  },
  {
    Icon: ShieldIcon,
    title: "أمن قاع البحار والأمن الدولي",
    description: "حماية قاع البحار وأثره على الأمن الدولي.",
  },
  {
    Icon: BoltIcon,
    title: "تهديدات إمداد الطاقة وتداعياتها الاقتصادية",
    description: "التهديدات على سلاسل إمداد الطاقة وأثرها على الاقتصاد العالمي.",
  },
  {
    Icon: GlobeIcon,
    title: "البيئة الاستراتيجية العالمية وأمن سلاسل الإمداد البحرية",
    description: "المتغيرات في البيئة الاستراتيجية العالمية وتأثيرها على أمن سلاسل الإمداد البحرية.",
  },
];

export default function BecomeAPartner({
  locale = "en",
  eyebrow,
  heading,
  lead,
  pillars,
  ctaBtn1,
  ctaBtn2,
}: ServicesProps) {
  const isAr = locale === "ar";

  const resolvedEyebrow = eyebrow ?? (isAr ? "الأجندة" : "THE AGENDA");
  const resolvedHeading = heading ?? (isAr ? "هل أنت مستعد للمساهمة في صياغة مستقبل الأمن البحري؟" : "Are You Ready to Help Shape the Future of Maritime Security?");
  const resolvedLead =
    lead ??
    (isAr
      ? "انضم إلى القادة الحكوميين وروّاد الصناعة والخبراء الدوليين في الرياض، 23–25 نوفمبر 2026."
      : "Join government leaders, industry pioneers, and international experts in Riyadh, 23-25 November 2026.");
  const resolvedPillars = pillars ?? (isAr ? PILLARS_AR : PILLARS_EN);

  const resolvedCtaBtn1 = ctaBtn1 ?? (isAr ? "كن شريكاً" : "Become a Partner");
  const resolvedCtaBtn2 = ctaBtn2 ?? (isAr ? "انضم الآن" : "Join Now");

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className="w-full bg-[#111827]"
      style={{ backgroundColor: "#111827", ...(isAr ? { fontFamily: "Almarai, sans-serif" } : {}) }}
    >
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:px-20 md:py-24">
        {/* Header */}
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <p className="hidden text-xs font-bold uppercase tracking-[0.2em] text-[#c7cacf]">
            {resolvedEyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-white md:text-[40px]">
            {resolvedHeading}
          </h2>
          <p className="mt-4 text-base leading-8 text-[#9aa2b1] md:text-lg">
            {resolvedLead}
          </p>
        </div>

        {/* Pillars container */}
        <div className="hidden mt-14 grid grid-cols-1 divide-y divide-white/10 overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.02] lg:grid-cols-5 lg:divide-x lg:divide-y-0 rtl:lg:divide-x-reverse">
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
            aria-label={resolvedCtaBtn1}
            className="becomeapartnerbtn inline-flex h-12 min-w-[145px] items-center justify-center rounded-full bg-[#5B4180] px-6 text-base font-extrabold text-white transition-colors hover:bg-[#5B4180]"
          >
            {resolvedCtaBtn1}
          </a>
          <a
            href="tel:920010500"
            aria-label={resolvedCtaBtn2}
            className="joinnowbtn inline-flex h-12 min-w-[142px] items-center justify-center rounded-full bg-[#e8c060] px-6 text-base font-extrabold text-[#4B5563] transition-colors hover:bg-[#4B5563]"
          >
            {resolvedCtaBtn2}
          </a>
        </div>
      </div>
    </section>
  );
}
