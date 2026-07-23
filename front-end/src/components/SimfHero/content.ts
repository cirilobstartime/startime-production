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
    title: "The Fourth Saudi International Maritime Forum",
    subtitle:
      "A Saudi global platform for dialogue and cooperation on the future of maritime energy security, trade resilience, and data flows across the seas.",
    primaryCta: {
      label: "Learn More",
      href: "/en/simf",
    },
    secondaryCta: {
      label: "Contact Us",
      href: "/en/simf",
    },
    tertiaryLink: {
      label: "Continue to Startime",
      href: "#startime",
    },
    info: [
    //   {
    //     icon: "shield",
    //     label: "Supervised by",
    //     value: "Ministry of Defense",
    //   },
    //   {
    //     icon: "anchor",
    //     label: "Organized by",
    //     value: "Royal Saudi Naval Forces",
    //   },
      {
        icon: "calendar",
        label: "Date",
        value: "23–25 November 2026",
      },
      {
        icon: "pin",
        label: "Location",
        value:
          "Sofitel Riyadh Hotel & Convention Center | Riyadh, Kingdom of Saudi Arabia",
      },
    ],
  },

  ar: {
    eyebrow: "حدث رئيسي لستارتايم",
    title: "الملتقى البحري السعودي الدولي الرابع",
    subtitle:
      "منصة سعودية عالمية للحوار والتعاون في مستقبل أمن الطاقة والتجارة والبيانات عبر البحار",
    primaryCta: {
      label: "المزيد",
      href: "/en/simf",
    },
    secondaryCta: {
      label: "تواصل معنا",
      href: "/en/simf",
    },
    tertiaryLink: {
      label: "تابع إلى ستارتايم",
      href: "#startime",
    },
    info: [
    //   {
    //     icon: "shield",
    //     label: "تحت إشراف",
    //     value: "وزارة الدفاع",
    //   },
    //   {
    //     icon: "anchor",
    //     label: "تنظيم",
    //     value: "القوات البحرية الملكية السعودية",
    //   },
      {
        icon: "calendar",
        label: "التاريخ",
        value: "23–25 نوفمبر 2026",
      },
      {
        icon: "pin",
        label: "الموقع",
        value: "فندق ومركز مؤتمرات سوفيتيل الرياض | الرياض، المملكة العربية السعودية",
      },
    ],
  },
};