import ContactFormSection from "@/components/contact/ContactFormSection";
import FooterContactSection from "@/components/contact/FooterContactSection";
import HeroSection from "@/components/contact/HeroSection";
import IntroSection from "@/components/contact/IntroSection";
import type { Metadata } from "next";

interface Props {
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
        ? "اتصل بنا | ستارتايم"
        : "Contact Us | Startime",

    description:
      locale === "ar"
        ? "تواصل مع فريق ستارتايم لمعرفة المزيد عن خدماتنا وحلولنا."
        : "Get in touch with the Startime team to learn more about our services and solutions.",

    alternates: {
      canonical: `https://startime.sa/${locale}/contact`,

      languages: {
        en: "https://startime.sa/en/contact",
        ar: "https://startime.sa/ar/contact",

        "x-default":
          "https://startime.sa/en/contact",
      },
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;

  return (
    <main>
      <HeroSection locale={locale} />
      <IntroSection locale={locale} />
      <ContactFormSection locale={locale} />
      <FooterContactSection />
    </main>
  );
}
