"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { fetchAPI } from "@/lib/api";

//  Types
export interface NewsImage {
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
}

export interface NewsDetailBlock {
  type: string;
  children: { text: string; type: string }[];
}

export interface NewsItem {
  id: number;
  documentId: string;
  title: string;
  sub_title: string;
  Details: NewsDetailBlock[];
  main_image: NewsImage | null;
  locale: string;
  localizations: Omit<NewsItem, "localizations">[];
}

export interface NewsResponse {
  data: NewsItem[];
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_BASE_URL;

function parseDetails(details: NewsDetailBlock[]): string {
  if (!details) return "";
  return details
    .map((block) => block.children.map((child) => child.text).join(""))
    .filter((text) => text.trim() !== "")
    .join("\n\n");
}

interface NewsSectionProps {
  locale: string;
}

export default function NewsSection({ locale }: NewsSectionProps) {
  const isAr = locale === "ar";
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  useEffect(() => {
    async function loadNews() {
      try {
        setLoading(true);
        const res = await fetchAPI<NewsResponse>("news", locale);
        if (res && res.data) {
          setNewsItems(res.data);
        }
      } catch (err) {
        console.error("News fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadNews();
  }, [locale]);

  function getNewsContent(item: NewsItem) {
    return {
      title: item.title,
      sub_title: item.sub_title,
      content: parseDetails(item.Details),
    };
  }

  /*function getImageUrl(item: NewsItem): string {
    //const imageUrl = item.main_image?.url;
    const imageUrl = item?.main_image?.url
  ? `${STRAPI_URL}${item.main_image.url}`
  : "/image6.png";

    return `${STRAPI_URL}${imageUrl}`;
  }*/
  function getImageUrl(item: NewsItem): string {
    const url = item?.main_image?.url;

    if (!url) return "/image6.png";

    // already absolute URL from Strapi
    if (url.startsWith("http")) return url;

    // relative URL from Strapi
    return `${STRAPI_URL}${url}`;
  }

  if (loading) {
    return (
      <section className="pt-20 pb-10 bg-white">
        <div className="container mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-gray-100 animate-pulse h-80 rounded shadow-sm"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-20 pb-10 bg-white">
      <div className="container mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsItems.map((item) => {
            const { title, sub_title, content } = getNewsContent(item);
            const imageUrl = getImageUrl(item);

            return (
              <motion.div
                key={item.id}
                whileHover={{ y: -5 }}
                className="bg-gray-50 overflow-hidden transition-all border border-gray-100 shadow-sm flex flex-col h-full"
              >
                <div className="relative h-48 w-full bg-gray-200">
                  <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-[#5A417F] text-xs font-semibold mb-2 uppercase tracking-wide">
                    {sub_title}
                  </p>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 line-clamp-2">
                    {title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {content}
                  </p>
                  <div className="mt-auto">
                    <button
                      onClick={() => setSelectedNews(item)}
                      className="text-[#5A417F] font-bold text-sm hover:text-purple-700 transition-colors inline-block border-b border-transparent hover:border-[#5A417F]"
                    >
                      {isAr ? "اقرأ المزيد" : "Read More"}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedNews &&
          (() => {
            const { title, content } = getNewsContent(selectedNews);
            const imageUrl = getImageUrl(selectedNews);

            return (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedNews(null)}
                  className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                />
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="relative bg-white text-black w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl rounded-sm"
                >
                  <div className="relative h-64 w-full">
                    <Image
                      src={imageUrl}
                      alt={title}
                      fill
                      className="object-cover"
                      />
                    <button
                      onClick={() => setSelectedNews(null)}
                      className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black text-white rounded-full transition-colors z-10"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div className="p-8">
                    <h2 className="text-2xl font-extrabold text-[#5A417F] mb-6">
                      {title}
                    </h2>
                    <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                      {content}
                    </p>
                  </div>
                </motion.div>
              </div>
            );
          })()}
      </AnimatePresence>
    </section>
  );
}
