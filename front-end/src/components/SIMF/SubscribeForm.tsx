"use client";
import { useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Paperclip, Send } from "lucide-react";

export default function SubscribeForm() {
  const t = useTranslations("ContactPage.ContactForm");
  const locale = useLocale();

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

    const requiredFields = ["email"];

    requiredFields.forEach((field) => {
      if (!formData.get(field)) {
        if (t.has(`fields.required`)) {
          newErrors[field] = t(`fields.required`);
        } else {
          newErrors[field] =
            locale === "ar" ? "هذا الحقل مطلوب" : "This field is required";
        }
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setStatus(data.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const renderInput = (name: string, type: string, placeholder: string) => (
    <div className="flex flex-col gap-1">
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className={`p-4 bg-zinc-100 outline-none focus:ring-1 focus:ring-[#5B4180] border-none ${
          errors[name] ? "ring-1 ring-red-500" : ""
        }`}
        onChange={() => {
          if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
        }}
      />
      {errors[name] && (
        <span className="text-red-500 text-sm px-1 font-medium italic">
          {errors[name]}
        </span>
      )}
    </div>
  );

  return (
    <div
      className="w-full bg-white py-10 px-8 md:px-16 items-center text-center">  
      <div className="mx-auto flex flex-col gap-4 rounded-lg items-center" style={{ backgroundColor: "#cccccc" }}>
        <h3 className="text-sm md:text-sm text-[#5b4180] mb-2 mt-8">
          Stay Informed
        </h3>
        <h2 className="text-black text-2xl md:text-3xl font-bold text-[#5b4180] mb-8">
          Never miss what matters
        </h2>
        <p className="text-zinc-600 text-lg md:text-xl leading-relaxed whitespace-pre-line mb-8">
          Be the first to discover new developments, key milestones and opportunities from the maritime security ecosystem. 
        </p>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4"
        >
          {renderInput("email", "email", "Enter your email address")}


          {status === "success" && (
            <p className="text-green-700 font-bold text-center">
              {t.has("fields.successMessage")
                ? "You are now subscribed to our newsletter!"
                : locale === "ar"
                  ? "لقد اشتركت الآن في نشرتنا الإخبارية!"
                  : "You are now subscribed to our newsletter!"}
            </p>
          )}

          {status === "error" && (
            <p className="text-red-600 font-bold text-center">
              {t.has("fields.errorMessage")
                ? t("fields.errorMessage")
                : locale === "ar"
                  ? "حدث خطأ"
                  : "An error occurred"}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="w-full lg:w-48 rounded-3xl bg-[#5B4180] text-white py-4 mt-2 mb-8 font-bold transition-all flex items-center justify-center gap-3 group disabled:opacity-60"
          >
            {status === "loading"
              ? locale === "ar"
                ? "جاري الإرسال..."
                : "Sending..."
              : "Subscribe"}
            <Send
              size={18}
              className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform"
            />
          </button>
        </form>
      </div>
    </div>
  );
}
