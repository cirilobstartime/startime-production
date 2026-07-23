"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { Copy, Check, Mail, Linkedin } from "lucide-react";
import {
  SiFacebook,
  SiX,
  SiWhatsapp,
} from "@icons-pack/react-simple-icons";

interface SocialShareProps {
  title: string;
  url?: string;
}

export default function SocialShare({
  title,
  url: providedUrl,
}: SocialShareProps) {
  const [url, setUrl] = useState(providedUrl ?? "");
  const [copied, setCopied] = useState(false);

  const locale = useLocale();
  const isAr = locale === "ar";

  const shareText = isAr ? "شارك هذا المقال" : "Share this article";
  const copiedText = isAr ? "تم النسخ!" : "Copied!";
  const copyLabel = isAr ? "نسخ الرابط" : "Copy link";

  useEffect(() => {
    if (!providedUrl) {
      setUrl(window.location.href);
    }
  }, [providedUrl]);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: <SiFacebook size={18} />,
    },
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: <Linkedin size={18} />,
    },
    {
      name: "X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: <SiX size={18} />,
    },
    {
      name: "WhatsApp",
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      icon: <SiWhatsapp size={18} />,
    },
    {
      name: "Email",
      href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
      icon: <Mail size={18} strokeWidth={2} />,
    },
  ];

  const copyLink = async () => {
    if (!url) return;

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  return (
    <div className="border-t border-gray-200 pt-8">
      <h3
        className={`mb-4 text-lg font-semibold text-gray-900 ${
          isAr ? "text-right" : "text-left"
        }`}
      >
        {shareText}
      </h3>

      <div className="flex flex-wrap items-center gap-3">
        {shareLinks.map((platform) => (
          <a
            key={platform.name}
            href={platform.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${platform.name}`}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition-all duration-300 hover:border-[#8BC53F] hover:bg-[#8BC53F] hover:text-white"
          >
            {platform.icon}
          </a>
        ))}

        <button
          type="button"
          onClick={copyLink}
          aria-label={copyLabel}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition-all duration-300 hover:border-[#8BC53F] hover:bg-[#8BC53F] hover:text-white"
        >
          {copied ? (
            <Check size={18} strokeWidth={2.5} />
          ) : (
            <Copy size={18} strokeWidth={2} />
          )}
        </button>

        {copied && (
          <span className="text-sm font-medium text-green-600">
            {copiedText}
          </span>
        )}
      </div>
    </div>
  );
}