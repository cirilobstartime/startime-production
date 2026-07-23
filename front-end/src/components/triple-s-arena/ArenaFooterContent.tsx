"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface Props {
  policyLines: string[];
  locale: string;
}

const ArenaFooterContent = ({ policyLines = [], locale }: Props) => {
  const t = useTranslations("TripleSArena");
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const isAr = locale === "ar";

  const title =
    policyLines?.[0] || (isAr ? "سياسة الخصوصية" : "Privacy Policy");

  const contentBody = policyLines?.length > 1 ? policyLines.slice(1) : [];

  return (
    <section
      className="relative w-full bg-black text-white py-20 overflow-hidden"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col gap-6 text-lg">
            <button
              onClick={() => setIsPolicyOpen(true)}
              className="flex justify-center items-center gap-2 text-white font-medium text-right"
            >
              <span className="border-b border-white hover:text-[#5b4180] hover:border-[#5b4180] transition-colors">
                {t("footer.policyLink")}
              </span>
            </button>
          </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          {/* Contact Info */}
          <div className="hidden space-y-4">
            <h3 className="text-xl font-bold text-white">
              {t("footer.contactTitle")}
            </h3>
            <div className="text-2xl md:text-3xl font-bold space-y-2">
              <p className="hover:text-purple-400 transition-colors cursor-pointer">
                {t("footer.email")}
              </p>
              <p dir="ltr" className={isAr ? "text-right" : "text-left"}>
                {t("footer.phone")}
              </p>
            </div>
          </div>

          {/* Support & Policy Links */}
          <div className="flex flex-col gap-6 text-lg">
            {/* Static support text - non-clickable */}
            <div className="hidden flex items-center gap-2">
              <span className="text-white">{t("footer.supportText")}</span>
              <span className="text-white font-bold">
                {t("footer.clickHere")}
              </span>
            </div>

            {/* Clickable Policy Button */}
            <button
              onClick={() => setIsPolicyOpen(true)}
              className="hidden flex justify-center items-center gap-2 text-white font-medium text-right"
            >
              <span className="border-b border-white hover:text-[#5b4180] hover:border-[#5b4180] transition-colors">
                {t("footer.policyLink")}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Cyber Security Policy Pop-up */}
      <AnimatePresence>
        {isPolicyOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPolicyOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              className="relative bg-white text-black w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-3xl shadow-2xl p-8 md:p-12"
            >
              <button
                onClick={() => setIsPolicyOpen(false)}
                className={`absolute top-6 ${isAr ? "left-6" : "right-6"} p-2 hover:bg-gray-100 rounded-full transition-colors`}
              >
                <X size={28} />
              </button>

              <div className="space-y-6">
                <header className="border-b pb-6">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-[#5b4180]">
                    {title}
                  </h2>
                </header>

                <div className="space-y-4">
                  {contentBody.length > 0 ? (
                    contentBody.map((line, idx) => {
                      const isSubTitle = /^\d+\./.test(line);
                      return (
                        <p
                          key={idx}
                          className={
                            isSubTitle
                              ? "text-xl font-bold text-[#5b4180] mt-6"
                              : "text-gray-700 leading-relaxed text-lg"
                          }
                        >
                          {line}
                        </p>
                      );
                    })
                  ) : (
                    <p className="text-gray-500 italic py-4">
                      {isAr
                        ? "لا توجد تفاصيل إضافية متاحة حالياً."
                        : "No additional details available at the moment."}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ArenaFooterContent;
