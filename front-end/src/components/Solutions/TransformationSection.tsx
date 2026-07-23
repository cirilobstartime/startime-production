"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { fetchAPI } from "@/lib/api";

interface TransformationSectionProps {
  locale: string;
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_BASE_URL;

export default function TransformationSection({
  locale,
}: TransformationSectionProps) {
  const t = useTranslations("TransformationSection");
  const isAr = locale === "ar";

  const [data, setData] = useState<{
    title: string;
    description: string;
    imageUrl: string | null;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getBannerData() {
      try {
        setLoading(true);
        const res = await fetchAPI<any>("solution-third-banners", locale);

        if (res?.data?.[0]) {
          const item = res.data[0];
          setData({
            title: item.header?.title || "",
            description: item.header?.description || "",
            imageUrl: item.image?.url ? `${STRAPI_URL}${item.image.url}` : null,
          });
        }
      } catch (error) {
        console.error("Error fetching solution third banner:", error);
      } finally {
        setLoading(false);
      }
    }
    getBannerData();
  }, [locale]);

  return (
    <section
      className="w-full bg-white overflow-hidden"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-8 md:px-16 py-20 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Image Section */}
        <div
          className={`relative w-full aspect-video lg:aspect-square max-h-[500px] overflow-hidden ${
            isAr ? "lg:order-first" : "lg:order-last"
          }`}
        >
          {loading ? (
            <div className="w-full h-full bg-gray-200 animate-pulse" />
          ) : (
            <Image
              src={data?.imageUrl || "/image.webp"}
              alt="Connect Everyone"
              fill
              className="object-cover"
            />
          )}
        </div>

        {/* Text Section */}
        <div className={`space-y-6 ${isAr ? "text-right" : "text-left"}`}>
          {loading ? (
            <div className="space-y-4">
              <div className="h-12 bg-gray-200 animate-pulse w-3/4" />
              <div className="h-24 bg-gray-200 animate-pulse w-full" />
            </div>
          ) : (
            <>
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold"
                style={{ color: "#5b4180" }}
              >
                {data?.title || t("title")}
              </h2>
              <p className="text-[#5b4180] text-2xl md:text-3xl lg:text-4xl leading-snug max-w-2xl">
                {data?.description || t("description")}
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
