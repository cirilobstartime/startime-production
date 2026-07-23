import React from "react";
import Hero from "@/components/SIMF/Hero";
import VideoBanner from "@/components/SIMF/VideoBanner";
import AboutTheForum from "@/components/SIMF/AboutTheForum";
import EvolutionTimelinePart1 from "@/components/SIMF/EvolutionTimelinePart1";
import EvolutionTimelinePart2 from "@/components/SIMF/EvolutionTimelinePart2";
import Services from "@/components/SIMF/Services";
import MetricsDashboard from "@/components/SIMF/MetricsDashboard";
import AmbitiousGoals from "@/components/SIMF/AmbitiousGoals";
// import MissionSection from "@/components/SIMF/mission-section";
// import JourneyBanner from "@/components/SIMF/client-logos";
// import TimelineSection from "@/components/SIMF/Timeline";
// import AboveTheTimelineSection from "@/components/SIMF/AboveTheTimeline";
// import GovernanceSection from "@/components/SIMF/values-section";
// import SubscribeFormSection from "@/components/SIMF/SubscribeForm";
import type { Metadata } from "next";
import BecomeAPartner from "@/components/SIMF/BecomeAPartner";
import LeadingPurposeExpertise from "@/components/SIMF/LeadingPurposeExpertise";
import ValueProposition1 from "@/components/SIMF/ValueProposition1";
import LatestNews from "@/components/SIMF/LatestNews";
import ValueProposition2 from "@/components/SIMF/ValueProposition2";
import RegisterYourParticipation from "@/components/SIMF/RegisterYourParticipation";
import KeyParticipants from "@/components/SIMF/KeyParticipants";
import ValueProposition3 from "@/components/SIMF/ValueProposition3";
import MetricsDashboard2 from "@/components/SIMF/MetricsDashboard2";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const isArabic = locale === "ar";

  return {
    title: isArabic
      ? "الملتقى البحري الدولي السعودي | ستارتيم"
      : "Saudi International Maritime Forum | Startime",

    description: isArabic
      ? "مستقبل أمن قاع البحار وسلاسل الإمداد في بيئة عالمية متغيرة"
      : "Shaping the Future of Seabed Security and Supply Chain Resilience in an Evolving Global Landscape",

    alternates: {
      canonical: `https://startime.sa/${locale}/simf`,
      languages: {
        en: "https://startime.sa/en/simf",
        ar: "https://startime.sa/ar/simf",
        "x-default": "https://startime.sa/en/simf",
      },
    },
    // openGraph: {
    //   title: current.title,
    //   description: current.description,
    //   url: `https://startime.sa/${locale}/simf`,
    //   siteName: "Startime",
    //   locale: locale === "ar" ? "ar_SA" : "en_US",
    //   type: "website",
    //   images: [
    //     {
    //       url: "/images/simf-og.jpg",
    //       width: 1200,
    //       height: 630,
    //       alt: current.title,
    //     },
    //   ],
    // },

    // twitter: {
    //   card: "summary_large_image",
    //   title: current.title,
    //   description: current.description,
    //   images: ["/images/simf-og.jpg"],
    // },
  };
}

export default function SimfPage({ params }: PageProps) {
  const { locale } = React.use(params);

  const isAr = locale === "ar";

  return (
    <main
      className={`bg-black min-h-screen relative selection:bg-primary selection:text-white
      }`}
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Hero banner (Figma) */}
      <Hero locale={locale} />

      {/* Video + registration countdown (Figma) */}
      {/* <VideoBanner locale={locale} /> */}

      {/* About the Forum (Figma) test */}
      <AboutTheForum locale={locale} />

      {/* Evolution Timeline (Figma) */}
      {/* <EvolutionTimelinePart1 locale={locale} /> */}

      {/* Target Audience (Figma) */}
      {/* <EvolutionTimelinePart2 locale={locale} /> */}

      {/* Services / The Agenda (Figma) */}
      {/* <Services locale={locale} /> */}

      {/* Metrics Dashboard (Figma) */}
      {/* <MetricsDashboard locale={locale} /> */}

      

      {/* Value Proposition 1 - Figma */}
      {/* <ValueProposition1 locale={locale} /> */}

      {/* Value Proposition 1 - Figma */}
      {/* <ValueProposition2 locale={locale} /> */}

      {/* Become A Partner - Copied from Services */}
      {/* <BecomeAPartner locale={locale} /> */}

      
      {/* Metrics Dashboard 2 - Figma */}
      <MetricsDashboard2 />


      {/* Value Proposition 3 - Figma */}
      <ValueProposition3 locale={locale} />

      {/* Ambitious Goals (Figma) */}
      <KeyParticipants locale={locale} />

      {/* Leading with Purpose & Expertise - Copied from Metrics Dashboard */}
      <LeadingPurposeExpertise locale={locale} />

      {/* Ambitious Goals (Figma) */}
      <AmbitiousGoals locale={locale} />

      {/* Latest News - Figma */}
      <LatestNews locale={locale} />

      {/* Latest News - Figma */}
      <RegisterYourParticipation locale={locale} />

      {/* <JourneyBanner locale={locale}/>
      <AboveTheTimelineSection locale={locale}/>
      <TimelineSection locale={locale}/>
      
      <GovernanceSection locale={locale}/> */}

      {/* will use this later if there is a section which needs background image */}
      {/* <MissionSection locale={locale}/> */}

      {/* Subscribe Form Section */}
      {/* <SubscribeFormSection locale={locale} /> */}
    </main>
  );
}
