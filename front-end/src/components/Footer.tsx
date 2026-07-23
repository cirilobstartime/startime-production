"use client";

import React from "react";
import Link from "next/link";
import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  X,
  Youtube,
} from "lucide-react";
import { SiFacebook, SiX, SiYoutube, SiThreads, SiTiktok, SiInstagram } from '@icons-pack/react-simple-icons';
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
const Footer: React.FC = () => {
  const t = useTranslations("Footer");
  const locale = useLocale();

  const navLinks = {
    company: [
      { key: "home", href: `/${locale}` },
      { key: "Discover", href: `/${locale}/discover` },
      { key: "Solutions", href: `/${locale}/solutions` },
      { key: "Portfolio", href: `/${locale}/portfolio` },
      { key: "Contact", href: `/${locale}/contact` },
    ],
    services: [
      { key: "getStarted", href: `/${locale}/get-started` },
      { key: "startups", href: `/${locale}/startups-investors` },
      { key: "caseStudy", href: `/${locale}/case-study` },
    ],
  };

  return (
    <footer className="bg-gradient-to-b from-[#0a0a1a] to-[#0a0a1f] text-white py-12 px-6">
      <div className="container mx-auto">
        {/* Top section: Logo + Description */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start mb-8">
          {/* Brand & Social */}
          <div className="hide-on-desktop md:col-span-3 flex flex-col items-start space-y-4">
            <div className="h-10 flex items-center">
              <Image
                src="/startime horizntal white logo .svg"
                alt={t("logoAlt")}
                width={160}
                height={32}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex gap-3">
              <Link
                href="https://sa.linkedin.com/company/startimeevents"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
              >
                <Linkedin className="w-4 h-4" />
              </Link>
              <Link
                href="https://x.com/startimeevents"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
              >
                <SiX className="w-4 h-4" />
              </Link>
              <Link
                href="https://www.instagram.com/startimeevents/"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
              >
                <SiInstagram className="w-4 h-4" />
              </Link>
              <Link
                href="https://www.youtube.com/@Startime_Events"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
              >
                <Youtube className="w-4 h-4" />
              </Link>
              <Link
                href="https://www.tiktok.com/@startime_events"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 fill-current text-white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.47-.13 3.23-.11 6.46-.12 9.7-.01 1.9-.62 3.82-1.97 5.17-1.45 1.5-3.61 2.22-5.69 2.05-2.2-.1-4.32-1.33-5.46-3.23-1.3-2.07-1.21-4.93.28-6.88 1.12-1.52 2.92-2.52 4.82-2.67v4.03c-1.12.07-2.29.61-2.92 1.55-.7 1.01-.64 2.44.18 3.33.72.85 1.88 1.22 2.98 1.06 1.1-.11 2.1-.88 2.45-1.94.18-.54.18-1.11.18-1.68-.01-4.52-.01-9.04-.01-13.56.24-.03.48-.05.73-.08z" />
                </svg>
              </Link>
              <Link
                href="https://www.facebook.com/STARTIMEvents"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
              >
                <SiFacebook className="w-4 h-4" />
              </Link>
              <Link
                href="https://www.threads.com/@startimevents"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
              >
                <SiThreads className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Description */}
          <div className="hide-on-desktop md:col-span-3 text-sm text-zinc-400 leading-relaxed">
            <p>
              {t("description") ||
                "Empowering the next generation of startups with strategic investment and innovative solutions to drive global impact."}
            </p>
          </div>
        </div>

        {/* Bottom section: Nav Links + Contact Info side by side on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-6 md:gap-8 items-start border-t border-white/10 pt-8">
          {/* Brand & Social */}
          <div className="hide-on-mobile md:col-span-3 flex flex-col items-start space-y-4">
            <div className="h-10 flex items-center">
              <Image
                src="/startime horizntal white logo .svg"
                alt={t("logoAlt")}
                width={160}
                height={32}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex gap-3">
              <Link
                href="https://sa.linkedin.com/company/startimeevents"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-4 h-4" />
              </Link>
              <Link
                href="https://x.com/startimeevents"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiX className="w-4 h-4" />
              </Link>
              <Link
                href="https://www.instagram.com/startimeevents/"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiInstagram className="w-4 h-4" />
              </Link>
              <Link
                href="https://www.youtube.com/@Startime_Events"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube className="w-4 h-4" />
              </Link>
              <Link
                href="https://www.tiktok.com/@startime_events"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 fill-current text-white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.47-.13 3.23-.11 6.46-.12 9.7-.01 1.9-.62 3.82-1.97 5.17-1.45 1.5-3.61 2.22-5.69 2.05-2.2-.1-4.32-1.33-5.46-3.23-1.3-2.07-1.21-4.93.28-6.88 1.12-1.52 2.92-2.52 4.82-2.67v4.03c-1.12.07-2.29.61-2.92 1.55-.7 1.01-.64 2.44.18 3.33.72.85 1.88 1.22 2.98 1.06 1.1-.11 2.1-.88 2.45-1.94.18-.54.18-1.11.18-1.68-.01-4.52-.01-9.04-.01-13.56.24-.03.48-.05.73-.08z" />
                </svg>
              </Link>
              <Link
                href="https://www.facebook.com/STARTIMEvents"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiFacebook className="w-4 h-4" />
              </Link>
              <Link
                href="https://www.threads.com/@startimevents"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiThreads className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Description */}
          <div className="hide-on-mobile md:col-span-3 text-sm text-zinc-400 leading-relaxed">
            <p>
              {t("description") ||
                "Empowering the next generation of startups with strategic investment and innovative solutions to drive global impact."}
            </p>
          </div>
          
          {/* Navigation Links */}
          <div className="margin-left-35-percent col-span-1 md:col-span-3 md:col-start-7 flex flex-col space-y-2 text-sm">
            <h4 className="font-bold mb-2 text-white">{t("company")}</h4>
            {navLinks.company.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="text-zinc-400 hover:text-[#55b331] hover:underline transition cursor-pointer"
              >
                {t(link.key)}
              </Link>
            ))}
          </div>

          {/* Contact Info */}
          <div className="col-span-1 md:col-span-3 md:col-start-10 flex flex-col space-y-4 text-sm text-zinc-400">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-white mt-1 shrink-0" />
             <p className="leading-relaxed text-right">
  <span className="block text-white" dir="ltr">
    {/* نستخدم dir="ltr" هنا عشان نثبت ترتيب الأرقام والكلمات زي ما هي مكتوبة في ملف الترجمة */}
    {t("addressLine1")}
  </span>
  <span className="block addressLine2">
    {t("addressLine2")}
  </span>
</p>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-white shrink-0" />
              <div>
                <span className="text-zinc-400 text-xs block">{t("phone")}</span>
                <Link href="tel:920010500" className="text-white font-medium hover:underline">
                  920010500
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-white shrink-0" />
              <div>
                <span className="text-zinc-400 text-xs block">{t("email")}</span>
                <Link href="mailto:info@startime.sa" className="text-white hover:underline break-all">
                  info@startime.sa
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <p className="mt-8 pt-4 border-t border-white/10 text-xs text-zinc-400 text-center">
          ©STARTIME Events – All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
