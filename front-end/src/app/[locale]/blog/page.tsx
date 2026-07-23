import React from "react";
import PortfolioClient from "@/components/portfolio/PortfolioClient";
import NewsSection from "@/components/Blog/NewsSection";
import BlogHeroSection from "@/components/Blog/BlogHero";
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
        ? "أعمالنا | ستارتايم"
        : "Portfolio | Startime",

    description:
      locale === "ar"
        ? "استعرض مشاريع ستارتايم وأبرز الأعمال التي نفذناها لعملائنا."
        : "Explore Startime's portfolio and discover the projects we have delivered for our clients.",

    alternates: {
      canonical: `https://startime.sa/${locale}/portfolio`,
      languages: {
        en: "https://startime.sa/en/portfolio",
        ar: "https://startime.sa/ar/portfolio",
        "x-default": "https://startime.sa/en/portfolio",
      },
    },
  };
}

export default function BlogPage({ params }: PageProps) {
  const { locale } = React.use(params);

  const isAr = locale === "ar";

  //return <PortfolioClient />;
  return (
    <main dir={isAr ? "rtl" : "ltr"} className="bg-black min-h-screen">
      <BlogHeroSection locale={locale} />
      <NewsSection locale={locale} />
    </main>
  );
}