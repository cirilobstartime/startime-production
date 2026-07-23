"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useAnimation } from "framer-motion";
import RollingNumber from "@/components/ui/RollingNumber";

function AnimatedNumber({
  value,
}: {
  value: string;
}) {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      y: [18, 0],
      opacity: [0, 1],
      scale: [0.94, 1],
      transition: {
        duration: 0.35,
        ease: "easeOut",
      },
    });
  }, [value, controls]);

  return (
    <motion.span
      animate={controls}
      className="text-3xl font-extrabold leading-none tabular-nums text-[#001640] sm:text-4xl"
    >
      {value}
    </motion.span>
  );
}


/**
 * SIMF "About the Forum" section (Figma node 9485:4345).
 *
 * Two-column layout: bilingual SIMF logo + eyebrow pill + heading on one side,
 * a rounded photo on the other.
 *
 * Tokens: primary navy #244a77, pill bg #f2e9fa, pill text #4b5563, white bg.
 * Roboto — H5 Bold 24px heading.
 */

interface AboutTheForumProps {
  locale?: string;
  eyebrow?: string;
  heading?: string;
  heading1?: string;
  heading2?: string;
  /** SIMF bilingual logo (add e.g. /simf-logo.svg to /public). */
  logoSrc?: string;
  /** Feature photo (add e.g. /simf-about.jpg to /public). */
  imageSrc?: string;
  imageAlt?: string;
  paragraph2Text?: string;
  targetDate?: string;
}

interface TimeLeft {
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const EMPTY: TimeLeft = { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };

function getTimeLeft(target: number): TimeLeft {
  let diff = Math.max(0, target - Date.now());
  const sec = Math.floor(diff / 1000);
  const months = Math.floor(sec / (30 * 24 * 3600));
  const days = Math.floor((sec % (30 * 24 * 3600)) / (24 * 3600));
  const hours = Math.floor((sec % (24 * 3600)) / 3600);
  const minutes = Math.floor((sec % 3600) / 60);
  const seconds = sec % 60;
  return { months, days, hours, minutes, seconds };
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function AboutTheForum({
  locale = "en",
  eyebrow,
  heading,
  heading1,
  heading2,
  logoSrc = "/simf-logo.webp",
  // imageSrc = "/simf-about-2.png",
  imageSrc = "/abouttheforum-img.png",
  imageAlt,
  paragraph2Text,
  targetDate = "2026-11-16T09:00:00",
}: AboutTheForumProps) {
  const isAr = locale === "ar";
  const t = useTranslations("SIMF.abouttheforum");

  const eyebrowText = eyebrow ?? t("eyebrow");
  const headingText = heading ?? t("heading");
  const headingText1 = heading ?? t("heading1");
  const headingText2 = heading ?? t("heading2");
  const imageAltText = imageAlt ?? t("imageAlt");
  const resolvedParagraph2Text = paragraph2Text ?? t("paragraph2text");

  const target = new Date(targetDate).getTime();
  const [time, setTime] = useState<TimeLeft>(EMPTY);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
      setMounted(true);
      setTime(getTimeLeft(target));
      const id = setInterval(() => setTime(getTimeLeft(target)), 1000);
      return () => clearInterval(id);
    }, [target]);

  const units: { value: number; key: string }[] = [
    { value: time.months, key: "months" },
    { value: time.days, key: "days" },
    { value: time.hours, key: "hours" },
    { value: time.minutes, key: "minutes" },
    { value: time.seconds, key: "seconds" },
  ];

  return (
    <section dir={isAr ? "rtl" : "ltr"} className="w-full bg-white">
      <div className="videodiv mx-auto max-w-[1440px] px-5 sm:px-8 md:px-20 md:mt[-4rem] mt-[-4rem]">
        {/* Countdown */}
        <motion.div
          className="mt-12 flex flex-col items-center md:mt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#b5b6b6]">
            {/* {t("registrationClosesIn")} */}
          </p>

          <div className="mt-[12rem] flex items-start justify-center gap-4 sm:gap-6 md:gap-8">
            {units.map(({ value, key }, index) => (
              <motion.div
                key={key}
                className="flex w-14 flex-col items-center sm:w-[86px]"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.12,
                  duration: 0.45,
                  ease: "easeOut",
                }}
              >
                <div className="flex h-[40px] items-center justify-center sm:h-[48px]">
                  {/* <AnimatedNumber
                    value={mounted ? pad(value) : "00"}
                  /> */}
                  <RollingNumber
                    value={mounted ? value : 0}
                  />
                </div>
                <span className="mt-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#007cd8] sm:text-[11px]">
                  {t(`units.${key}`)}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-10 px-5 py-16 sm:px-8 md:grid-cols-2 md:gap-16 md:px-20 md:py-24">
        {/* Text column */}
        {/* <div className="flex flex-col items-start" style={{ alignSelf: "start"  }}> */}
        <div className="flex flex-col items-start rtl:mt-[-25px]">
          <Image
            src={logoSrc}
            alt={t("logoAlt")}
            width={280}
            height={64}
            className="hidden h-auto w-56 md:w-72"
            priority
          />

          <span className="hidden mt-8 inline-flex items-center rounded-full bg-[#f2e9fa] px-4 py-2 text-sm font-medium text-[#4b5563]">
            {eyebrowText}
          </span>

          {/* <h2 className="mt-6 max-w-xl text-xl font-bold leading-8 text-[#244a77] sm:text-2xl">
            {headingText}
          </h2> */}
          <motion.h3
            className="
              w-full
              
              font-['Noto Kufi Arabic']
              text-[24px]
              text-[#001640]
              
            "
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          > 
          { headingText }
          </motion.h3>
          <motion.h3
            className="
              w-full
              
              font-['Noto Kufi Arabic']
              text-[24px]
              text-[#001640]
            "
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          > 
          { headingText1 }
          </motion.h3>
          <motion.h2
            className="
              w-full
              
              font-['Noto Kufi Arabic']
              text-[34px]
              font-bold
              font-extrabold
              leading-[44px]
              text-[#001640]
              md:text-[32px]
              md:leading-[56px]
            "
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          > 
          { headingText2 }
          </motion.h2>
          {/* <p className="text-base leading-7 text-[#4b5563] md:text-lg md:leading-8 mt-6">
            {resolvedParagraph2Text}
          </p> */}
          <motion.p
            className="
              w-full
              font-['Noto Kufi Arabic']
              text-justify
              text-[18px]
              font-normal
              leading-[32px]
              text-[#4B5563]
              md:leading-[40px]
            "
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            {isAr ? " الملتقى البحري السعودي الدولي حدث دولي رفيع المستوى، يجمع القادة والمسؤولين والخبراء لتبادل التجارب والخبرات، وتعزيز فهم عالمي مشترك لمستقبل الأمن البحري في ظل التحولات الجيوسياسية والتقنية المتسارعة؛ بما يعكس الدور الاستراتيجي للمملكة العربية السعودية في ترسيخ استقرار البحار ودعم استدامة الاقتصاد العالمي." : resolvedParagraph2Text}
           
          </motion.p>
          <p>
             
          </p>
        </div>

        {/* Image column */}
        {/* <div className="relative aspect-[478/460] w-full overflow-hidden rounded-2xl bg-[#f2e9fa]"> */}
        {/* <div className="relative aspect-[478/460] w-full overflow-hidden rounded-2xl"
        > */}
        <motion.div className="relative aspect-[478/460] w-full overflow-hidden rounded-2xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        >
          <Image
            src={imageSrc}
            alt={imageAltText}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain"
          />
        </motion.div>
      </div>
    </section>
  );
}
