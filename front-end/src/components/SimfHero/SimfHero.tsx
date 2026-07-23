"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import styles from "./MaritimeHero.module.css";
import { defaultContent } from "./content";
import { useState } from "react";
import ContactModal from "@/components/modal/ContactModal";
import Image from 'next/image'

type IconName = "shield" | "anchor" | "calendar" | "pin";

interface HeroInfo {
  icon: IconName;
  label: string;
  value: string;
}

interface HeroContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  tertiaryLink: {
    label: string;
    href: string;
  };
  info: HeroInfo[];
}

interface SimfHeroProps {
  videoSrc?: string;
  posterSrc?: string;
  content?: HeroContent;
  imgSrc?: string;
}

const ICONS: Record<IconName, React.ReactNode> = {
  shield: (
    <path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10z" />
  ),
  anchor: (
    <>
      <path d="M12 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
      <path d="M12 8v14" />
      <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
    </>
  ),
  calendar: (
    <>
      <path d="M3 5h18v16H3z" />
      <path d="M16 3v4" />
      <path d="M8 3v4" />
      <path d="M3 10h18" />
    </>
  ),
  pin: (
    <>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0z" />
      <path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
    </>
  ),
};

function Icon({ name }: { name: IconName }) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {ICONS[name]}
    </svg>
  );
}

function Arrow({ rtl }: { rtl: boolean }) {
  return <span aria-hidden>{rtl ? "←" : "→"}</span>;
}

export default function SimfHero({
  videoSrc = "/videos/maritime-hero.mp4.mp4",
  imgSrc = "/2.webp",
  posterSrc,
  content,
}: SimfHeroProps) {
  const locale = useLocale() as "en" | "ar";
  const isRTL = locale === "ar";

  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const t =
    content ??
    defaultContent[locale] ??
    defaultContent.en;

  return (
    <section
      className={styles.hero}
      dir={isRTL ? "rtl" : "ltr"}
      data-lang={locale}
    >
      {/* <video
        className={styles.video}
        src={videoSrc}
        poster={posterSrc}
        autoPlay
        muted
        loop
        playsInline
      /> */}
      <Image
        className={styles.video}
        src={isRTL ? "/1.webp" : "/2.webp"} // or imageSrc if you renamed the variable
        alt="Hero image"
        fill
        priority
        sizes="100vw"
      />

      <div className={styles.overlay} />

      <div className={styles.content}>
        <p className={styles.eyebrow}>{t.eyebrow}</p>

        <span className={styles.eyebrowRule} />

        <h1 className={`${styles.title} font-['Noto Kufi Arabic']`}>
          {t.title}
        </h1>

        <p className={styles.subtitle}>{t.subtitle}</p>

        <div className={styles.actions}>
          <Link
            href={isRTL ? "/ar/simf" : "/en/simf"}
            className={styles.btnPrimary}
          >
            {t.primaryCta.label} <Arrow rtl={isRTL} />
          </Link>

          <Link
            type="button"
            onClick={() => setIsContactModalOpen(true)}
            href="#"
            className={styles.btnSecondary}
          >
            {t.secondaryCta.label} <Arrow rtl={isRTL} />
          </Link>
        </div>

        <Link
          href={t.tertiaryLink.href}
          className={styles.tertiaryLink}
        >
          <span className={styles.tertiaryArrow}>
            <Arrow rtl={isRTL} />
          </span>

          {t.tertiaryLink.label}
        </Link>
      </div>

      {/* <div className={styles.infoBarWrap}> */}
      <div
        className={`${styles.infoBarWrap} ${
          isRTL ? "pr-[50px]!" : "pl-[50px]!"
        }`}
      >
        <div className={styles.infoBar}>
          {t.info.map((item) => (
            <div
              key={item.label}
              className={styles.infoCell}
            >
              <div className={styles.infoIcon}>
                <Icon name={item.icon} />
              </div>

              <div className={styles.infoText}>
                <div className={styles.infoLabel}>
                  {item.label}
                </div>

                <div className={styles.infoValue}>
                  {item.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Modal Here */}
          <ContactModal
            isOpen={isContactModalOpen}
            onClose={() => setIsContactModalOpen(false)}
          />
    </section>
  );
}