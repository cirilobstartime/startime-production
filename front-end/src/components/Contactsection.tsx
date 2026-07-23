"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";

export default function ContactSection() {
  const t = useTranslations("Contact");
  const locale = useLocale();
  const isAr = locale === "ar";

  // --- Scroll-driven circles ---
  const sectionRef = useRef<HTMLDivElement>(null);
  const [overlap, setOverlap] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const raw = 1 - rect.top / vh;
      setOverlap(Math.min(1, Math.max(0, raw)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const spread = (1 - overlap) * 72;

  // --- Form state ---
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
    privacy: false,
  });

  const set = (k: string, v: string | boolean) =>
    setForm((p) => ({ ...p, [k]: v }));

  const interests = t.raw("interests") as string[];

  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async () => {
    if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.interest || !form.message || !form.privacy) return;
    setSubmitStatus("loading");
    try {
      const formData = new FormData();
      formData.append("entity", form.interest);
      formData.append("name", `${form.firstName} ${form.lastName}`);
      formData.append("position", "");
      formData.append("phone", form.phone);
      formData.append("email", form.email);
      formData.append("message", form.message);
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setSubmitStatus(data.success ? "success" : "error");
    } catch {
      setSubmitStatus("error");
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-black text-white px-6 md:px-16 py-16 overflow-hidden"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto mb-16">
        <h2
          className="text-6xl md:text-7xl font-bold mb-6"
          style={{ color: "#5A417F" }}
        >
          {t("title")}
        </h2>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl">
          {t("subtitle")}
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="flex items-center justify-center h-72 md:h-96 select-none pointer-events-none">
          <div className="relative w-64 h-64 flex items-center justify-center">
            <svg
              className="absolute inset-0 transition-none"
              style={{ transform: `translateX(${-spread}px)` }}
              width="256"
              height="256"
              viewBox="0 0 256 256"
              fill="none"
            >
              <circle
                cx="128"
                cy="128"
                r="110"
                stroke="#7b7fe8"
                strokeWidth="1.5"
              />
            </svg>
            <svg
              className="absolute inset-0"
              width="256"
              height="256"
              viewBox="0 0 256 256"
              fill="none"
            >
              <circle
                cx="128"
                cy="128"
                r="110"
                stroke="#9da3f5"
                strokeWidth="1.5"
              />
            </svg>
            <svg
              className="absolute inset-0 transition-none"
              style={{ transform: `translateX(${spread}px)` }}
              width="256"
              height="256"
              viewBox="0 0 256 256"
              fill="none"
            >
              <circle
                cx="128"
                cy="128"
                r="110"
                stroke="#5b5fcf"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                {t("firstName")} *
              </label>
              <input
                type="text"
                value={form.firstName}
                onChange={(e) => set("firstName", e.target.value)}
                className="w-full bg-transparent border-b border-gray-600 pb-3 text-lg text-white focus:outline-none focus:border-[#7b7fe8] transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                {t("lastName")} *
              </label>
              <input
                type="text"
                value={form.lastName}
                onChange={(e) => set("lastName", e.target.value)}
                className="w-full bg-transparent border-b border-gray-600 pb-3 text-lg text-white focus:outline-none focus:border-[#5A417F] transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                {t("email")} *
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                className="w-full bg-transparent border-b border-gray-600 pb-3 text-lg text-white focus:outline-none focus:border-[#5A417F] transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                {t("phone")} *
              </label>
              <div className="flex items-center gap-2 border-b border-gray-600 pb-3">
                <span className="text-base">🇦🇺</span>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  className="flex-1 bg-transparent text-lg text-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm text-gray-300 mb-2">
              {t("interest")} *
            </label>
            <select
              value={form.interest}
              onChange={(e) => set("interest", e.target.value)}
              className="w-full bg-transparent text-lg text-white border-b border-gray-600 pb-3 appearance-none focus:outline-none focus:border-[#5A417F] cursor-pointer"
            >
              <option value="" disabled className="bg-black text-gray-400">
                {t("selectPlaceholder")}
              </option>
              {interests.map((item) => (
                <option key={item} value={item} className="bg-black">
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm text-gray-300 mb-2">
              {t("message")} *
            </label>
            <textarea
              rows={3}
              value={form.message}
              onChange={(e) => set("message", e.target.value)}
              className="w-full bg-transparent border-b border-gray-600 pb-3 text-lg text-white focus:outline-none focus:border-[#5A417F] resize-none transition-colors"
            />
          </div>

          <div className="flex items-center gap-3 mb-8">
            <input
              type="checkbox"
              id="privacy"
              checked={form.privacy}
              onChange={(e) => set("privacy", e.target.checked)}
              className="w-5 h-5 accent-[#7b7fe8] cursor-pointer"
            />
            <label
              htmlFor="privacy"
              className="text-sm text-gray-300 cursor-pointer"
            >
              {t("privacy")} *
            </label>
          </div>

          {submitStatus === "success" && (
            <p className="text-green-400 font-bold text-center mb-4">
              {isAr ? "تم الإرسال بنجاح" : "Sent successfully"}
            </p>
          )}
          {submitStatus === "error" && (
            <p className="text-red-400 font-bold text-center mb-4">
              {isAr ? "حدث خطأ، يرجى المحاولة مرة أخرى" : "An error occurred, please try again"}
            </p>
          )}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitStatus === "loading" || submitStatus === "success"}
            className="w-full py-5 rounded-full bg-[#5A417F] hover:bg-[#6366d5] text-white text-lg font-bold tracking-wide transition-colors disabled:opacity-60"
          >
            {submitStatus === "loading"
              ? (isAr ? "جاري الإرسال..." : "Sending...")
              : t("submit")}
          </button>
        </div>
      </div>
    </section>
  );
}
