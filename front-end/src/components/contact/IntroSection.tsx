import React from "react";
import Image from "next/image";
import { fetchAPI } from "@/lib/api";

interface Props {
  locale: string;
}

export default async function IntroSection({ locale }: Props) {
  const response = await fetchAPI<any>("contact-us-second-banners", locale);
  const data = response?.data?.[0];

  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_BASE_URL;

  // Image handling: null if not present in Strapi
  const bannerImage = data?.banner?.url
    ? `${STRAPI_URL}${data.banner.url}`
    : null;

  const description = data?.description || "";

  return (
    <section className="w-full bg-black py-20 px-8 md:px-16 flex justify-center">
      <div className="container max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center justify-items-center">
          {/* Text Side */}
          <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-start">
            <p className="text-white text-xl md:text-2xl leading-[1.8] font-medium opacity-90 whitespace-pre-line max-w-xl">
              {description}
            </p>
          </div>

          {/* Image Side */}
          <div className="order-1 lg:order-2 flex justify-center w-full">
            <div className="relative w-full min-w-[320px] max-w-lg md:max-w-xl lg:max-w-2xl aspect-[4/3] md:aspect-square">
              {bannerImage ? (
                <Image
                  src={bannerImage}
                  alt="Contact Banner"
                  fill
                  className="object-cover rounded-2xl"
                  sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 40vw"
                />
              ) : (
                /* Empty placeholder or solid color when image is null */
                <div className="w-full h-full bg-[#1a1a1a] rounded-2xl flex items-center justify-center">
                  <div className="w-20 h-1 bg-[#5b4180] opacity-50" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
