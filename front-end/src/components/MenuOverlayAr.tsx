"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const MenuOverlay: React.FC<MenuOverlayProps> = ({ isOpen, onClose }) => {
  const tMenu = useTranslations("Menu");
  const tSocial = useTranslations("socialLinks");

  const locale = useLocale();
  const router = useRouter();
  const isAr = locale === "ar";

  const handleNavigation = (id: string) => {
    onClose();

    if (id === "home") {
      const refreshUrl = `/${locale}?t=${new Date().getTime()}`;
      window.location.assign(refreshUrl);
      return;
    }

    router.push(`/${locale}/${id}`);
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    gsap.fromTo(
      ".menu-item-anim",
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.07,
        ease: "power4.out",
      },
    );
  }, [isOpen]);

  const menuItems = [
    { id: "home", key: "home" },
    { id: "services", key: "services" },
    { id: "cases", key: "cases" },
    { id: "industries", key: "industries" },
    { id: "whoWeAre", key: "whoWeAre" },
    { id: "contacts", key: "contacts" },
  ];

  const socialKeys = ["facebook", "behance", "dribbble", "instagram"];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        backgroundColor: "#fff",
        transform: isOpen ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.9s cubic-bezier(0.85, 0, 0.15, 1)",
        display: "flex",
        flexDirection: isAr ? "row" : "row-reverse",
        direction: isAr ? "rtl" : "ltr",
        textAlign: isAr ? "right" : "left",
        overflow: "hidden",
        fontFamily: isAr ? "var(--font-noto-kufi), sans-serif" : "var(--font-roboto), sans-serif",
      }}
    >
      {/* Header */}
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
        <button
          onClick={onClose}
          style={{
            padding: "12px 28px",
            backgroundColor: "#000",
            color: "#fff",
            borderRadius: "50px",
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "14px",
            letterSpacing: "1px",
          }}
        >
          {tMenu("close")}
        </button>

        <div style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 700 }}>
          StarTime
        </div>
      </div>

      {/* Menu */}
      <div
        style={{
          flex: 1.2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingRight: isAr ? "10%" : "0",
          paddingLeft: isAr ? "0" : "10%",
        }}
      >
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavigation(item.id)}
            className="menu-item-anim"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 3.6rem)",
              fontWeight: 400,
              color: item.id === "home" ? "#ff4d00" : "#e0e0e0",
              background: "none",
              border: "none",
              padding: 0,
              textAlign: "inherit",
              lineHeight: "1.2",
              cursor: "pointer",
              transition: "color 0.4s ease",
            }}
          >
            {tMenu(item.key)}
          </button>
        ))}
      </div>

      {/* Socials */}
      <div
        style={{
          flex: 0.8,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "30px",
          gap: "60px",
        }}
      >
        <div>
          <p style={{ color: "#bbb", fontSize: "16px", fontWeight: 700 }}>
            {tMenu("social")}
          </p>

          {socialKeys.map((key) => (
            <p key={key} style={{ fontWeight: 700, fontSize: "18px" }}>
              {tSocial(key)}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuOverlay;
