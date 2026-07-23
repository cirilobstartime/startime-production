"use client";

import { useRef, useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Paperclip, Send, Upload, X } from "lucide-react";

const STRAPI_BASE_URL = "https://startime.sa";

export const JoinUsSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [content, setContent] = useState({ title: "", description: "" });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [additionalFiles, setAdditionalFiles] = useState<File[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const locale = useLocale();
  const isAr = locale === "ar";

  // جلب البيانات من الـ API
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch(`${STRAPI_BASE_URL}/api/join-us-sections?locale=${locale}`);
        const result = await res.json();
        if (result.data && result.data[0]) {
          setContent({
            title: result.data[0].title,
            description: result.data[0].description,
          });
        }
      } catch (error) {
        console.error("Error fetching Join Us content:", error);
      }
    };
    fetchContent();
  }, [locale]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/join-us", {
        method: "POST",
        body: new FormData(formRef.current),
      });
      const data = await res.json();
      setStatus(data.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const formFields = [
    { id: "name", label: isAr ? "الاسم" : "Full Name", type: "text" },
    { id: "email", label: isAr ? "البريد الإلكتروني" : "Email Address", type: "email" },
    { id: "phone", label: isAr ? "الهاتف مع مفتاح الدولة" : "Phone Number (with country code)", type: "tel" },
    { id: "specialization", label: isAr ? "التخصص" : "Specialization", type: "text" },
    { id: "cv", label: isAr ? "السيرة الذاتية" : "Curriculum Vitae (CV)", type: "file" },
    { id: "files", label: isAr ? "ارفاق ملفات أخرى" : "Upload Additional Files", type: "file" },
  ];

  return (
    <>
      <section className="w-full bg-white py-24 px-6 text-center border-t border-black/5" dir={isAr ? "rtl" : "ltr"}>
        <div className="max-w-7xl mx-auto">
          {/* العنوان الديناميكي من Strapi */}
          <h2 className="text-[#5b4180] text-4xl md:text-6xl font-black mb-8 uppercase tracking-tighter">
            {content.title || (isAr ? "انضم إلينا" : "Join Us")}
          </h2>

          <div className="flex flex-col items-center mb-12 space-y-4 max-w-3xl mx-auto">
            {/* الوصف الديناميكي من Strapi */}
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-black text-lg md:text-xl font-bold leading-relaxed whitespace-pre-line"
            >
              {content.description}
            </motion.p>
            
            <div className="h-[2px] bg-black w-24 mt-4" />
          </div>

         <motion.button
  onClick={() => setIsOpen(true)}
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  className="group text-[#5b4180] py-4 md:py-5 text-xl md:text-2xl font-black inline-flex items-center justify-center"
>
  <span className="inline-flex items-center gap-2 border-b-2 border-[#5b4180] pb-1">
    {isAr ? "تقدم الآن" : "Apply Now"}

    <motion.svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${isAr ? "rotate-180" : ""}`}
      whileHover={{ x: isAr ? -6 : 6 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <path d="M5 12h14" />
      <path d="M12 5l7 7-7 7" />
    </motion.svg>
  </span>
</motion.button>
        </div>
      </section>

      {/* Pop-up Form */}
     <AnimatePresence>
    {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 40 }}
                className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]"
            >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-5 md:p-6 border-b border-gray-100">
                    <h2 className="text-[#5D44A7] text-lg md:text-2xl font-bold">
                        {isAr ? "نموذج التقديم" : "Application Form"}
                    </h2>
                    <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-black transition-colors">
                        <X size={28} />
                    </button>
                </div>

                <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
                {/* Form Content */}
                <div className="flex-1 overflow-y-auto p-5 md:p-8 space-y-5 custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Full Name */}
                        <div className="space-y-1">
                            <label className="text-sm font-bold text-gray-700">{isAr ? "الاسم الكامل" : "Full Name"}</label>
                            <input name="name" type="text" className="p-3 w-full border border-gray-200 focus:border-[#7F56D9] outline-none transition-colors rounded-lg" />
                        </div>
                        {/* Email Address */}
                        <div className="space-y-1">
                            <label className="text-sm font-bold text-gray-700">{isAr ? "البريد الإلكتروني" : "Email Address"}</label>
                            <input name="email" type="email" className="p-3 w-full border border-gray-200 focus:border-[#7F56D9] outline-none transition-colors rounded-lg text-left" dir="ltr" />
                        </div>
                        {/* Phone Number with Country Code */}
                        <div className="space-y-1">
                            <label className="text-sm font-bold text-gray-700">{isAr ? "رقم الهاتف (مع مفتاح الدولة)" : "Phone Number (with country code)"}</label>
                            <input name="phone" type="tel" placeholder="+966..." className="p-3 w-full border border-gray-200 focus:border-[#7F56D9] outline-none transition-colors rounded-lg text-left" dir="ltr" />
                        </div>
                        {/* Specialization */}
                        <div className="space-y-1">
                            <label className="text-sm font-bold text-gray-700">{isAr ? "التخصص" : "Specialization"}</label>
                            <input name="specialization" type="text" className="p-3 w-full border border-gray-200 focus:border-[#7F56D9] outline-none transition-colors rounded-lg" />
                        </div>
                    </div>

                    {/* Curriculum Vitae (CV) */}
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700">{isAr ? "السيرة الذاتية (CV)" : "Curriculum Vitae (CV)"}</label>
                        <label className="relative border-2 border-dashed border-gray-200 rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer">
                            <input
                                name="cv"
                                type="file"
                                className="hidden"
                                onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                            />
                            <span className={`text-sm truncate max-w-[80%] ${cvFile ? "text-[#7F56D9] font-medium" : "text-gray-400"}`}>
                                {cvFile ? cvFile.name : (isAr ? "ارفع سيرتك الذاتية" : "Upload your CV")}
                            </span>
                            <Paperclip size={20} className={cvFile ? "text-[#7F56D9] shrink-0" : "text-[#7F56D9] shrink-0"} />
                        </label>
                    </div>

                    {/* Upload Additional Files */}
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700">{isAr ? "إرفاق ملفات أخرى" : "Upload Additional Files"}</label>
                        <label className="border-2 border-dashed border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors group">
                            <input
                                name="files"
                                type="file"
                                multiple
                                className="hidden"
                                onChange={(e) => setAdditionalFiles(Array.from(e.target.files || []))}
                            />
                            <Upload className={`mb-2 ${additionalFiles.length > 0 ? "text-[#7F56D9]" : "text-gray-400 group-hover:text-[#7F56D9]"}`} />
                            <span className={`text-sm text-center ${additionalFiles.length > 0 ? "text-[#7F56D9] font-medium" : "text-gray-400 group-hover:text-gray-600"}`}>
                                {additionalFiles.length > 0
                                    ? additionalFiles.map((f) => f.name).join(", ")
                                    : (isAr ? "اضغط لرفع ملفات إضافية" : "Click to upload additional files")}
                            </span>
                        </label>
                    </div>

                    {/* Message */}
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700">{isAr ? "رسالة" : "Message"}</label>
                        <textarea name="message" rows={3} className="p-3 w-full border border-gray-200 focus:border-[#7F56D9] outline-none transition-colors resize-none rounded-lg" />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="p-5 md:p-6 bg-gray-50 border-t border-gray-100">
                    {status === "success" && (
                        <p className="text-green-600 font-bold text-center mb-3 italic">
                            {isAr ? "تم الإرسال بنجاح!" : "Sent successfully!"}
                        </p>
                    )}
                    {status === "error" && (
                        <p className="text-red-600 font-bold text-center mb-3 italic">
                            {isAr ? "حدث خطأ، يرجى المحاولة مرة أخرى" : "An error occurred, please try again"}
                        </p>
                    )}
                    <button
                        type="submit"
                        disabled={status === "loading" || status === "success"}
                        className="w-full bg-[#5D44A7] text-white py-4 rounded-lg font-black flex items-center justify-center gap-3 transition-all active:scale-[0.98] hover:bg-[#4a368a] disabled:opacity-60"
                    >
                        <Send size={20} className={isAr ? "rotate-180" : ""} />
                        {status === "loading"
                            ? (isAr ? "جاري الإرسال..." : "Sending...")
                            : (isAr ? "إرسال" : "Submit")}
                    </button>
                </div>
                </form>
            </motion.div>
        </div>
    )}
</AnimatePresence>
    </>
  );
};