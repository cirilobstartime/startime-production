"use client";
import React, { useState, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { X, Paperclip, Send } from "lucide-react";

export default function ResponsibleAISection() {
  const t = useTranslations("ResponsibleAI");
  const f = useTranslations("ContactPage.ContactForm");
  const locale = useLocale();
  const isAr = locale === "ar";

  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const newErrors: { [key: string]: string } = {};
    const requiredFields = ["entity", "name", "position", "phone", "email"];

    requiredFields.forEach((field) => {
      if (!formData.get(field)) {
        newErrors[field] = f.has("fields.required")
          ? f("fields.required")
          : isAr
            ? "هذا الحقل مطلوب"
            : "This field is required";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStatus("loading");

    try {
      const res = await fetch("/api/solution", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setTimeout(() => {
          setIsOpen(false);
          setStatus("idle");
        }, 2000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const renderField = (
    name: string,
    label: string,
    type: string = "text",
    colSpan: string = "",
  ) => (
    <div className={`flex flex-col gap-2 text-start ${colSpan}`}>
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <input
        name={name}
        type={type}
        className={`w-full p-3 border outline-none transition-all ${
          errors[name]
            ? "border-red-500 ring-1 ring-red-500"
            : "border-gray-200 focus:border-[#5A417F]"
        }`}
        onChange={() => {
          if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
        }}
      />
      {errors[name] && (
        <span className="text-red-500 text-xs font-medium">{errors[name]}</span>
      )}
    </div>
  );

  return (
    <section className="w-full bg-white py-24" dir={isAr ? "rtl" : "ltr"}>
      <div className="container mx-auto px-6 md:px-16 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <button
            onClick={() => setIsOpen(true)}
            className={`group relative inline-flex items-center gap-4 py-3 text-[#5b4180] transition-all`}
          >
            <span className="text-2xl font-bold">{t("contactBtn")}</span>

            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-x-2"
            >
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>

            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-[#5b4180] transition-all duration-300" />
          </button>
        </motion.div>

        <AnimatePresence>
          {isOpen && (
            <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-2xl bg-white overflow-hidden shadow-2xl"
              >
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                  <h3 className="text-xl font-bold text-[#5A417F]">
                    {f("title")}
                  </h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-gray-200 transition-colors text-gray-500"
                  >
                    <X size={24} />
                  </button>
                </div>

                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto"
                >
                  {renderField("entity", f("fields.entity"))}
                  {renderField("name", f("fields.name"))}
                  {renderField("position", f("fields.position"))}
                  {renderField("phone", f("fields.phone"), "tel")}
                  {renderField(
                    "email",
                    f("fields.email"),
                    "email",
                    "md:col-span-2",
                  )}

                  <div className="flex flex-col gap-2 text-start md:col-span-2">
                    <label className="text-sm font-semibold text-gray-700">
                      {f("fields.message")}
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      className="w-full p-3 border border-gray-200 focus:border-[#5A417F] outline-none transition-all resize-none"
                    ></textarea>
                  </div>

                  <div className="flex flex-col gap-2 text-start md:col-span-2">
                    <label className="text-sm font-semibold text-gray-700">
                      {f("fields.attachments")}
                    </label>
                    <label className="relative border-2 border-dashed border-gray-200 p-4 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors cursor-pointer">
                      <Paperclip size={20} className={selectedFiles.length > 0 ? "text-[#5A417F] shrink-0" : "text-gray-400"} />
                      <span className={`text-sm ${selectedFiles.length > 0 ? "text-[#5A417F] font-medium" : "text-gray-400"}`}>
                        {selectedFiles.length > 0
                          ? selectedFiles.map((f) => f.name).join(", ")
                          : isAr ? "اضغط لرفع الملفات" : "Click to upload files"}
                      </span>
                      <input
                        name="attachments"
                        type="file"
                        multiple
                        className="hidden"
                        onChange={(e) => setSelectedFiles(Array.from(e.target.files || []))}
                      />
                    </label>
                  </div>

                  <div className="md:col-span-2 pt-4">
                    {status === "success" && (
                      <p className="text-green-600 font-bold text-center mb-4 italic">
                        {f.has("fields.successMessage")
                          ? f("fields.successMessage")
                          : isAr
                            ? "تم الإرسال بنجاح!"
                            : "Sent successfully!"}
                      </p>
                    )}
                    {status === "error" && (
                      <p className="text-red-600 font-bold text-center mb-4 italic">
                        {f.has("fields.errorMessage")
                          ? f("fields.errorMessage")
                          : isAr
                            ? "حدث خطأ ما"
                            : "Error occurred"}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "loading" || status === "success"}
                      className="w-full py-4 bg-[#5A417F] text-white font-bold flex items-center justify-center gap-2 hover:bg-[#453262] transition-all disabled:opacity-50"
                    >
                      {status === "loading" ? (
                        isAr ? (
                          "جاري الإرسال..."
                        ) : (
                          "Sending..."
                        )
                      ) : (
                        <>
                          <Send size={20} />
                          {f("fields.submit")}
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
