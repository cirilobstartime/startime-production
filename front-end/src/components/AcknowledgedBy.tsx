"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

interface AcknowledgedByProps {
  badges?: { src: string; alt?: string; wide?: boolean }[];
}

// تأكد من تحديث المسارات إذا لزم الأمر
const DEFAULT_BADGES = [
  { src: "/image8.png", alt: "Award" },
  { src: "/image8.png", alt: "Award" },
  { src: "/image8.png", alt: "Award" },
  { src: "/image8.png", alt: "Award" },
];

export default function AcknowledgedBy({
  badges = DEFAULT_BADGES,
}: AcknowledgedByProps) {
  const t = useTranslations("Acknowledged");

  return (
    <div className="w-full bg-black py-20">
      <div className="container mx-auto px-6 md:px-16">
        <h4
          className="text-2xl font-semibold text-white mb-16"
          style={{ color: "#5A417F" }}
        >
          {t("title")}
        </h4>

        <div className="flex flex-wrap items-center gap-10 md:gap-16">
          <div className="flex flex-wrap items-center gap-8 md:gap-12">
            {badges.map((badge, i) => (
              <div key={i} className="relative w-32 h-32 md:w-40 md:h-40">
                <Image
                  src={badge.src}
                  alt={badge.alt ?? "Award"}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>

          <div className="hidden md:block w-px h-24 bg-white/20" />

          <div className="relative w-64 h-32 md:w-80 md:h-40">
            <Image
              src="/image9.png"
              alt="Finalist"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
