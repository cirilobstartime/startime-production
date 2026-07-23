"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const isAr = locale === "ar";
  const pathname = usePathname();
  const router = useRouter();

  const [visible, setVisible] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setAtTop(currentY < 10);
      if (currentY < lastScrollY.current - 5 || currentY < 60) {
        setVisible(true);
      } else if (currentY > lastScrollY.current + 5 && currentY > 60) {
        setVisible(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleLocale = () => {
    const nextLocale = isAr ? "en" : "ar";
    const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
    router.push(newPath);
  };

  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { key: "home", href: `/${locale}` },
    { key: "discover", href: `/${locale}/discover` },
    { key: "portfolio", href: `/${locale}/portfolio` },
    { key: "solutions", href: `/${locale}/solutions` },
    { key: "tripleS", href: `/${locale}/triple-s-arena` },
    { key: "joinUs", href: `/${locale}/join-us` },
    { key: "contact", href: `/${locale}/contact` },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header
      dir={isAr ? "rtl" : "ltr"}
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        visible ? "translate-y-0" : "-translate-y-full",
        atTop
          ? "bg-transparent"
          : "bg-black/80 backdrop-blur-md border-b border-white/10",
      ].join(" ")}
    >
      {/* LOGO */}
      <Link
        href={`/${locale}`}
        className={`absolute ${isAr ? "right-4" : "left-4"} top-4 w-40 h-10 md:w-56 md:h-16 flex items-center`}
      >
        <Image
          src="/startime horizntal white logo .svg"
          alt="Startime"
          width={240}
          height={48}
          className={`object-contain ${isAr ? "object-right" : "object-left"}`}
          priority
        />
      </Link>

      {/* NAVBAR CONTAINER */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center">
        <div className="w-40 shrink-0" />

        {/* DESKTOP NAV */}
        <nav
          className={`hidden md:flex items-center gap-1 ${
            isAr ? "mr-auto" : "ml-auto"
          }`}
        >
          {links.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              className={[
                "relative px-4 py-2 text-base font-medium transition-colors rounded-md",
                isActive(href)
                  ? "text-[#5A417F]"
                  : "text-gray-300 hover:text-white",
              ].join(" ")}
            >
              {t(key)}
            </Link>
          ))}
          <button
            onClick={toggleLocale}
            className="px-3 py-1 ml-4 text-sm font-bold text-white border border-white/20 rounded-full hover:bg-white/10 transition"
          >
            {isAr ? "EN" : "AR"}
          </button>
        </nav>

        {/* MOBILE ACTIONS (Language + Hamburger) */}
        <div
          className={`md:hidden flex items-center gap-3 ${isAr ? "mr-auto" : "ml-auto"}`}
        >
          <button
            onClick={toggleLocale}
            className="px-3 py-1 text-xs font-bold text-white border border-white/20 rounded-full hover:bg-white/10"
          >
            {isAr ? "EN" : "AR"}
          </button>

          <button
            className="flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span
              className={`block w-5 h-0.5 bg-white transition-all ${mobileOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 bg-white transition-all ${mobileOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 bg-white transition-all ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={[
          "md:hidden overflow-hidden transition-all duration-300",
          mobileOpen ? "max-h-96 border-t border-white/10" : "max-h-0",
        ].join(" ")}
        style={{ background: "rgba(0,0,0,0.95)" }}
      >
        <nav
          className={`flex flex-col px-6 py-4 gap-1 ${isAr ? "items-end text-right" : "items-start text-left"}`}
        >
          {links.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="py-3 text-sm font-medium border-b border-white/5 text-gray-300 hover:text-white w-full"
            >
              {t(key)}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
