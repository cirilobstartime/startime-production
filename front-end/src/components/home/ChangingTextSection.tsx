"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";

export default function ChangingTextSection() {
  const t = useTranslations("ChangingText");
  const tServices = useTranslations("Services");
  const locale = useLocale();
  const isAr = locale === "ar";

  const categories = tServices.raw("categories") as Record<string, string>;
  const items = tServices.raw("items") as Record<string, string[]>;

  return (
    <>
      <section className="w-full bg-black flex flex-col">
        <div
          className={`w-full bg-black px-6 md:px-12 pt-10 pb-16 ${
            isAr ? "text-right" : "text-left pl-8 md:pl-20"
          }`}
        >
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-gapsy text-white leading-tight">
            <span className="text-[#5A417F]">{t("fullText")}</span>
          </h2>
        </div>

        <div className="relative w-full aspect-[16/7]">
          <Image
            src="/image3.jpg"
            alt="Cityscape"
            fill
            priority
            className="object-cover object-center"
          />
        </div>
      </section>

      <section className="w-full bg-black py-24 text-white">
        <div className="container mx-auto px-8 md:px-16">
          <p className="text-sm uppercase tracking-widest text-gray-400 mb-4">
            {tServices("title")}
          </p>
          <h2 className="text-4xl md:text-5xl font-gapsy leading-snug mb-16">
            {tServices("subtitle")}
            <span className="text-[#5A417F]">{tServices("highlight")}</span>
            {tServices("end")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {Object.keys(categories).map((key) => (
              <div key={key} className="flex flex-col">
                <div className="flex justify-between items-center border-b border-white/20 pb-4 mb-8">
                  <h3 className="text-lg font-bold">
                    {categories[key as keyof typeof categories]}
                  </h3>
                  <span className="text-xl">→</span>
                </div>
                <ul className="space-y-4 text-gray-300 text-sm">
                  {items[key as keyof typeof items].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-[#5A417F] rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black py-8">
        <div className="container mx-auto px-8 md:px-16">
          <div className="flex items-center w-full">
            <div className="w-16 h-[2px] bg-white" />
            <div className="flex-grow h-[1px] bg-white/20" />
          </div>
        </div>
      </section>
    </>
  );
}
