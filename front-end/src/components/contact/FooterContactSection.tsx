"use client";
import { useTranslations } from "next-intl";
import {
  Instagram,
  Linkedin,
  MapPin,
  X,
  Facebook,
  AtSign,
  Youtube,

} from "lucide-react";
import Link from "next/link";
import { SiFacebook, SiX, SiYoutube, SiThreads, SiTiktok, SiInstagram } from '@icons-pack/react-simple-icons';

export default function FooterContactSection() {
  const t = useTranslations("ContactPage.FooterInfo");
  const TikTokIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

  const socials = [
    {
      icon: <Instagram size={18} />,
      name: "Instagram",
      url: "https://www.instagram.com/startimevents?utm_source=qr",
    },
    {
      icon: <Linkedin size={18} />,
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/startimeevents",
    },
    {
      icon: <X size={18} />,
      name: "X",
      url: "https://x.com/startimeevents?s=11",
    },
    {
      icon: <AtSign size={18} />,
      name: "Threads",
      url: "https://www.threads.com/@startimevents?igshid=NTc4MTIwNjQ2YQ%3D%3D",
    },
    {
      icon: <Facebook size={18} />,
      name: "Facebook",
      url: "https://www.facebook.com/STARTIMEvents#",
    },
    {
      icon: <TikTokIcon size={18} />,
      name: "TikTok",
      url: "https://www.tiktok.com/@startime_events?_r=1&_t=ZS-94kZAk5ZaOy",
    },
  ];

  return (
    <section className="w-full bg-white py-20 px-8 md:px-16 border-t border-zinc-100">
      <div className="container max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="flex flex-col gap-6 order-1 lg:order-2">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="text-[#5B4180] mt-1 shrink-0" size={24} />
                <h3 className="text-xl md:text-2xl font-bold text-black leading-tight">
                  {t("address")}
                </h3>
              </div>
              <div className="h-1 w-20 bg-[#5B4180]"></div>
            </div>

            <div className="space-y-3 text-zinc-600">
              <p className="font-bold text-black flex items-center gap-2">
                {t("workingHoursTitle")}
              </p>
              <p className="bg-zinc-50 p-3 border-r-4 border-[#5B4180] inline-block">
                {t("workingHours")}
              </p>
            </div>

            <div className="pt-6 space-y-4">
              <p className="font-bold text-[#5B4180] text-sm uppercase tracking-[0.2em]">
                {t("followUs")}
              </p>
              <div className="flex flex-wrap gap-3">
                {/*socials.map((social, index) => (
                  <Link
                    key={index}
                    href={social.url || "#"}
                    className="w-11 h-11 rounded-full bg-black flex items-center justify-center text-white hover:bg-[#5B4180] transition-all duration-300 shadow-lg hover:-translate-y-1"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </Link>
                ))*/}
                <Link
                  href="https://sa.linkedin.com/company/startimeevents"
                  className="w-9 h-9 rounded-full bg-black/10 flex items-center justify-center hover:bg-black/20 transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-4 h-4" />
                </Link>
                <Link
                  href="https://x.com/startimeevents"
                  className="w-9 h-9 rounded-full bg-black/10 flex items-center justify-center hover:bg-black/20 transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SiX className="w-4 h-4" />
                </Link>
                <Link
                  href="https://www.instagram.com/startimeevents/"
                  className="w-9 h-9 rounded-full bg-black/10 flex items-center justify-center hover:bg-black/20 transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SiInstagram className="w-4 h-4" />
                </Link>
                <Link
                  href="https://www.youtube.com/@Startime_Events"
                  className="w-9 h-9 rounded-full bg-black/10 flex items-center justify-center hover:bg-black/20 transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Youtube className="w-4 h-4" />
                </Link>
                <Link
                  href="https://www.tiktok.com/@startime_events"
                  className="w-9 h-9 rounded-full bg-black/10 flex items-center justify-center hover:bg-black/20 transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 fill-current text-black"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.47-.13 3.23-.11 6.46-.12 9.7-.01 1.9-.62 3.82-1.97 5.17-1.45 1.5-3.61 2.22-5.69 2.05-2.2-.1-4.32-1.33-5.46-3.23-1.3-2.07-1.21-4.93.28-6.88 1.12-1.52 2.92-2.52 4.82-2.67v4.03c-1.12.07-2.29.61-2.92 1.55-.7 1.01-.64 2.44.18 3.33.72.85 1.88 1.22 2.98 1.06 1.1-.11 2.1-.88 2.45-1.94.18-.54.18-1.11.18-1.68-.01-4.52-.01-9.04-.01-13.56.24-.03.48-.05.73-.08z" />
                  </svg>
                </Link>
                <Link
                  href="https://www.facebook.com/STARTIMEvents"
                  className="w-9 h-9 rounded-full bg-black/10 flex items-center justify-center hover:bg-black/20 transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SiFacebook className="w-4 h-4" />
                </Link>
                <Link
                  href="https://www.threads.com/@startimevents"
                  className="w-9 h-9 rounded-full bg-black/10 flex items-center justify-center hover:bg-black/20 transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SiThreads className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Google Maps */}
          <div className="order-2 lg:order-1 w-full h-[450px] bg-zinc-100 relative shadow-inner">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d231911.0000000000!2d46.675295!3d24.713552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d48939b%3A0x88a96864101e854f!2sRiyadh%20Saudi%20Arabia!5e0!3m2!1sen!2ssa!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale contrast-110 opacity-90 hover:grayscale-0 transition-all duration-1000"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
