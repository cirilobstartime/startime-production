import React from "react";
import Image from "next/image";
import { fetchAPI } from "@/lib/api";

interface Props {
  locale: string;
}

export default async function HeroSection({ locale }: Props) {
  const response = await fetchAPI<any>("contact-us-headers", locale);
  const data = response?.data?.[0];

  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_BASE_URL;

  const bgImage = data?.background?.url
    ? `${STRAPI_URL}${data.background.url}`
    : null;

  const title = data?.title || "";

  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Background Image Logic */}
      {bgImage ? (
        <>
          <Image
            src={bgImage}
            alt={title}
            fill
            priority
            className="object-cover"
            quality={90}
          />
          <div className="absolute inset-0 bg-black/40 z-[1]" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] to-black z-[0]" />
      )}

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-7xl font-bold text-white drop-shadow-lg">
          {title}
        </h1>
      </div>
    </section>
  );
}
