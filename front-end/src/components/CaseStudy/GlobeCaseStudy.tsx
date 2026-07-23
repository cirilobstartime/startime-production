"use client";
import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

const STRAPI_BASE_URL = "https://staging.startime.sa";

interface GlobePoint {
  id: number;
  text_elment: string;
}

export default function GlobeCaseStudy({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const locale = useLocale();
  const isAr = locale === "ar";

  const [showIntro, setShowIntro] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState<{
    title: string;
    videoUrl: string;
    points: GlobePoint[];
  } | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch(
          `${STRAPI_BASE_URL}/api/portfolio-banner-headers?populate=*&locale=${locale}`,
        );
        const result = await res.json();

        if (result?.data?.[0]) {
          const item = result.data[0];
          setData({
            title: item.title,
            videoUrl: item.aniamte_video?.url
              ? `${STRAPI_BASE_URL}${item.aniamte_video.url}`
              : "",
            points: item.element || [],
          });
        }
      } catch (error) {
        console.error("Failed to fetch globe data:", error);
      }
    };
    loadData();
  }, [locale]);

  useEffect(() => {
    if (!data || data.points.length === 0) return;

    if (currentIndex < data.points.length) {
      const timer = setTimeout(() => setCurrentIndex((p) => p + 1), 900);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setShowIntro(false);
        onComplete();
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, data, onComplete]);

  useEffect(() => {
    document.body.style.overflow = showIntro ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showIntro]);

  const handleSkip = () => {
    setShowIntro(false);
    onComplete();
  };

  if (!data) return null;

  const pointPositions = [
    { pos: "md:top-[15%] md:left-[5%]", side: "right" },
    { pos: "md:top-[15%] md:right-[5%]", side: "left" },
    { pos: "md:top-[45%] md:left-[3%]", side: "right" },
    { pos: "md:top-[45%] md:right-[3%]", side: "left" },
    { pos: "md:bottom-[10%] md:left-1/2 md:-translate-x-1/2", side: "center" },
  ];

// const pointPositions = [
//   { pos: "top-[15%] right-[5%] md:top-[15%] md:left-[5%]", side: "left" },
//   { pos: "top-[30%] left-[5%] md:top-[15%] md:right-[5%]", side: "right" },
//   { pos: "top-[45%] right-[5%] md:top-[45%] md:left-[3%]", side: "left" },
//   { pos: "top-[60%] left-[5%] md:top-[45%] md:right-[3%]", side: "right" },
//   { pos: "bottom-[10%] left-1/2 -translate-x-1/2", side: "center" },
// ];


// const pointPositions = [
//     { pos: "md:top-[15%] md:left-[5%]", side: "right" },
//     { pos: "md:top-[15%] md:right-[5%]", side: "left" },
//     { pos: "md:top-[45%] md:left-[3%]", side: "right" },
//     { pos: "md:top-[45%] md:right-[3%]", side: "left" },
//     { pos: "md:bottom-[10%] md:left-1/2 md:-translate-x-1/2", side: "center" },
//   ];
  return (
    <>
      <style>{`
        @keyframes dotPulse {
          0% { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(2.8); opacity: 0; }
        }
        .globe-dot-ring { animation: dotPulse 2s ease-out infinite; }
      `}</style>

      <section
        className={`relative w-full bg-[#06060f] flex items-center justify-center overflow-hidden transition-all duration-1000 ${
          showIntro
            ? "fixed inset-0 z-[9999] h-screen"
            : "min-h-screen md:h-[90vh]"
        }`}
        dir={isAr ? "rtl" : "ltr"}
      >
        {/* Skip Button */}
        <AnimatePresence>
          {showIntro && (
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              onClick={handleSkip}
              className="absolute top-10 right-10 z-[10000] px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full text-sm font-medium hover:bg-white/20 transition-all shadow-xl"
            >
              {isAr ? "تخطي" : "Skip"}
            </motion.button>
          )}
        </AnimatePresence>

        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          {data.videoUrl && (
            <>
              <div className="absolute inset-0 bg-black/60 z-[5]" />
              {data.videoUrl.toLowerCase().endsWith(".mp4") ? (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src={data.videoUrl} />
                </video>
              ) : (
                <img
                  src={data.videoUrl}
                  alt="Background"
                  className="w-full h-full object-cover"
                />
              )}
            </>
          )}
        </div>

        <AnimatePresence mode="wait">
          {showIntro ? (
            <motion.div
              key="intro"
              className="relative z-40 text-center px-6"
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  className="flex items-center justify-center gap-4"
                >
                  <h1 className="text-white text-3xl sm:text-5xl md:text-8xl font-black leading-none drop-shadow-2xl tracking-tighter">
                    {data.points[currentIndex]?.text_elment}
                  </h1>
                  <span className="w-3 h-3 md:w-5 md:h-5 rounded-full bg-[#b485ff] shadow-[0_0_30px_#b485ff]" />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="final"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="relative z-20 w-full h-full p-6 md:p-10 flex flex-col justify-center"
            >
              {/* Header */}
              <div className="md:absolute md:top-22 md:left-0 md:w-full text-center z-30 mb-8 md:mb-0">
                <motion.p
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-white text-[1.5rem] md:text-[1.5rem] uppercase font-bold opacity-70"
                >
                  {data.title}
                </motion.p>
              </div>

              {/* Points Container */}
              <div className="relative h-full w-full flex flex-col md:block gap-10 md:gap-0 justify-center">
                {data.points.slice(0, 5).map((p, i) => {
                  const layout = pointPositions[i];
                  return (
                    <motion.div
                      key={p.id}
                      className={`flex items-start gap-4 md:absolute ${layout.pos} max-md:!static`}
                      style={{
                        flexDirection:
                          layout.side === "left"
                            ? "row"
                            : layout.side === "center"
                              ? "column"
                              : "row-reverse",
                        alignItems:
                          layout.side === "center" ? "center" : "flex-start",
                      }}
                      initial={{
                        opacity: 0,
                        x:
                          layout.side === "left"
                            ? 50
                            : layout.side === "right"
                              ? -50
                              : 0,
                      }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15, duration: 0.7 }}
                    >
                      
                      <div className="relative flex items-center justify-center w-6 h-6 shrink-0">
                        <div className="globe-dot-ring absolute inset-0 bg-[#b485ff]/50 rounded-full" />
                        <div className="w-2.5 h-2.5 bg-[#b485ff] rounded-full shadow-[0_0_15px_#b485ff] z-10" />
                      </div>

                   
                      <div
                        className={`
                          w-full max-w-[280px] md:max-w-[280px]
                          ${
                            layout.side === "left"
                              ? "text-left"
                              : layout.side === "center"
                                ? "text-center"
                                : "text-right"
                          }
                        `}
                      >
                        <h3 className="text-white text-xl md:text-3xl lg:text-4xl font-black leading-[1.3] tracking-tight drop-shadow-lg">
                          {p.text_elment}
                        </h3>
                      </div>
                    </motion.div>
                  );
                })}
              </div>



            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}
