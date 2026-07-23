"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { fetchAPI } from "@/lib/api";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_BASE_URL;

interface PartnerLogo {
  src: string;
  name: string;
}

export default function TechStackSection() {
  const [logos, setLogos] = useState<PartnerLogo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getLogos() {
      try {
        setLoading(true);
        const res = await fetchAPI<any>("partner-logos", "en");

        if (res?.data) {
          const mappedLogos = res.data.map((item: any) => ({
            src: item.logo?.url ? `${STRAPI_URL}${item.logo.url}` : null,
            name: item.logo?.name || "Partner Logo",
          }));
          setLogos(mappedLogos);
        }
      } catch (error) {
        console.error("Error fetching partner logos:", error);
      } finally {
        setLoading(false);
      }
    }
    getLogos();
  }, []);

  return (
    <section className="pb-32 pt-16 bg-white">
      <div className="container mx-auto px-8 md:px-16">
        <div className="flex flex-wrap justify-center items-center gap-x-20 gap-y-16 transition-all duration-500">
          {loading
            ? Array(5)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="h-28 w-56 bg-gray-100 animate-pulse rounded-lg"
                  />
                ))
            : logos.map((logo, i) => (
                <div key={i} className="relative h-28 w-56">
                  {logo.src ? (
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 224px"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-50 flex items-center justify-center text-xs text-gray-400 border border-dashed border-gray-200 rounded-lg">
                      No Logo Found
                    </div>
                  )}
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
