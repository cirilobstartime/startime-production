"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const MenuOverlay: React.FC<MenuOverlayProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const t = useTranslations("Menu");
  const locale = useLocale();
  const isAr = locale === "ar";

  const menuItems = [
    { name: t("home"), href: `/${locale}` },
    { name: t("services"), href: `/${locale}/services` },
    { name: t("cases"), href: `/${locale}/portfolio` },
    { name: t("industries"), href: `/${locale}/industries` },
    { name: t("whoWeAre"), href: `/${locale}/about` },
    { name: t("contacts"), href: `/${locale}/contact` },
  ];

  const socialLinks = ["FACEBOOK", "BEHANCE", "DRIBBBLE", "INSTAGRAM"];

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        ".menu-item",
        { y: 70, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.06,
          ease: "power4.out",
        },
      );
    }
  }, [isOpen]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        backgroundColor: "#ffffff",
        transform: isOpen ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.9s cubic-bezier(0.85, 0, 0.15, 1)",
        display: "flex",
        overflowX: "hidden",
        overflowY: "auto",

        direction: isAr ? "rtl" : "ltr",
        textAlign: isAr ? "right" : "left",
      }}
      className="font-sans flex-col md:flex-row"
    >
      {/* Top Header inside Menu */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "clamp(20px, 4vw, 40px)",
          zIndex: 10001,
        }}
      >
        <div
          style={{
            fontSize: "clamp(20px, 3vw, 32px)",
            fontWeight: 700,
            letterSpacing: "-1px",
            color: "#5A417F",
          }}
        >
          StarTime
        </div>

        <Button
          onClick={onClose}
          className="bg-primary hover:opacity-90 text-white rounded-xl px-6 md:px-8 py-4 md:py-6 text-[13px] md:text-[15px] font-bold shadow-lg transition-all hover:scale-105 active:scale-95 border border-white/10 uppercase tracking-wider"
        >
          {t("close")}
        </Button>
      </div>

      {/* Main Links Section */}
      <div
        style={{
          flex: 1.2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        
          paddingLeft: isAr ? "25px" : "clamp(25px, 10%, 15%)",
          paddingRight: isAr ? "clamp(25px, 10%, 15%)" : "25px",
          paddingTop: "120px",
          paddingBottom: "40px",
        }}
      >
        {menuItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className="menu-item"
              onClick={onClose}
              style={{
                fontSize: "clamp(1.8rem, 8vw, 4rem)",
                fontWeight: 700,
                textDecoration: "none",
                color: isActive ? "#5A417F" : "#e2e2e2",
                lineHeight: "1.1",
                letterSpacing: "-0.04em",
                transition: "all 0.4s ease",
                width: "fit-content",
                display: "block",
                cursor: "pointer",
                marginBottom: "5px",
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.color = "#5A417F";
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.color = "#e2e2e2";
              }}
            >
              {item.name}
            </Link>
          );
        })}
      </div>

      {/* Info/Socials Section */}
      <div
        style={{
          flex: 0.8,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: isAr ? "0" : "clamp(25px, 10%, 30px)",
          paddingRight: isAr ? "clamp(25px, 10%, 30px)" : "0",
          paddingBottom: "60px",
          gap: "clamp(30px, 5vw, 60px)",
        }}
      >
        <div>
          <p
            style={{
              color: "#D4BDA3",
              fontSize: "12px",
              fontWeight: "700",
              letterSpacing: "2px",
              marginBottom: "15px",
            }}
          >
            {t("social")}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {socialLinks.map((link) => (
              <Link
                key={link}
                href="#"
                style={{
                  color: "#5A417F",
                  textDecoration: "none",
                  fontWeight: "700",
                  fontSize: "clamp(14px, 2vw, 18px)",
                  transition: "opacity 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                {link}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p
            style={{
              color: "#D4BDA3",
              fontSize: "12px",
              fontWeight: "700",
              letterSpacing: "2px",
              marginBottom: "15px",
            }}
          >
            {t("getInTouch")}
          </p>
          <p
            style={{
              fontSize: "clamp(16px, 3vw, 20px)",
              fontWeight: "700",
              margin: 0,
              color: "#5A417F",
            }}
          >
            INFO@STARTIME.SA
          </p>
          <p
            style={{
              fontSize: "clamp(16px, 3vw, 20px)",
              fontWeight: "700",
              marginTop: "5px",
              color: "#5A417F",
            }}
          >
            +966 920010500
          </p>
        </div>
      </div>
    </div>
  );
};

export default MenuOverlay;
