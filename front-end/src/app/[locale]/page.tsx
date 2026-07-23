import BenefitsSection from "@/components/home/BenefitsSection";
import HeroSection from "@/components/home/Hero";
import WhyChooseSection from "@/components/home/WhyChooseSection";
import TechStackSection from "@/components/home/TechStackSection";
import WorkSection from "@/components/home/WorkSection";
import TeamSection from "@/components/home/TeamSection";
import NewsSection from "@/components/home/NewsSection";
import type { Metadata } from "next";
import MaritimeHero from "@/components/SimfHero/SimfHero";
import UfiSection from "@/components/UfiSection";


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
        ? "ستارتايم | وكالة التأثير الشامل"
        : "Startime | Ultimate Impact Agency",

    description:
      locale === "ar"
        ? "ستارتايم وكالة رائدة تقدم حلولاً مبتكرة وتجارب استثنائية."
        : "Startime is an ultimate impact agency delivering innovative solutions and exceptional experiences.",

    alternates: {
      canonical: `https://startime.sa/${locale}`,

      languages: {
        en: "https://startime.sa/en",
        ar: "https://startime.sa/ar",

        "x-default":
          "https://startime.sa/en",
      },
    },
  };
}

const Page = async ({ params }: PageProps) => {
  const { locale } = await params;

  return (
    <main>
      {/* temporary hero section */}
      <MaritimeHero/>

      {/* this is the original Hero Section */}
      {/* <HeroSection locale={locale} /> */}

      {/* this is the section for UFI logo  */}
      <UfiSection locale={locale} />

      {/* the rest of the sections are original */}
      <BenefitsSection locale={locale} />
      <WhyChooseSection locale={locale} />
      <WorkSection locale={locale} />
      <TeamSection locale={locale} />
      <NewsSection locale={locale}/>
      {/* <TechStackSection /> */}
    </main>
  );
};

export default Page;
