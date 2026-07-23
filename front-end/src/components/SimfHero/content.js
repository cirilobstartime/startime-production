export type IconName = "shield" | "anchor" | "calendar" | "pin";

export interface HeroInfo {
  icon: IconName;
  label: string;
  value: string;
}

export interface HeroContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  tertiaryLink: {
    label: string;
    href: string;
  };
  info: HeroInfo[];
}

export const defaultContent: Record<"en" | "ar", HeroContent> = {
  en: {
    eyebrow: "A STARTIME FLAGSHIP EVENT",
    title: "Saudi International Maritime Forum",
    subtitle:
      "Join defense leaders, decision-makers, and experts on a sovereign platform reshaping the future security of energy, trade, and data flows across the seas.",
    primaryCta: {
      label: "Contact Us",
      href: "#contact",
    },
    secondaryCta: {
      label: "Explore the Forum",
      href: "#forum",
    },
    tertiaryLink: {
      label: "Continue to StarTime",
      href: "#startime",
    },
    info: [
      {
        icon: "shield",
        label: "Supervised by",
        value: "Ministry of Defense",
      },
      {
        icon: "anchor",
        label: "Organized by",
        value: "Royal Saudi Naval Forces",
      },
      {
        icon: "calendar",
        label: "Date",
        value: "23–25 November 2026",
      },
      {
        icon: "pin",
        label: "Location",
        value:
          "Sofitel Riyadh Hotel & Convention Center, Riyadh, Kingdom of Saudi Arabia",
      },
    ],
  },

  ar: {
    eyebrow: "حدث رئيسي لستارتايم",
    title: "الملتقى البحري السعودي الدولي",
    subtitle:
      "انضم لقادة الدفاع، صناع القرار والخبراء في منصة سيادية تعيد تشكيل مستقبل أمن الطاقة والتجارة والبيانات عبر البحار",
    primaryCta: {
      label: "تواصل معنا",
      href: "#contact",
    },
    secondaryCta: {
      label: "استكشف الملتقى",
      href: "#forum",
    },
    tertiaryLink: {
      label: "تابع إلى ستارتايم",
      href: "#startime",
    },
    info: [
      {
        icon: "shield",
        label: "تحت إشراف",
        value: "وزارة الدفاع",
      },
      {
        icon: "anchor",
        label: "تنظيم",
        value: "القوات البحرية الملكية السعودية",
      },
      {
        icon: "calendar",
        label: "التاريخ",
        value: "23–25 نوفمبر 2026",
      },
      {
        icon: "pin",
        label: "الموقع",
        value: "فندق سوفيتل، الرياض، المملكة العربية السعودية",
      },
    ],
  },
};