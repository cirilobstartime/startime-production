"use client";
import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface Card {
  id: number;
  label: string;
}

interface Props {
  cards: Card[];
  loginLink: string;
  locale: string;
}

const LoginBannersContent = ({ cards, loginLink, locale }: Props) => {
  const t = useTranslations("TripleSArena.login");
  const isAr = locale === "ar";

  return (
    <section className="hidden w-full py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Title as a Clickable Link - Simple Underline Style */}
        <div className="hidden container mx-auto px-6 text-center">
          <motion.a
            href={loginLink}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`
    group
    inline-block 
    text-2xl md:text-3xl 
    font-bold 
    text-[#5b4180] 
    hover:text-[#4a3469] 
    transition-all 
    border-b-2 
    border-[#5b4180]
    pb-1
  `}
          >
            <span className="flex items-center gap-4">
              {t("title")}
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:translate-x-2"
              >
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </span>
          </motion.a>
        </div>

        {/* Cards Grid - Dynamic & Non-clickable */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {cards.map((card, index) => (
            <motion.div
              key={card.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="h-48 flex items-center justify-center p-8 bg-gray-300 text-center border border-transparent shadow-sm"
            >
              <span className="text-xl md:text-2xl font-bold text-[#5b4180]">
                {card.label}
              </span>
            </motion.div>
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default LoginBannersContent;
