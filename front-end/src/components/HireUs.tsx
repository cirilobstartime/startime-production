"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations, useLocale } from "next-intl";
import { Feature } from "@/types/feature";
import { getFeatures } from "@/lib/get-features";
import { FAQ } from "@/types/faq";
import { getFaqs } from "@/lib/get-faqs";

const HireUs = () => {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const t = useTranslations("HireUs");
  const locale = useLocale();
  const isAr = locale === "ar";
  const STRAPI_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

  useEffect(() => {
    const loadData = async () => {
      const featureData = await getFeatures(locale);
      setFeatures(featureData);
    };
    loadData();
  }, [locale]);

  useEffect(() => {
    const loadData = async () => {
      const faqData = await getFaqs(locale);
      setFaqs(faqData);
    };
    loadData();
  }, [locale]);

  return (
    <div className="bg-background" style={{ direction: isAr ? "rtl" : "ltr" }}>
      {/* Value Proposition & Features Section */}
      <section className="text-primary py-24 px-10 md:px-24">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-[5vw] md:text-[4.5vw] font-bold leading-[1.1] tracking-tighter mb-12 italic">
            {t.rich("heroTitle", {
              br: () => <br className="hidden md:block" />,
            })}
          </h2>

          <div className="flex flex-col md:flex-row justify-between items-start gap-12 border-t border-secondary/20 pt-14 mb-28">
            <Button className="bg-primary text-white border border-primary rounded-xl px-8 py-7 text-lg hover:bg-white hover:text-primary transition-all duration-500 shadow-none active:scale-95 uppercase font-bold">
              {t("hireBtn")}
            </Button>

            <div className="max-w-2xl">
              <p className="text-primary/70 text-base md:text-lg leading-relaxed font-normal">
                {t("description")}
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="flex flex-col sm:flex-row items-start gap-6 group"
              >
                <div className="relative w-36 h-36 md:w-40 md:h-40 shrink-0 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3">
                  <Image
                    src={`${STRAPI_BASE_URL}${feature.featureIcon?.url || ""}`}
                    alt={feature.featureTitle}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="space-y-2 pt-7">
                  <h3 className="text-2xl font-bold leading-tight tracking-tight max-w-[280px] text-primary">
                    {feature.featureTitle}
                  </h3>
                  <p className="text-primary/60 text-sm leading-relaxed max-w-sm font-normal">
                    {feature.featureDesc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="text-primary py-24 px-10 md:px-24 border-t border-secondary/10">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-[5vw] md:text-[4.5vw] font-bold leading-[1.1] tracking-tighter mb-20 italic">
            {t.rich("faqTitle", {
              br: () => <br className="hidden md:block" />,
            })}
          </h2>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={`faq-${faq.id}`}
                className="border-b border-secondary/20 transition-all duration-500 data-[state=open]:bg-secondary/5 px-6 rounded-lg overflow-hidden mb-2"
              >
                <AccordionTrigger
                  className={`hover:no-underline py-8 text-xs md:text-sm font-bold tracking-widest group text-primary hover:text-secondary ${isAr ? "text-right" : "text-left"}`}
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent
                  className={`pb-8 text-primary/70 text-lg leading-relaxed font-normal max-w-4xl ${isAr ? "text-right" : "text-left"}`}
                >
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
};

export default HireUs;
