"use client";

import { TextareaHTMLAttributes, ReactNode } from "react";
import { useLocale } from "next-intl";
import { CircleAlert } from "lucide-react";

interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  required?: boolean;
  helperText?: string;
  error?: string;
  icon?: ReactNode;
}

export default function Textarea({
  label,
  required = false,
  helperText,
  error,
  icon,
  className,
  ...props
}: TextareaProps) {
    const locale = useLocale();
    const isRTL = locale === "ar";
  return (
    <div className="space-y-2">
      {/* Label */}
      <label className="block text-sm font-semibold text-slate-700">
        {label}

        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      <div className="relative">
        <textarea
          {...props}
          dir={isRTL ? "rtl" : "ltr"}
          className={[
            `
            min-h-[170px]
            w-full
            rounded-3xl
            border
            bg-slate-50
            p-5
            text-[15px]
            outline-none
            resize-none
            transition-all

            placeholder:text-slate-400

            focus:bg-white
            focus:ring-4
            focus:ring-[#498FBD]/15
            `,

            isRTL ? "text-right" : "text-left",

            error
              ? "border-red-400 focus:border-red-500 focus:ring-red-200"
              : "border-slate-200 focus:border-[#498FBD]",

            className ?? "",
          ].join(" ")}
        />

        {error && (
          <CircleAlert
            size={18}
            className={`absolute top-5 text-red-500 ${
              isRTL ? "left-5" : "right-5"
            }`}
          />
        )}
      </div>

      {helperText && !error && (
        <p className="text-xs text-slate-500">
          {helperText}
        </p>
      )}

      {error && (
        <p className="text-xs font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}