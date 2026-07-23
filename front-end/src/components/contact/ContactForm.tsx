"use client";
import { useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Paperclip, Send } from "lucide-react";

export default function ContactForm() {
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

    const requiredFields = ["entity", "name", "position", "phone", "email"];

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
      const res = await fetch("/api/contact", {
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
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-4"
    >
      {renderInput("entity", "text", t("fields.entity"))}
      {renderInput("name", "text", t("fields.name"))}
      {renderInput("position", "text", t("fields.position"))}
      {renderInput("phone", "tel", t("fields.phone"))}
      {renderInput("email", "email", t("fields.email"))}

      <div className="flex flex-col gap-1">
        <textarea
          name="message"
          rows={4}
          placeholder={t("fields.message")}
          className="p-4 bg-zinc-100 outline-none focus:ring-1 focus:ring-[#5B4180] border-none resize-none"
        ></textarea>
      </div>

      <div className="relative group">
        <label className="flex items-center justify-between p-4 bg-zinc-100 text-zinc-500 cursor-pointer group-hover:bg-zinc-200 transition-colors">
          <span className={selectedFiles.length > 0 ? "text-[#5B4180] font-medium truncate max-w-[80%]" : ""}>
            {selectedFiles.length > 0
              ? selectedFiles.map((f) => f.name).join(", ")
              : t("fields.attachments")}
          </span>
          <Paperclip size={20} className={selectedFiles.length > 0 ? "text-[#5B4180] shrink-0" : ""} />
          <input
            name="attachments"
            type="file"
            multiple
            className="hidden"
            onChange={(e) => setSelectedFiles(Array.from(e.target.files || []))}
          />
        </label>
      </div>

      {status === "success" && (
        <p className="text-green-700 font-bold text-center">
          {t.has("fields.successMessage")
            ? t("fields.successMessage")
            : locale === "ar"
              ? "تم الإرسال بنجاح"
              : "Sent successfully"}
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
        className="bg-[#5B4180] text-white py-4 mt-2 font-bold transition-all flex items-center justify-center gap-3 group disabled:opacity-60"
      >
        {status === "loading"
          ? locale === "ar"
            ? "جاري الإرسال..."
            : "Sending..."
          : t("fields.submit")}
        <Send
          size={18}
          className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform"
        />
      </button>
    </form>
  );
}
