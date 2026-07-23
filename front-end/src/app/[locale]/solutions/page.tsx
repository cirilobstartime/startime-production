import React from "react";
import ResponsibleAISection from "@/components/Solutions/ResponsibleAISection";
import SolutionsHero from "@/components/Solutions/SolutionsHero";
import TransformationSection from "@/components/Solutions/TransformationSection";
import VisionRealitySection from "@/components/Solutions/VisionRealitySection";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title:
      locale === "ar"
        ? "الحلول | ستارتايم"
        : "Solutions | Startime",

    description:
      locale === "ar"
        ? "اكتشف حلول وخدمات ستارتايم المصممة لتحقيق أثر مستدام."
        : "Explore Startime's solutions and services designed to create lasting impact.",

    alternates: {
      canonical: `https://startime.sa/${locale}/solutions`,

      languages: {
        en: "https://startime.sa/en/solutions",
        ar: "https://startime.sa/ar/solutions",

        "x-default":
          "https://startime.sa/en/solutions",
      },
    },
  };
}

export default function SolutionsPage({ params }: PageProps) {
  const { locale } = React.use(params);
  const isAr = locale === "ar";

  return (
    <main dir={isAr ? "rtl" : "ltr"} className="bg-black min-h-screen">
      <SolutionsHero locale={locale} />
      <TransformationSection locale={locale} />
      <VisionRealitySection locale={locale} />
      <ResponsibleAISection />
    </main>
  );
}
