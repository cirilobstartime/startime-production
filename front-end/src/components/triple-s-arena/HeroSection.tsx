import React from "react";
import Image from "next/image";
import { fetchAPI } from "@/lib/api";
import ArenaHeroContent from "./ArenaHeroContent";

interface Props {
  locale: string;
}

export default async function ArenaHero({ locale }: Props) {
  const response = await fetchAPI<any>("sss-arinas", locale);
  const data = response?.data?.[0];

  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_BASE_URL;

  const bgImage = data?.background?.url
    ? `${STRAPI_URL}${data.background.url}`
    : null;

  const title = data?.header?.title || "";
  const subtitle = data?.header?.description || "";

  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        {bgImage ? (
          <Image
            src={bgImage}
            alt="Triple S Arena - The Digital Operations Arena"
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #1a1a1a, #000000)" }} />
        )}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content with Motion */}
      <ArenaHeroContent title={title} subtitle={subtitle} />
    </section>
  );
}
