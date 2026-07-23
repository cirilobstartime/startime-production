"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations, useLocale } from "next-intl";
import { Service } from "@/types/service";
import { getServices } from "@/lib/get-service";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const HorizontalServices = () => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  const [services, setServices] = useState<Service[]>([]);

  const t = useTranslations("HorizontalServices");
  const locale = useLocale();
  const isAr = locale === "ar";
  const STRAPI_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

  useEffect(() => {
    const loadData = async () => {
      const data = await getServices(locale);
      setServices(data);
    };
    loadData();
  }, [locale]);

  useLayoutEffect(() => {
    if (services.length === 0) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        if (!pinRef.current || !triggerRef.current) return;

        const pinElement = pinRef.current;
        const triggerElement = triggerRef.current;

        const scrollWidth = pinElement.offsetWidth - window.innerWidth;

        gsap.to(pinElement, {
          x: isAr ? scrollWidth : -scrollWidth,
          ease: "none",
          scrollTrigger: {
            trigger: triggerElement,
            pin: true,
            scrub: 2,
            start: "top top",

            end: () => `+=${pinElement.offsetWidth}`,
            invalidateOnRefresh: true,
          },
        });
      });
    });

    return () => ctx.revert();
  }, [isAr, services]);

  const scrollToTop = () => {
    gsap.to(window, {
      scrollTo: { y: 0 },
      duration: 1.5,
      ease: "power4.inOut",
    });
  };

  return (
    <div className="bg-background" style={{ direction: isAr ? "rtl" : "ltr" }}>
      <section
        ref={triggerRef}
        className="relative overflow-hidden md:overflow-visible lg:overflow-hidden"
      >
        <div
          ref={pinRef}
          className={`
            relative 
            flex 
            flex-col 
            md:flex-row 
            items-center 
            w-full 
            md:w-fit 
            px-6 
            md:px-10 
            md:h-screen 
            gap-10
          `}
        >
          {services.map((service) => {
            const title = service.title;
            const quote = service.quote;
            const desc = service.description;

            return (
              <div
                key={service.id}
                className="
                  relative 
                  w-full 
                  md:w-[85vw] 
                  min-h-[90vh] 
                  md:h-[85vh] 
                  flex 
                  flex-col 
                  md:flex-row 
                  shrink-0 
                  border-b 
                  md:border-none 
                  border-primary/10 
                  pb-10 
                  md:pb-0
                "
              >
                {/* Content Side */}
                <div className="flex-1 p-4 md:p-16 flex flex-col justify-center space-y-6 md:space-y-8">
                  <p className="italic text-base md:text-lg text-secondary max-w-sm font-bold">
                    "{quote}"
                  </p>

                  <h3 className="text-[10vw] md:text-[6vw] font-bold tracking-[-0.05em] leading-[0.9] text-primary">
                    {title.includes(" ") ? (
                      <>
                        {title.split(" ")[0]}
                        <br />
                        {title.split(" ").slice(1).join(" ")}
                      </>
                    ) : (
                      title
                    )}
                  </h3>

                  <p className="text-primary/70 text-base md:text-lg max-w-sm">
                    {desc}
                  </p>

                  <Button
                    variant="outline"
                    className="w-fit rounded-xl px-10 py-7 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-500 group text-lg bg-transparent font-bold uppercase"
                  >
                    {t("viewMore")}
                    <ArrowUpRight
                      className={`ml-2 w-5 h-5 group-hover:rotate-45 transition-transform ${isAr ? "rotate-[-90deg]" : ""}`}
                    />
                  </Button>
                </div>

                {/* Media Side */}
                <div className="flex-1 flex items-center justify-center p-4 md:p-6">
                  <div className="w-full h-[50vh] md:h-[80%] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-primary/10 shadow-xl">
                    <video
                      src={service.serviceMedia_video?.url}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Back to top */}
      <section
        className={`h-[20vh] md:h-[30vh] flex items-end p-10 ${isAr ? "justify-start" : "justify-end"}`}
      >
        <button
          onClick={scrollToTop}
          className="group flex flex-col items-center gap-2"
        >
          <div className="w-14 h-14 md:w-20 md:h-20 group-hover:-translate-y-3 transition-transform duration-500">
            <img
              src="/arrow.svg"
              alt="Back to top"
              className="w-full h-full"
              style={{
                transform: isAr ? "rotate(75deg) scaleX(-1)" : "rotate(-75deg)",
              }}
            />
          </div>
          <span className="font-bold uppercase text-[10px] md:text-sm tracking-widest text-primary">
            {t("backToTop")}
          </span>
        </button>
      </section>
    </div>
  );
};

export default HorizontalServices;
